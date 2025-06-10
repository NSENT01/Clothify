import { Link } from 'react-router-dom';

function Body() {
    return (
        <>
            <div className="absolute left-2/21 top-80 px-6 py-10 bg-transparent text-stone-800 font-sans font-semibold">
                <h1 className="text-6xl font-md mb-4">Welcome to Clothify</h1>
                <div className='flex flex-row items-start'>
                    <Link
                        to="/get-started"
                        className="relative group overflow-hidden flex not-italic font-sans rounded-lg text-stone-800 items-center mx-3 justify-center h-15 w-40 text-lg font-medium border-2 border-stone-800 cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-stone-800 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0"></span>

                        <span className="relative z-10 transition-colors duration-300 group-hover:text-amber-50">
                            GET STARTED
                        </span>
                    </Link>
                    <p className="text-md max-w-70 leading-relaxed self-center">
                    Discover a curated fashion experience. Build your future wardrobe.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Body
