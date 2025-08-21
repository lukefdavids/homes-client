import { useEffect, useState } from "react";
import { getFavorites } from "./services/favoriteService";
import { HomeCard } from "./Homes/HomeCard";
import { useAuth } from "../context/AuthContext";
import { NashvilleMap } from "./Map";

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
    <section className="gap-8 flex flex-col mx-auto w-19/20 ">
      <div className="flex justify-center">
        <h1 className="lg:text-6xl text-2xl md:text-4xl  font-light font-serif  text-slate-800">
          FAVORITES
        </h1>
      </div>
      <div className="flex">
        <div
          id="all-home-cards"
          className=" justify-center overflow-y-scroll h-[500px] flex flex-wrap gap-5 w-1/2"
        >
          {favoriteHomes.length ? (
            favoriteHomes?.map((home) => (
              <HomeCard
                key={home.id}
                home={home}
                size="medium"
                handleRemoveFavorite={handleRemoveFavorite}
              />
            ))
          ) : (
            <h3 className="font-serif font-light text-2xl flex items-center">
              No homes currently favorited
            </h3>
          )}
        </div>
        <div className="border w-1/2 h-[500px]">
          {favoriteHomes.length > 0 && <NashvilleMap homes={favoriteHomes} />}
        </div>
      </div>
    </section>
  );
};
