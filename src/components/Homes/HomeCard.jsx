import { useState } from "react";
import { deleteFavorite, favoriteHome } from "../services/favoriteService";
import { useAuth } from "../../context/AuthContext";

export const HomeCard = ({ home, handleRemoveFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(home.is_favorited || false);
  const { token } = useAuth();
  const handleFavorite = () => {
    if (isFavorited) {
      deleteFavorite(token, home.id).then(() => {
        setIsFavorited(false);
        handleRemoveFavorite?.(home.id);
      });
    } else {
      favoriteHome(token, home.id).then(() => {
        setIsFavorited(true);
      });
    }
  };

  return (
    <div className="flex  flex-col border w-90">
      <div className="relative aspect-[4/3]">
        <img
          src={home.image}
          alt={home.address}
          className="object-cover w-full h-full"
        />

        <svg
          className="absolute bottom-0 right-0 cursor-pointer"
          width="50"
          height="50"
          viewBox="0 0 200 200"
          onClick={handleFavorite}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="100,10 130,60 180,70 140,120 150,170 100,150 50,170 60,120 20,70 70,60"
            fill={isFavorited ? "yellow" : "white"}
          />
        </svg>
      </div>

      <div id="details" className="flex flex-col p-2">
        <div className="flex justify-between pt-2">
          <div>
            <p>${home.price}</p>
          </div>
          <div>
            {" "}
            <p>
              <span className="font-bold">Beds: </span>
              {home?.beds}
            </p>
          </div>
          <div>
            {" "}
            <p>
              <span className="font-bold">Baths: </span>
              {home?.bath}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex-1">
            {home?.address}, Nashville, TN {home?.zip}
          </div>
          <div className="flex-1">{home.sqft} sqft</div>
        </div>
      </div>
    </div>
  );
};
