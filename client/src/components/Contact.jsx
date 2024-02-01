import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Contact({ listing }) {
  const [landlord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-3">
          <p>
            Contact:{" "}
            <span className="font-semibold">
              {landlord.username} for{" "}
              <span className="font-semibold">
                {listing.name.toLowerCase()}
              </span>
            </span>
          </p>
          <textarea
            className="w-full border p-3 rounded-lg"
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-75"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}

Contact.propTypes = {
  listing: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
