import { Link } from 'react-router-dom';
import logo from '../assets/Clothify.logo.png';
import facebook from '../assets/Facebook-Logo.png';
import apple from '../assets/apple-icon.png';
import google from '../assets/google-icon.png';

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center min-h-screen py-20 px-4 bg-white">

  {/* Logo and heading */}
  <div className="mb-8 text-center">
    <img src={logo} alt="Clothify logo" width="40" height="40" className="mx-auto mb-2" />
    <h1 className="text-2xl font-sans font-semibold text-black">Create Your Account</h1>
  </div>

<<<<<<< HEAD
        {/** Logo and Create Account Prompt */}
        <img src={logo} alt="Clothify logo" width="40" height="40" />
        <h1 className="text-2xl font-sans font-lightbold text-black">Create Your Account</h1>

      </div>

        {/** Contains fields for direct account creation */}
        <div className="flex flex-col absolute left-3/8 -translate-x-1/3 justify-start py-25">

          {/** First name field for direct account */}
          <p className = "font-sans text-gray-600 text-sm">Username</p>

          <div className="relative w-70 h-12 mb-4">
            <input
              type="text"
              placeholder="Username"
              className="peer w-full h-full bg-transparent border-none outline-none text-black font-sans"
            />
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-400"
            ></span>
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100"
            ></span>
          </div>

          {/** First name field for direct account */}
          <p className = "font-sans text-gray-600 text-sm">First Name</p>

          <div className="relative w-70 h-12 mb-4">
=======
  {/* Main container split into 2 columns on md+ screens */}
  <div className="flex flex-col md:flex-row w-full max-w-5xl border rounded-lg shadow-md overflow-hidden">

    {/* Left section - direct account creation */}
    <div className="w-full md:w-1/2 p-8 bg-white">
      {[
        { label: "Username", placeholder: "Username" },
        { label: "First Name", placeholder: "First Name" },
        { label: "Last Name", placeholder: "Last Name" },
        { label: "Email Address", placeholder: "name@example.com" },
        { label: "Password", placeholder: "Password", type: "password" },
      ].map(({ label, placeholder, type = "text" }, i) => (
        <div key={i} className="mb-5">
          <p className="font-sans text-gray-600 text-sm mb-1">{label}</p>
          <div className="relative h-12">
>>>>>>> dynamic-frontend
            <input
              type={type}
              placeholder={placeholder}
              className="peer w-full h-full bg-transparent border-none outline-none text-black font-sans"
            />
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-400"></span>
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100"></span>
          </div>
<<<<<<< HEAD

          {/** Last name field for direct account */}
          <p className = "font-sans text-gray-600 text-sm">Last Name</p>

          <div className="relative w-70 h-12 mb-4">
            <input
              type="text"
              placeholder="Last Name"
              className="peer w-full h-full bg-transparent border-none outline-none text-black font-sans"
            />
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-400"
            ></span>
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100"
            ></span>
          </div>

          {/** Email field for direct account */}
          <p className = "font-sans text-gray-600 text-sm">Email Address</p>

          <div className="relative w-70 h-12 mb-4">
            <input
              type="text"
              placeholder="name@example.com"
              className="peer w-full h-full bg-transparent border-none outline-none text-black font-sans"
            />
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-400"
            ></span>
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100"
            ></span>
          </div>
          
          {/** Password field for direct account */}
          <p className = "font-sans text-gray-600 text-sm">Password</p>

          <div className="relative w-70 h-12 mb-4">
            <input
              type="password"
              placeholder="Password"
              className="peer w-full h-full bg-transparent border-none outline-none text-black font-sans"
            />
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-400"
            ></span>
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100"
            ></span>
          </div>

          {/** Button to submit above fields to backend */}
          <button 
            className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-11 w-70 border-2 text-stone-50 cursor-pointer bg-stone-800`}
          >
            <span className={`absolute inset-0 bg-stone-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>
                            
            <span className={`relative z-10 transition-colors duration-300 group-hover:text-stone-50`}>
              Continue
            </span>
          </button>

          {/** Placeholder in case of unsuccesful account creation(invalid email, weak password or account already exists with email) */}
          <p></p>

=======
>>>>>>> dynamic-frontend
        </div>
      ))}

      {/* Submit button */}
      <button className="relative group overflow-hidden flex items-center justify-center h-11 w-full border-2 text-stone-50 bg-stone-800 font-sans cursor-pointer">
        <span className="absolute inset-0 bg-stone-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-stone-50">
          Continue
        </span>
      </button>

<<<<<<< HEAD
        {/** Contains fields for third party account creation */}
        <div className="flex flex-col absolute left-5/8 -translate-x-2/3 py-27 items-center">

          {/** Google account creation */}
          <button 
            className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-13 w-70 my-2 border-1 text-black cursor-pointer `}
          >
            <span className={`absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>

            <img src={google} alt="Google logo" className="absolute left-4 h-5 w-5" />
                            
            <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black`}>
              Continue with Google
            </span>
          </button>

          {/** Apple account creation */}
          <button 
            className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-13 w-70 my-2 border-1 text-black cursor-pointer `}
          >
            <span className={`absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>

            <img src={apple} alt="Apple logo" className="absolute left-4 h-7 w-7" />
                            
            <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black`}>
              Continue with Apple
            </span>
          </button>

          {/** Facebook account creation */}
          <button 
            className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-13 w-70 my-2 border-1 text-black cursor-pointer `}
          >
            <span className={`absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>

            <img src={facebook} alt="Facebook logo" className="absolute left-4 h-5 w-5" />
                            
            <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black`}>
              Continue with Facebook
            </span>
          </button>

          {/** Redirects user to login route if they already have an account */}
          <p className="flex text-sm py-1 items-center">Already have an account?&nbsp;
            <Link
                to="/login"
                className={`relative flex not-italic items-center text-black text-md cursor-pointer group before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-black before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100`}
            >
                Login Here
            </Link></p>

        </div>

      </div>
=======
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
>>>>>>> dynamic-frontend

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