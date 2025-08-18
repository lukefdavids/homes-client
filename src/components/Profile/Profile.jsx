import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Modal } from "../Modal";

export const YourProfile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    // deleteHome(token, home.id).then(() => {
    //   setUserHome(null);
    //   setShowModal(false);
    //   navigate("/");
    // };
  };

  const { currentUser } = useAuth();
  return (
    <section className="flex flex-col max-w-full px-4 lg:max-w-19/20 font-serif mx-auto my-4">
      <div className="flex justify-center">
        <h1 className="lg:text-6xl text-2xl md:text-4xl  font-light font-serif  text-slate-800">
          PROFILE
        </h1>
      </div>
      <div
        id="details"
        className="p-8 my-8  w-full lg:w-6/10 lg:min-h-[300px] gap-3 lg:gap-4 flex flex-col mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden lg:text-2xl"
      >
        <div id="name-section" className="flex flex-1 justify-between">
          <div className="flex flex-col ">
            <h3 className="underline">First Name:</h3>
            <p className="flex items-start">{currentUser?.first_name}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="underline">Last Name:</h3>
            <p className="flex items-start">{currentUser?.last_name}</p>
          </div>
        </div>
        <div id="email" className="flex flex-1 flex-col">
          <h3 className="underline flex items-start">Email:</h3>
          <p className="flex items-start">{currentUser?.email}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:space-x-6">
        <button
          className="w-full sm:w-auto px-6 py-3 lg:py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 font-medium text-sm sm:text-base lg:text-inherit"
          onClick={handleEdit}
        >
          Edit Profile
        </button>
        <button
          className="w-full sm:w-auto px-6 py-3 lg:py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium text-sm sm:text-base "
          onClick={handleDeleteClick}
        >
          Delete Profile
        </button>
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
