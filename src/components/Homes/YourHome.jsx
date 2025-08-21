import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { HomeDetails } from "./HomeDetails";
import { useNavigate } from "react-router-dom";

export const YourHome = () => {
  const navigate = useNavigate();
  const { userHome } = useAuth();
  useEffect(() => {
    if (userHome === null) {
      navigate("/list-your-home");
    }
  }, [userHome, navigate]);

  return (
    <>
      <h1 className="lg:text-6xl text-2xl md:text-4xl  font-light font-serif  text-slate-800">
        YOUR HOME
      </h1>
      <HomeDetails home={userHome} showActions={true} />
    </>
  );
};
