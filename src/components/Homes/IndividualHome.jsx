import { useParams } from "react-router-dom";
import { getHomeById } from "../services/homeService";
import { useEffect, useState } from "react";
import { HomeDetails } from "./HomeDetails";

export const IndividualHome = () => {
  const [home, setHome] = useState([]);
  const { homeId } = useParams();

  useEffect(() => {
    getHomeById(homeId).then(setHome);
  }, []);

  return <HomeDetails home={home} showactions={false} />;
};
