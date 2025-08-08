import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest";
    const storedEmail = localStorage.getItem("email") || "Not Provided";

    setProfile({
      username: storedUsername,
      email: storedEmail,
    });
  }, []);

  const handleLogout = () => {
    toast.info(
      <div className="text-center">
        <p className="mb-3">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              localStorage.removeItem("username");
              localStorage.removeItem("email");
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              toast.dismiss();
              navigate("/home");
            }}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      }
    );
  };

  return (
    <div className="h-fit-content mt-4 flex items-center justify-center bg-white">
      <div className="bg-white text-black rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] p-8 w-full max-w-sm transform transition duration-500">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400 shadow-md flex items-center justify-center text-3xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>

          {/* Username */}
          <h2 className="mt-4 text-2xl font-semibold tracking-wide">
            {profile.username}
          </h2>

          {/* Email */}
          <p className="mt-1 text-gray-600">{profile.email}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Username</span>
            <span className="font-medium">{profile.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{profile.email}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="cursor-pointer mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
