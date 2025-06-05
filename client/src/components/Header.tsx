import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Clothify.logo.png';

function Header() {

    let location = useLocation();

    const BGHeader = () => {
        switch (location.pathname) {
            case "/":
                return {
                    text: "border-amber-50 text-amber-50",
                    textbase: "text-amber-50",
                    inv: "text-stone-800",
                    underline: "before:bg-amber-50",
                    transition: "bg-amber-50",
                    hov: "bg-amber-50",
                    bg: "bg-transparent"
                }
            case "/login":
                return {
                    text: "border-stone-800 text-stone-800",
                    textbase: "text-stone-800",
                    inv: "text-amber-50",
                    underline: "before:bg-stone-800",
                    transition: "bg-stone-800",
                    hov: "bg-stone-800",
                    bg: "bg-stone-100"
                }
            case "/get-started":
                return {
                    text: "border-stone-800 text-stone-800",
                    textbase: "text-stone-800",
                    inv: "text-amber-50",
                    underline: "before:bg-stone-800",
                    transition: "bg-stone-800",
                    hov: "bg-stone-800",
                    bg: "bg-stone-100"
                }
            default:
                return {
                    text: "border-stone-800 text-stone-800",
                    textbase: "text-stone-800",
                    inv: "text-amber-50",
                    underline: "before:bg-stone-800",
                    transition: "bg-stone-800",
                    hov: "bg-stone-800",
                    bg: "bg-stone-100"
                }
        }
    };

    const { text, textbase, inv, underline, transition, hov, bg } = BGHeader();

    return (
        <div>
            <div className={`flex  justify-between items-center px-6 py-2 ${bg}`}>
                <div className="flex cursor-pointer">
                    <img src={logo} alt="Clothify logo" width="54" height="54" />
                    <Link className="flex items-center font-light not-italic  text-3xl font-serif text-stone-800" to='/'>Clothify</Link>
                </div>

                <div className="flex gap-6 justify-end">
                    <div className="relative group">
                        <p
                            className={`relative h-10 flex not-italic items-center ${textbase} text-md cursor-pointer before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full ${underline} before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-300 group-hover:before:scale-x-100`}
                        >
                            Features
                        </p>

                        <div className="absolute left-1/2 -translate-x-1/2 w-36 h-4"></div>

                        <div className={`absolute left-1/2 -translate-x-1/2 hidden group-hover:flex group-hover:flex-col flex-col gap-2 mt-2 px-4 py-2 w-36 font-serif ${transition} ${inv} z-50 items-center text-center`}>
                            <Link to="/features/styling">Styling</Link>
                            <Link to="/features/closet">Closet</Link>
                            <Link to="/features/community">Community</Link>
                        </div>
                    </div>

                    <Link
                        to="/login"
                        className={`relative h-10 flex not-italic items-center ${textbase} text-md cursor-pointer group before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full ${underline} before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100`}
                    >
                        Login
                    </Link>
                    <Link 
                        className={`relative group overflow-hidden flex not-italic font-sans items-center justify-center h-10 w-34 border-2 ${text} font-medium cursor-pointer`} to='/get-started'
                    >
                        <span className={`absolute inset-0 ${hov} transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`}></span>
                        
                        <span className={`relative z-10 transition-colors duration-300 group-hover:${inv}`}>
                            GET STARTED
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;