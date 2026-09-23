import { Link } from "react-router-dom";
import CVPreviewDemo from "./CVPreviewDemo";

export default function Hero(){


    return (
        <section className="grid grid-cols-1 gap-12 items-center px-6 py-24 md:grid-cols-2">
            <div>
                <h1 className="max-w-3xl text-5xl font-bold tracking-tight">Build a CV you are proud of</h1>
                <p className="mt-6 max-w-xl text-lg text-gray-600">
                    Create a professional CV in just a few minutes.
                </p>
                <Link to="builder" className=" inline-block mt-8 rounded-lg bg-black text-white px-6 py-3 font-medium transition hover:bg-gray-800">
                    Create my CV
                </Link>
            </div>

            <CVPreviewDemo/>
        </section>
    )
}