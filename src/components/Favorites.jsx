import { useEffect, useState } from "react";
import { getFavorites } from "./services/favoriteService";
import { HomeCard } from "./Homes/HomeCard";
import { useAuth } from "../context/AuthContext";

export const Favorites = () => {
  const [favoriteHomes, setFavoriteHomes] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    getFavorites(token).then(setFavoriteHomes);
  }, []);

  const handleRemoveFavorite = (homeId) => {
    setFavoriteHomes((prev) => prev.filter((home) => home.id !== homeId));
  };
  return (
    <section className="gap-8 flex flex-col">
      <div className="flex justify-center">
        <h1 className="lg:text-6xl text-2xl md:text-4xl  font-serif  font-bold text-slate-800">
          Favorites
        </h1>
      </div>
      <div className="flex">
        <div
          id="all-home-cards"
          className="justify-center flex flex-wrap w-full gap-10 max-w-1/2 border-1 py-2"
        >
          {favoriteHomes?.map((home) => (
            <HomeCard
              key={home.id}
              home={home}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
        <div className="border-1 max-w-1/2">
          <img
            src="../logo.PNG"
            alt="Nashville Homes Logo"
            className="flex flex-auto max-h-20"
          ></img>
        </div>
      </div>
    </section>
  );
};
