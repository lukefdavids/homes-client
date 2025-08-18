import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteHome } from "../services/homeService";
import { Modal } from "../Modal";

export const HomeDetails = ({ home, showActions = false }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { token, setUserHome } = useAuth();

  const handleEdit = () => {
    navigate("/edit-home");
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    deleteHome(token, home.id).then(() => {
      setUserHome(null);
      setShowModal(false);
      navigate("/");
    });
  };

  return (
    <section
      id="home-container"
      className="flex flex-col max-w-full px-4 lg:max-w-19/20 font-serif mx-auto my-4"
    >
      <div id="address" className="justify-start flex py-2 lg:max-w-1/2">
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
          {home?.address}, Nashville {home?.state} {home?.zip}
        </h2>
      </div>

      <div id="main-section" className="flex flex-col lg:flex-row">
        <div id="home-image" className="w-full lg:flex-1">
          <img
            src={home?.image}
            alt={home?.address}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
          />
        </div>

        <div
          id="description-plus-details"
          className="w-full lg:flex-1 items-center flex flex-col gap-4 lg:px-2"
        >
          <div
            id="description"
            className="flex-1 w-full lg:w-9/10 text-base sm:text-lg lg:text-2xl"
          >
            <p className="font-semibold text-lg sm:text-xl lg:text-2xl pb-2 underline">
              About this home:
            </p>
            <p className="leading-relaxed">{home?.description}</p>
          </div>

          <div
            id="details"
            className="p-4 flex-1 w-full lg:w-9/10 gap-3 lg:gap-4 flex flex-col mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden lg:text-2xl"
          >
            <div id="beds-baths" className="p-2 flex-row flex justify-between">
              <p className="text-sm sm:text-base lg:text-inherit">
                <span className="font-bold">Beds: </span>
                {home?.beds}
              </p>
              <p className="text-sm sm:text-base lg:text-inherit">
                <span className="font-bold">Baths: </span>
                {home?.bath}
              </p>
            </div>

            <div id="price-sqft" className="p-2 flex-row flex justify-between">
              <p className="text-sm sm:text-base lg:text-inherit">
                <span className="font-bold">Price: </span>$
                {home?.price?.toLocaleString()}
              </p>
              <p className="text-sm sm:text-base lg:text-inherit">
                <span className="font-bold">SqFt: </span>
                {home?.sqft?.toLocaleString()}
              </p>
            </div>

            <div
              id="propertyType"
              className="text-sm sm:text-base lg:text-inherit"
            >
              <p>
                <span className="font-bold">Property Type: </span>
                {home?.home_type?.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="listing-agent" className="flex py-2 lg:max-w-1/2 justify-start">
        <p className="text-sm sm:text-base lg:text-inherit">
          <span className="font-bold">Listing Agent: </span>
          {home?.listing_agent?.name}
        </p>
      </div>

      {showActions && (
        <>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:space-x-6 mt-6">
            <button
              className="w-full sm:w-auto px-6 py-3 lg:py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 font-medium text-sm sm:text-base lg:text-inherit"
              onClick={handleEdit}
            >
              Edit Property
            </button>
            <button
              className="w-full sm:w-auto px-6 py-3 lg:py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium text-sm sm:text-base "
              onClick={handleDeleteClick}
            >
              Delete Property
            </button>
          </div>

          <Modal
            isOpen={showModal}
            title="Confirm Delete"
            message="Are you sure? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setShowModal(false)}
          />
        </>
      )}
    </section>
  );
};
