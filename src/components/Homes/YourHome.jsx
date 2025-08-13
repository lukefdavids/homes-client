import { useEffect, useState } from "react";
import { deleteHome, getUsersHomes } from "../services/homeService";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal";
import { useAuth } from "../../context/AuthContext";

export const YourHome = () => {
  const [home, setHome] = useState();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    getUsersHomes(token).then(setHome);
  }, []);

  const handleDelete = () => {
    deleteHome(token, home.id).then(() => {
      setShowModal(false);
      navigate("/");
    });
  };

  return (
    <section
      id="home-container"
      className="flex flex-col max-w-19/20 border-2 mx-auto my-4"
    >
      <div id="address" className="justify-start flex p-2 max-w-1/2">
        <h2 className="font-bold">
          {home?.address}, Nashville {home?.state} {home?.zip}
        </h2>
      </div>
      <div id="main-section" className=" flex flex-row ">
        <div id="home-image" className="flex-1">
          <img src={home?.image} alt={home?.address} />
        </div>
        <div
          id="description-plus-details"
          className="flex-1 flex flex-col px-2 py-4"
        >
          <div id="description" className="flex-1 text-2xl">
            {home?.description}
          </div>
          <div id="details" className="text-2xl border-2 flex-1 w-9/10 mx-auto">
            <div id="beds-baths" className="p-2 flex-row flex justify-between">
              <p>
                <span className="font-bold">Beds: </span>
                {home?.beds}
              </p>
              <p>
                <span className="font-bold">Baths: </span>
                {home?.bath}
              </p>
            </div>
            <div id="price-sqft" className="p-2 flex-row flex justify-between">
              <p>
                <span className="font-bold">Price: </span>
                {home?.price}
              </p>
              <p>
                <span className="font-bold">SqFt: </span>
                {home?.sqft}
              </p>
            </div>
            <div id="propertyType">
              <p>
                <span className="font-bold">Property Type: </span>
                {home?.home_type.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="listing-agent" className="flex p-2 max-w-1/2 justify-start">
        {" "}
        <p>
          <span className="font-bold">Listing Agent: </span>
          {home?.listing_agent.name}
        </p>
      </div>
      <div id="buttons" className="flex flex-row justify-center gap-8 my-2">
        <div>
          <button
            onClick={() => {
              navigate("/edit-home");
            }}
            className="px-8 py-2 bg-blue-600 text-white text-2xl rounded-2xl shadow hover:bg-blue-700 focus:outline-none"
          >
            Edit
          </button>
        </div>
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-2 bg-red-500 text-white text-2xl rounded-2xl shadow hover:bg-red-600 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        title="Confirm Delete"
        message="Are you sure? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </section>
  );
};
