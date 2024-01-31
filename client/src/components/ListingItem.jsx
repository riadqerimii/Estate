import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import PropTypes from "prop-types"; // Import PropTypes

function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow gap-4 overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2022/12/07082032/10-Companies-That-Hire-for-Remote-Real-Estate-Jobs.jpg"
          }
          alt="Listing images"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 duration-150 transition-all"
        />
        <div className="p-3 flex flex-col gap-3 w-full ">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="truncate overflow-hidden text-sm text-gray-400">
              {listing.address}
            </p>
          </div>
          <div>
            <p className=" truncate text-sm text-gray-600">
              {listing.description}
            </p>
            <p className="text-slate-500 mt-2 font-semibold">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
          </div>
          <div className="text-slate-700 flex gap-2">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
// propTypes
ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    offer: PropTypes.bool.isRequired,
    discountPrice: PropTypes.number,
    regularPrice: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["rent", "sale"]).isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
  }).isRequired,
};

export default ListingItem;
