import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // listings
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // image update
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // handle delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  // sing out

  const handleSingOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(signOutUserFailure(error.message));
    }
  };
  // show listings
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 mt-10 p-3">
      <div className="w-full ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="rounded-full self-center cursor-pointer object-cover h-36 w-36"
            src={formData.avatar || currentUser.avatar}
            alt="profile picture"
          />
          <p className="text-sm self-center">
            {fileError ? (
              <span className="text-red-700">
                Error Image (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            className="bg-gray-800 text-white rounded-lg p-3 uppercase text-center hover:opacity-85"
            to={"/create-listing"}
          >
            Create Post
          </Link>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-800 cursor-pointer"
          >
            Delete Account
          </span>
          <span onClick={handleSingOut} className="text-red-800 cursor-pointer">
            Sign Out
          </span>
        </div>
        <div className="my-3">
          <p className="text-red-700">{error ? error : ""}</p>
          <p className="text-green-800 font-semibold">
            {updateSuccess ? `Account updated successfully!` : ""}
          </p>
          <button
            onClick={handleShowListings}
            className="text-green-200 w-full bg-slate-500 p-3 "
          >
            Show Listings
          </button>
          <p>{showListingsError ? "Error showing listings" : ""}</p>
        </div>
      </div>
      <div className="w-full">
        {userListings &&
          userListings.length > 0 &&
          userListings.map((listing) => (
            <Link
              key={listing._id}
              to={`/listing/${listing._id}`}
              className="flex flex-col mt-3"
            >
              <h1 className="text-zinc-800 font-semibold text-3xl my-5 self-center">
                Your Listings
              </h1>
              <div
                className="flex justify-between items-center shadow-lg
              hover:bg-red-100 
              border
            "
              >
                <img
                  src={listing.imageUrls[0]}
                  alt="images  of the listing"
                  className="h-24 w-24 object-contain"
                />
                <p className="font-medium text-slate-800 truncate">
                  {listing.name}
                </p>
                <div className="flex flex-col gap-2">
                  <button className="bg-green-700 text-white p-2">Edit</button>
                  <button className="bg-red-700 text-white p-2">Delete</button>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Profile;
