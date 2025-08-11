export const HomeCard = ({ home }) => {
  return (
    <div className="flex  flex-col border w-90">
      <div className="aspect-4/3">
        <img
          src={home.image}
          alt={home.address}
          className="object-cover w-full h-full"
        />
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
