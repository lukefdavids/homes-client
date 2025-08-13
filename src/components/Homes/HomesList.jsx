import { useEffect, useState } from "react";
import { getAllHomes } from "../services/homeService";
import { HomeCard } from "./HomeCard";
import { useAuth } from "../../context/AuthContext";

export const HomesList = () => {
  const [homes, setHomes] = useState();
  const { token } = useAuth();

  useEffect(() => {
    getAllHomes(token).then(setHomes);
  }, []);
  return (
    <>
      <div id="titles" className="flex flex-col max-w-screen">
        <h1 className="lg:text-6xl text-2xl md:text-4xl  font-serif  font-bold text-slate-800">
          NASHVILLE HOMES
        </h1>
        <h3 className="text-1xl md:text-2xl lg:text-4xl font-serif italic text-slate-800 py-4">
          Find your dream home in Music City
        </h3>
      </div>
      <div id="filters" className="flex p-8"></div>
      <section
        id="all-home-cards"
        className="justify-center flex flex-wrap w-full gap-10"
      >
        {homes?.map((home) => (
          <HomeCard key={home.id} home={home} token={token} />
        ))}
      </section>
    </>
  );
};
