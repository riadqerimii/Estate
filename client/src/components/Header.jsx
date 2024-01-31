import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  // States
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-300 p-2">
      <nav className="flex justify-between max-w-7xl mx-auto">
        <Link to="/">
          <h1 className="font-bold from-slate-500 text-2xl">
            <span className="text-slate-700">REAL</span>
            <span className="text-slate-400">ESTATE</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className=" bg-slate-100 p-2 rounded-md flex items-center"
        >
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <div className="flex gap-3">
          <Link
            className="text-teal-900 font-semibold hover:text-teal-700 duration-200"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hidden sm:block text-teal-900 font-semibold hover:text-teal-700 duration-200"
            to="/about"
          >
            About
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile picture"
              />
            ) : (
              <p className=" text-teal-900 font-semibold  hover:opacity-70">
                {" "}
                Sign in
              </p>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
