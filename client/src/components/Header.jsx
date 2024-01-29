import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
function Header() {
  return (
    <header className="bg-slate-300 p-2">
      <nav className="flex justify-between max-w-7xl mx-auto">
        <Link to="/">
          <h1 className="font-bold from-slate-500 text-2xl">
            <span className="text-slate-700">REAL</span>
            <span className="text-slate-400">ESTATE</span>
          </h1>
        </Link>
        <form className=" bg-slate-100 p-2 rounded-md flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search"
          />
          <FaSearch />
        </form>
        <div className="flex gap-3">
          <Link
            className="text-teal-900 font-semibold hover:text-teal-700 duration-200"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-teal-900 font-semibold hover:text-teal-700 duration-200"
            to="/about"
          >
            About
          </Link>
          <Link
            className="text-teal-900 font-semibold hover:text-teal-700 duration-200"
            to="/sign-in"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
