import { Link } from 'react-router-dom';
import logo from '../assets/Clothify.logo.png';
import google from '../assets/google-icon.png';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

export default function GetStarted() {


  {/* checks that while on get started page user is not logged in, otherwise navigate to their wardrobe */}
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("/api/auth/profile/", { withCredentials: true });
        navigate("/wardrobe");
      } catch (err) {
        
      }
    }
    checkLogin();
  }, []);

  {/* While user updates account creation field, update state variables */}
  const[formData, setFormData] = useState({username: "", first_name: "", last_name: "", email: "", password: ""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  {/* creates user if information is valid and not already existing through backend create view, redirects to login page */}
  const handleCreate = async() => {
    try {
      const account = await axios.post("/api/auth/create/", formData, {headers: {'Content-Type': 'application/json',}, withCredentials: true,});
      console.log(account.data)
      navigate('/login');
    } catch(error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }

  {/* google oauth popup when continue with google clicked, checks for refresh and access token returned, otherwise shows error */}
  const handleGoogleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const res = await axios.post('/api/auth/google/', {
            access_token: tokenResponse.access_token
          }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

          if (res.data.refresh) {
            localStorage.setItem("refresh", res.data.refresh);
          }

          console.log("Google Login Success", res.data);
          window.location.reload();
        } catch (err) {
          console.error("Google Login Error", err);
        }
      },
      onError: (err) => console.error("Google Login Failed", err),
    });

  return (
    <div className="flex flex-col items-center min-h-screen py-20 px-4 bg-white">

  {/* Logo and heading */}
  <div className="mb-8 text-center">
    <img src={logo} alt="Clothify logo" width="40" height="40" className="mx-auto mb-2" />
    <h1 className="text-2xl font-sans font-semibold text-black">Create Your Account</h1>
  </div>

  {/* Main container split into 2 columns on larger screens */}
  <div className="flex flex-col md:flex-row w-full max-w-5xl border rounded-lg shadow-md overflow-hidden">

    {/* Left section - direct account creation */}
    <div className="w-full md:w-1/2 p-8 bg-white">
      {[
        { label: "username", placeholder: "Username" },
        { label: "first_name", placeholder: "First Name" },
        { label: "last_name", placeholder: "Last Name" },
        { label: "email", placeholder: "name@example.com", type: "email" },
        { label: "password", placeholder: "Password", type: "password" },
      ].map(({ label, placeholder, type = "text" }, i) => (
        <div key={i} className="mb-5">
          <p className="font-sans text-gray-600 text-sm mb-1">{label}</p>
          <div className="relative h-12">

            <input
              name={label}
              type={type}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="peer w-full h-full bg-transparent border-none outline-none text-black font-sans"
            />
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-400"></span>
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100"></span>
          </div>

        </div>
      ))}

      {/* Submit button */}
      <button onClick={handleCreate} className="relative group overflow-hidden flex items-center justify-center h-11 w-full border-2 text-stone-50 bg-stone-800 font-sans cursor-pointer">
        <span className="absolute inset-0 bg-stone-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-stone-50">
          Continue
        </span>
      </button>

      {/* Error message placeholder */}
      <p className="mt-2 text-sm text-red-500"></p>
    </div>

    {/* Right section - third party login options */}
    <div className="w-full md:w-1/2 p-8 bg-gray-50 flex flex-col items-center">
      {[ 
        { label: "Continue with Google", logo: google, logoClass: "h-5 w-5", onClick: () => handleGoogleLogin() },
      ].map(({ label, logo, logoClass, onClick }, i) => (
        <button
          key={i}
          onClick={onClick}
          className="relative group overflow-hidden flex items-center justify-center h-13 w-full my-2 border text-black cursor-pointer bg-white"
        >
          <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
          <img src={logo} alt={`${label} logo`} className={`absolute left-4 ${logoClass}`} />
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
            {label}
          </span>
        </button>
      ))}

      {/* Login link */}
      <p className="text-sm pt-4">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="relative text-black hover:underline"
        >
          Login Here
        </Link>
      </p>
    </div>
  </div>
</div>
  );
}