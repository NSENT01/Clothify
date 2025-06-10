import logo from '../assets/Clothify.logo.png';
import facebook from '../assets/Facebook-Logo.png';
import apple from '../assets/apple-icon.png';
import google from '../assets/google-icon.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const[formData, setFormData] = useState({email: "", password: ""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async() => {
       try {
          const res = await axios.post("/api/auth/login/", formData, { withCredentials: true });
          console.log("Login success", res.data);
          navigate('/wardrobe')
          // redirect or set user state
        } catch (err) {
          console.error("Login error", err);
        }
    }



  return (
   <div className="flex flex-col items-center min-h-screen py-20 px-4 bg-white">

  {/* Logo and heading */}
  <div className="mb-8 text-center">
    <img src={logo} alt="Clothify logo" width="40" height="40" className="mx-auto mb-2" />
    <h1 className="text-2xl font-sans font-semibold text-black">Log into Clothify</h1>
  </div>

  {/* Main container split into 2 columns on md+ screens */}
  <div className="flex flex-col md:flex-row w-full max-w-5xl border rounded-lg shadow-md overflow-hidden">

    {/* Left section - direct account creation */}
    <div className="w-full md:w-1/2 p-8 bg-white">
      {[
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
      <button onClick={handleLogin} className="relative group overflow-hidden flex items-center justify-center h-11 w-full border-2 text-stone-50 bg-stone-800 font-sans cursor-pointer">
        <span className="absolute inset-0 bg-stone-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-stone-50">
          Log In
        </span>
      </button>

      {/* Error message placeholder */}
      <p className="mt-2 text-sm text-red-500"></p>
    </div>

    {/* Right section - third party login options */}
    <div className="w-full md:w-1/2 p-8 bg-gray-50 flex flex-col items-center">
      {[ 
        { label: "Continue with Google", logo: google, logoClass: "h-5 w-5" },
        { label: "Continue with Apple", logo: apple, logoClass: "h-7 w-7" },
        { label: "Continue with Facebook", logo: facebook, logoClass: "h-5 w-5" },
      ].map(({ label, logo, logoClass }, i) => (
        <button
          key={i}
          className="relative group overflow-hidden flex items-center justify-center h-13 w-full my-2 border text-black cursor-pointer bg-white"
        >
          <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
          <img src={logo} alt={`${label} logo`} className={`absolute left-4 ${logoClass}`} />
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
            {label}
          </span>
        </button>
      ))}

    </div>
  </div>
</div>
  );
}