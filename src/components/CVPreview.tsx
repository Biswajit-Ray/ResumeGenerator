import type { Education, Experience, PersonalInfo } from "../types/cv";

interface CVPreviewProps{
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: string[];
}

export default function CVPreview({personalInfo, education, experience, skills}: CVPreviewProps){
    return (
        <div className="mx-auto w-full max-w-[210mm] min-h-[297mm] overflow-hidden bg-white px-6 py-8 font-serif text-gray-900 shadow-xl sm:px-10 sm:py-12">
            <header className="border-b-2 border-gray-900 pb-6">
                <h2 className="wrap-break-word text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                    {personalInfo.name || "Your Name"}
                </h2>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
                    {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
                    {personalInfo.phone && <p>{personalInfo.phone}</p>}
                </div>
            </header>

            <div className="divide-y divide-gray-200">
                <section className="py-7">
                    <h3 className="border-b border-gray-900 pb-2 text-sm font-bold uppercase tracking-[0.2em]">
                        Education
                    </h3>
                    <div className="mt-5 space-y-5">
                        {education.map((entry, index) => (
                            <div key={index} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                <div className="min-w-0">
                                    <p className="font-bold">{entry.degree}</p>
                                    <p className="text-gray-600">{entry.institution}</p>
                                </div>
                                <p className="shrink-0 text-sm text-gray-500 sm:text-right">{entry.year}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-7">
                    <h3 className="border-b border-gray-900 pb-2 text-sm font-bold uppercase tracking-[0.2em]">
                        Experience
                    </h3>
                    <div className="mt-5 space-y-6">
                        {experience.map((entry, index) => (
                            <div key={index} className="border-b border-gray-200 pb-5 last:border-b-0 last:pb-0">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                    <div className="min-w-0">
                                        <p className="font-bold">{entry.position}</p>
                                        <p className="text-gray-600">{entry.company}</p>
                                    </div>
                                    <p className="shrink-0 text-sm text-gray-500 sm:text-right">
                                        {entry.startDate}{entry.startDate && entry.endDate ? " - " : ""}{entry.endDate}
                                    </p>
                                </div>
                                {entry.description && (
                                    <p className="mt-3 text-sm leading-6 text-gray-700">{entry.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-7">
                    <h3 className="border-b border-gray-900 pb-2 text-sm font-bold uppercase tracking-[0.2em]">
                        Skills
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="border border-gray-300 px-3 py-1 text-sm text-gray-700">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}