import { useEffect, useState } from "react";
import { getAllHomes } from "../services/homeService";
import { HomeCard } from "./HomeCard";
import { useAuth } from "../../context/AuthContext";

export const HomesList = () => {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [filters, setFilters] = useState({
    propertyType: "",
    beds: "",
    bath: "",
  });
  const { token } = useAuth();

  useEffect(() => {
    getAllHomes(token).then(setHomes);
  }, [token]);

  useEffect(() => {
    if (!homes?.length) return;

    let filtered = [...homes];

    if (filters.propertyType) {
      filtered = filtered.filter(
        (home) => home.home_type.id === parseInt(filters.propertyType)
      );
    }

    if (filters.beds) {
      filtered = filtered.filter(
        (home) => home.beds === parseInt(filters.beds)
      );
    }

    if (filters.bath) {
      if (filters.bath === "5+") {
        filtered = filtered.filter((home) => home.bath >= 5);
      } else {
        filtered = filtered.filter(
          (home) => home.bath === parseInt(filters.bath)
        );
      }
    }

    setFilteredHomes(filtered);
  }, [homes, filters]);

  const handleFilterSelection = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div id="titles" className="flex flex-col max-w-screen">
        <h1 className="lg:text-6xl text-2xl md:text-4xl font-serif font-bold text-slate-800">
          NASHVILLE HOMES
        </h1>
        <h3 className="text-1xl md:text-2xl lg:text-4xl font-serif italic text-slate-800 py-4">
          Find your dream home in Music City
        </h3>
      </div>

      <div id="filters" className="flex gap-4 justify-center my-6">
        <select
          className="border p-2 text-center rounded-2xl"
          name="propertyType"
          value={filters.propertyType}
          onChange={handleFilterSelection}
        >
          <option value="">Property Type</option>
          <option value="1">Single-Family</option>
          <option value="2">Condo</option>
          <option value="3">Townhome</option>
        </select>

        <select
          className="border p-2 text-center rounded-2xl"
          name="beds"
          value={filters.beds}
          onChange={handleFilterSelection}
        >
          <option value="">Beds</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5+">5+</option>
        </select>

        <select
          className="border p-2 text-center rounded-2xl"
          name="bath"
          value={filters.bath}
          onChange={handleFilterSelection}
        >
          <option value="">Baths</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5+">5+</option>
        </select>
      </div>

      <section
        id="all-home-cards"
        className="justify-center flex flex-wrap w-full gap-10"
      >
        {filteredHomes.length ? (
          filteredHomes.map((home) => (
            <HomeCard key={home.id} home={home} token={token} />
          ))
        ) : (
          <p>No homes found</p>
        )}
      </section>
    </>
  );
};
