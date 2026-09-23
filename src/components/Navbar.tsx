import { Link, useLocation } from "react-router-dom";

export default function Navbar(){

    const location= useLocation();

    const isLandingPage = location.pathname==='/';

    return (
        <nav className="flex items-center justify-between px-10 py-5">
            <div className="text-2xl font-bold">CVForge</div>
            <div className="flex items-center gap-6">
                <Link to="#" className="hover:underline">Templates</Link>
                <Link to="#" className="hover:underline">How it Works</Link>
                <Link to={isLandingPage? "builder": "/"} 
                className="rounded-lg bg-black text-white px-5 py-2.5"
                >
                    {isLandingPage?"Create CV": "Go to HomePage"}
                </Link>
            </div>
        </nav>
    )
}