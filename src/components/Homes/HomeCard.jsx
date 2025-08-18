import { useState } from "react";
import { deleteFavorite, favoriteHome } from "../services/favoriteService";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const HomeCard = ({ home, handleRemoveFavorite, size = "large" }) => {
  const [isFavorited, setIsFavorited] = useState(home.is_favorited || false);
  const { token } = useAuth();

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  // Size-specific styles
  const sizeStyles = {
    large: {
      container:
        "flex flex-col border w-90 hover:scale-105 transition-transform duration-200 rounded-lg border-1 bg-white shadow-lg",
      imageContainer: "relative aspect-[4/3] overflow-hidden rounded-t-lg",
      image: "w-full h-full",
      star: { width: "50", height: "50", viewBox: "0 0 200 200" },
      details: "flex flex-col p-2 bg-white rounded-b-lg",
      topRow: "flex justify-between pt-2",
      price: "font-bold",
      bedsBaths: "",
      bottomRow: "flex justify-between",
      address: "flex flex-col items-start",
      addressLine1: "flex",
      addressLine2: "",
      sqft: "",
    },
    medium: {
      container:
        "flex flex-col border w-72 hover:scale-105 transition-transform duration-200 rounded-lg border-1 bg-white shadow-lg",
      imageContainer: "relative aspect-[4/3] overflow-hidden rounded-t-lg",
      image: "w-full h-full",
      star: { width: "40", height: "40", viewBox: "0 0 200 200" },
      details: "flex flex-col p-2 bg-white rounded-b-lg",
      topRow: "flex justify-between pt-1",
      price: "font-bold text-sm",
      bedsBaths: "text-sm",
      bottomRow: "flex justify-between text-sm",
      address: "flex flex-col items-start",
      addressLine1: "flex",
      addressLine2: "",
      sqft: "",
    },
    small: {
      container:
        "flex flex-col border w-56 h-56 rounded-md border-1 bg-white shadow-lg",
      imageContainer: "relative aspect-[4/3] overflow-hidden rounded-t-md",
      image: "w-full h-full",
      star: { width: "30", height: "30", viewBox: "0 0 200 200" },
      details: "flex flex-col p-1 bg-white rounded-b-md",
      topRow: "flex justify-between pt-1",
      price: "font-bold text-xs",
      bedsBaths: "text-xs",
      bottomRow: "flex justify-between text-xs",
      address: "flex flex-col items-start",
      addressLine1: "flex",
      addressLine2: "",
      sqft: "",
    },
  };

  const styles = sizeStyles[size];

  // Card content component
  const CardContent = () => (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={home.image} alt={home.address} className={styles.image} />
        {token && (
          <svg
            className="absolute bottom-0 right-0 cursor-pointer"
            width={styles.star.width}
            height={styles.star.height}
            viewBox={styles.star.viewBox}
            onClick={handleFavorite}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="100,10 130,60 180,70 140,120 150,170 100,150 50,170 60,120 20,70 70,60"
              fill={isFavorited ? "yellow" : "white"}
            />
          </svg>
        )}
      </div>

      <div id="details" className={styles.details}>
        <div className={styles.topRow}>
          <div>
            <p className={styles.price}>${home.price}</p>
          </div>
          <div>
            <p className={styles.bedsBaths}>
              <span className="font-bold">Beds: </span>
              {home?.beds}
            </p>
          </div>
          <div>
            <p className={styles.bedsBaths}>
              <span className="font-bold">Baths: </span>
              {home?.bath}
            </p>
          </div>
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.address}>
            <div className={styles.addressLine1}>{home?.address},</div>
            <div className={styles.addressLine2}>Nashville, TN {home?.zip}</div>
          </div>
          <div className={styles.sqft}>{home.sqft} sqft</div>
        </div>
      </div>
    </div>
  );

  // Conditionally wrap with Link based on size
  if (size === "small") {
    return <CardContent />;
  }

  return (
    <Link to={`/${home.id}`} key={home.id}>
      <CardContent />
    </Link>
  );
};
