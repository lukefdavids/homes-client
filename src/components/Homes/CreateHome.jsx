import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const CreateHome = ({ token }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["createHomeData"],
    queryFn: () =>
      fetch("http://localhost:8000/agents", {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((res) => res.json()),
  });

  const [newHome, setNewHome] = useState({
    beds: "",
    baths: "",
    sqft: "",
    address: "",
    state: "TN",
    zip: "",
    image: "",
    listing_agent: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHome((prev) => ({
      ...prev,
      [name]: ["beds", "sqft", "zip"].includes(name)
        ? parseInt(value) || ""
        : name === "baths"
        ? parseFloat(value) || ""
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="mx-auto mt-25">
        <h1 className="text-6xl text-center">List Your Home</h1>
      </div>

      <form className="max-w-xl mt-10 border-1 mx-auto p-6 bg-white rounded-2xl shadow space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Beds
          </label>
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            name="beds"
            placeholder="0"
            value={newHome.beds}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Baths
          </label>
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            name="baths"
            placeholder="0"
            step="0.5"
            value={newHome.baths}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Sqft
          </label>
          <input
            type="number"
            name="sqft"
            placeholder="Enter square footage"
            value={newHome.sqft}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Street address"
            value={newHome.address}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            State
          </label>
          <select
            name="state"
            value={newHome.state}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-700"
            disabled
          >
            <option value="TN">TN</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            ZIP
          </label>
          <input
            type="number"
            name="zip"
            placeholder="ZIP Code"
            value={newHome.zip}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Image
          </label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={newHome.image}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Listing Agent
          </label>
          <select
            name="listing_agent"
            value={newHome.listing_agent}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          >
            <option value="">Select an agent</option>
            {data.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-start justify-between">
          <label className="text-base font-medium text-gray-700 w-32 pt-2">
            Description
          </label>
          <textarea
            rows="4"
            name="description"
            placeholder="Enter a short description of your home"
            value={newHome.description}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Listing
          </button>
        </div>
      </form>
    </>
  );
};
