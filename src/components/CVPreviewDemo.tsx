

export default function CVPreviewDemo(){

    return(
        <div className="rounded-lg bg-white p-6 font-serif shadow-2xl sm:p-8">
            <header className="border-b-2 border-gray-900 pb-5">
                <h2 className="text-3xl font-bold tracking-tight">Biswajit Ray</h2>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span>biswajit@example.com</span>
                    <span>+91 98765 43210</span>
                </div>
            </header>
            <section className="py-5">
                <h3 className="border-b border-gray-900 pb-2 text-xs font-bold uppercase tracking-[0.2em]">Education</h3>
                <div className="mt-4 flex flex-col justify-between gap-1 sm:flex-row">
                    <div>
                        <p className="font-bold">Bachelor of Technology</p>
                        <p className="text-sm text-gray-600">Electronics & Communication Engineering</p>
                    </div>
                    <p className="text-sm text-gray-500">2020 - 2024</p>
                </div>
            </section>
            <section className="border-t border-gray-200 py-5">
                <h3 className="border-b border-gray-900 pb-2 text-xs font-bold uppercase tracking-[0.2em]">Experience</h3>
                <div className="mt-4">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <div>
                            <p className="font-bold">Software Intern</p>
                            <p className="text-sm text-gray-600">XYZ Technologies</p>
                        </div>
                        <p className="text-sm text-gray-500">2023 - 2024</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                        Developed web applications and collaborated with a team of engineers.
                    </p>
                </div>
            </section>
            <section className="border-t border-gray-200 py-5">
                <h3 className="border-b border-gray-900 pb-2 text-xs font-bold uppercase tracking-[0.2em]">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {["React", "TypeScript", "JavaScript"].map((skill) => (
                        <span key={skill} className="border border-gray-300 px-3 py-1 text-sm text-gray-700">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
        </div>
    )
}