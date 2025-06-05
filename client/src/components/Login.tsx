import logo from '../assets/Clothify.logo.png';
import facebook from '../assets/Facebook-Logo.png';
import apple from '../assets/apple-icon.png';
import google from '../assets/google-icon.png';

export default function Login() {
  return (
    <div className="flex py-50 justify-center">

      <div className="flex flex-col items-center justify-center">

        <img src={logo} alt="Clothify logo" width="40" height="40" />
        <h1 className="text-2xl font-sans font-lightbold text-black">Log into Clothify</h1>

      </div>


        <div className="flex flex-col absolute left-3/8 -translate-x-1/3 justify-start py-25">

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

          <button 
            className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-11 w-70 border-2 text-stone-50 cursor-pointer bg-stone-800`}
          >
            <span className={`absolute inset-0 bg-stone-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>
                            
            <span className={`relative z-10 transition-colors duration-300 group-hover:text-stone-50`}>
              Log In
            </span>
          </button>

        </div>

        <div className="absolute w-[1px] bg-gray-300 mt-25 py-27" />

        <div className="flex flex-col absolute left-5/8 -translate-x-2/3 py-30 items-center">

          <button 
            className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-13 w-70 my-1 border-1 text-black cursor-pointer `}
          >
            <span className={`absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>

            <img src={google} alt="Google logo" className="absolute left-4 h-5 w-5" />
                            
            <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black`}>
              Continue with Google
            </span>
          </button>

          <button 
            className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-13 w-70 my-1 border-1 text-black cursor-pointer `}
          >
            <span className={`absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>

            <img src={apple} alt="Apple logo" className="absolute left-4 h-7 w-7" />
                            
            <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black`}>
              Continue with Apple
            </span>
          </button>

          <button 
            className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-13 w-70 my-1 border-1 text-black cursor-pointer `}
          >
            <span className={`absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>

            <img src={facebook} alt="Facebook logo" className="absolute left-4 h-5 w-5" />
                            
            <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black`}>
              Continue with Facebook
            </span>
          </button>

        </div>

      </div>

  );
}