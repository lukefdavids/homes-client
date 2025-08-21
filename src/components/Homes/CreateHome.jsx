import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const CreateHome = () => {
  const navigate = useNavigate();
  const { token, userHome, setUserHome } = useAuth();
  const queryClient = useQueryClient();
  const [addressValidationError, setAddressValidationError] = useState("");
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [suggestedAddress, setSuggestedAddress] = useState("");

  useEffect(() => {
    if (userHome) navigate("/your-home");
  }, [userHome, navigate]);

  const { isPending, error, data } = useQuery({
    queryKey: ["createHomeData"],
    queryFn: () =>
      fetch("http://localhost:8000/agents", {
        headers: { Authorization: `Token ${token}` },
      }).then((res) => res.json()),
  });

  const createHomeMutation = useMutation({
    mutationFn: (newHome) =>
      fetch("http://localhost:8000/homes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newHome),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to create home");
        return res.json();
      }),
    onSuccess: (createdHome) => {
      // Update the user's home in context
      setUserHome(createdHome);
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["homes"] });
      // Navigate to the home page
      navigate("/your-home");
    },
    onError: (err) => {
      console.error("Mutation error:", err);
      setAddressValidationError("Failed to create home. Please try again.");
    },
  });

  const [newHome, setNewHome] = useState({
    home_type: 1,
    beds: "",
    bath: "",
    sqft: "",
    price: "",
    address: "",
    state: "TN",
    zip: "",
    image: "",
    listing_agent: "",
    description: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "address") {
      setAddressValidationError("");
      setSuggestedAddress("");
    }

    setNewHome((prev) => ({
      ...prev,
      [name]: [
        "home_type",
        "beds",
        "sqft",
        "zip",
        "price",
        "listing_agent",
      ].includes(name)
        ? parseInt(value) || ""
        : name.includes("bath")
        ? parseFloat(value) || ""
        : value,
    }));
  };

  const validateAddress = async (address, zip) => {
    try {
      const response = await fetch(
        `https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyA_96q3aTcBnEpKLDLQZbwLPp2r-Q6EaZg`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: {
              addressLines: [address],
              locality: "Nashville",
              administrativeArea: "TN",
              regionCode: "US",
              postalCode: zip.toString(),
            },
            enableUspsCass: true,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error?.message || "Address validation service error"
        );
      }

      const verdict = result.result?.verdict;
      const geocode = result.result?.geocode;
      const validatedAddress = result.result?.address;

      if (verdict?.addressComplete) {
        const streetNumber =
          validatedAddress?.addressComponents?.find(
            (component) => component.componentType === "street_number"
          )?.componentName?.text || "";

        const streetName =
          validatedAddress?.addressComponents?.find(
            (component) => component.componentType === "route"
          )?.componentName?.text || "";

        const streetAddress = `${streetNumber} ${streetName}`.trim();

        return {
          isValid: true,
          lat: geocode?.location?.latitude || "",
          lng: geocode?.location?.longitude || "",
          suggested: streetAddress || address,
        };
      } else {
        return {
          isValid: false,
          error: "Address could not be verified. Please check and try again.",
        };
      }
    } catch (error) {
      console.error("Address validation error:", error);
      return {
        isValid: false,
        error: "Unable to validate address. Please try again.",
      };
    }
  };

  const handleUseSuggested = () => {
    if (suggestedAddress) {
      setNewHome((prev) => ({
        ...prev,
        address: suggestedAddress,
      }));
      setSuggestedAddress("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddressValidationError("");
    setSuggestedAddress("");

    const requiredFields = [
      "beds",
      "bath",
      "sqft",
      "price",
      "address",
      "zip",
      "image",
      "listing_agent",
      "description",
    ];

    const missingFields = requiredFields.filter((field) => !newHome[field]);
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    setIsValidatingAddress(true);
    const validation = await validateAddress(newHome.address, newHome.zip);
    setIsValidatingAddress(false);

    if (!validation.isValid) {
      setAddressValidationError(validation.error);
      return;
    }

    if (validation.suggested && validation.suggested !== newHome.address) {
      setSuggestedAddress(validation.suggested);
      return;
    }

    const homeData = {
      ...newHome,
      lat: validation.lat,
      lng: validation.lng,
    };

    createHomeMutation.mutate(homeData);
  };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="mx-auto mt-25">
        <h1 className="text-6xl text-center">List Your Home</h1>
      </div>

      <form
        className="max-w-xl mt-10 border-1 mx-auto p-6 bg-white rounded-2xl shadow space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Type
          </label>
          <select
            name="home_type"
            required
            value={newHome.home_type}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          >
            <option value="1">Single Family Home</option>
            <option value="2">Condo</option>
            <option value="3">Townhome</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Beds
          </label>
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            required
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
            name="bath"
            required
            placeholder="0"
            step="0.5"
            value={newHome.bath}
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
            required
            placeholder="Enter square footage"
            value={newHome.sqft}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Listing Price
          </label>
          <input
            type="number"
            name="price"
            required
            placeholder="Enter listing price for your home"
            value={newHome.price}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700 w-32">
            Address
          </label>
          <div className="flex-1">
            <input
              type="text"
              name="address"
              required
              placeholder="Street address"
              value={newHome.address}
              onChange={handleChange}
              className={`w-full border rounded-lg p-2 ${
                addressValidationError
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              } focus:outline-none focus:ring-2`}
            />
            {addressValidationError && (
              <p className="text-red-500 text-sm mt-1">
                {addressValidationError}
              </p>
            )}
            {suggestedAddress && (
              <div className="mt-2 p-2 bg-yellow-100 rounded">
                <p className="text-sm">
                  Did you mean: <strong>{suggestedAddress}</strong>?
                </p>
                <button
                  type="button"
                  onClick={handleUseSuggested}
                  className="text-blue-600 underline text-sm mt-1"
                >
                  Use Suggested Address
                </button>
              </div>
            )}
          </div>
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
            required
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
            required
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
            required
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
            required
            placeholder="Enter a short description of your home"
            value={newHome.description}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isValidatingAddress || createHomeMutation.isPending}
            className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isValidatingAddress
              ? "Validating Address..."
              : createHomeMutation.isPending
              ? "Submitting..."
              : "Submit Listing"}
          </button>
        </div>
      </form>
    </>
  );
};
