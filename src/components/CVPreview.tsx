import type { CVTemplate, Education, Experience, PersonalInfo } from "../types/cv";

interface CVPreviewProps{
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: string[];
    template: CVTemplate;
}

const previewStyles: Record<CVTemplate, {
    font: string;
    headerBorder: string;
    name: string;
    contact: string;
    sectionHeading: string;
    sectionDivider: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    description: string;
    entryDivider: string;
    skill: string;
}> = {
    classic: {
        font: "font-serif",
        headerBorder: "border-b-2 border-gray-900",
        name: "text-gray-950",
        contact: "text-gray-600",
        sectionHeading: "border-b border-gray-900 pb-2 text-gray-900 tracking-[0.2em]",
        sectionDivider: "divide-gray-200",
        primaryText: "text-gray-900",
        secondaryText: "text-gray-600",
        tertiaryText: "text-gray-500",
        description: "text-gray-700",
        entryDivider: "border-gray-200",
        skill: "border border-gray-300 text-gray-700",
    },
    modern: {
        font: "font-sans",
        headerBorder: "border-b-4 border-teal-700",
        name: "text-slate-950",
        contact: "text-slate-600",
        sectionHeading: "border-b border-teal-200 pb-2 text-teal-800 tracking-[0.2em]",
        sectionDivider: "divide-slate-200",
        primaryText: "text-slate-950",
        secondaryText: "text-slate-600",
        tertiaryText: "text-slate-500",
        description: "text-slate-600",
        entryDivider: "border-slate-200",
        skill: "rounded-full border border-teal-200 bg-teal-50 text-teal-800",
    },
    minimal: {
        font: "font-sans",
        headerBorder: "border-b border-slate-300",
        name: "text-slate-900",
        contact: "text-slate-500",
        sectionHeading: "border-l-2 border-slate-400 pb-1 pl-3 text-slate-700 tracking-wide",
        sectionDivider: "divide-slate-100",
        primaryText: "text-slate-900",
        secondaryText: "text-slate-600",
        tertiaryText: "text-slate-500",
        description: "text-slate-600",
        entryDivider: "border-slate-100",
        skill: "rounded-md bg-slate-100 text-slate-700",
    },
    executive: {
        font: "font-serif",
        headerBorder: "border-b-4 border-slate-800",
        name: "text-slate-900",
        contact: "text-slate-600",
        sectionHeading: "border-b-2 border-amber-600 pb-2 text-slate-800 tracking-[0.25em]",
        sectionDivider: "divide-slate-200",
        primaryText: "text-slate-900",
        secondaryText: "text-slate-600",
        tertiaryText: "text-slate-500",
        description: "text-slate-700",
        entryDivider: "border-slate-200",
        skill: "border border-slate-300 bg-slate-50 text-slate-800",
    },
};

export default function CVPreview({personalInfo, education, experience, skills, template}: CVPreviewProps){
    const styles = previewStyles[template];
    const completedEducation = education.filter((entry) =>
        entry.degree.trim() || entry.institution.trim() || entry.year.trim()
    );
    const completedExperience = experience.filter((entry) =>
        entry.company.trim() || entry.position.trim() || entry.startDate.trim()
        || entry.endDate.trim() || entry.description.trim()
    );

    return (
        <div 
        id="cv-preview"
        className={`mx-auto min-h-[297mm] w-full max-w-[210mm] overflow-hidden bg-white px-6 py-8 text-gray-900 shadow-xl sm:px-10 sm:py-12 ${styles.font}`}>
            <header className={`pb-6 ${styles.headerBorder}`}>
                <h2 className={`wrap-break-word text-4xl font-bold leading-tight tracking-tight sm:text-5xl ${styles.name}`}>
                    {personalInfo.name || "Your Name"}
                </h2>
                <div className={`mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm ${styles.contact}`}>
                    {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
                    {personalInfo.phone && <p>{personalInfo.phone}</p>}
                </div>
            </header>

            <div className={`divide-y ${styles.sectionDivider}`}>
                <section className="py-7">
                    <h3 className={`text-sm font-bold uppercase ${styles.sectionHeading}`}>
                        Education
                    </h3>
                    <div className="mt-5 space-y-5">
                        {completedEducation.map((entry, index) => (
                            <div key={index} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                <div className="min-w-0">
                                    <p className={`font-bold ${styles.primaryText}`}>{entry.degree}</p>
                                    <p className={styles.secondaryText}>{entry.institution}</p>
                                </div>
                                <p className={`shrink-0 text-sm sm:text-right ${styles.tertiaryText}`}>{entry.year}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-7">
                    <h3 className={`text-sm font-bold uppercase ${styles.sectionHeading}`}>
                        Experience
                    </h3>
                    <div className="mt-5 space-y-6">
                        {completedExperience.map((entry, index) => (
                            <div key={index} className={`border-b pb-5 last:border-b-0 last:pb-0 ${styles.entryDivider}`}>
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                    <div className="min-w-0">
                                        <p className={`font-bold ${styles.primaryText}`}>{entry.position}</p>
                                        <p className={styles.secondaryText}>{entry.company}</p>
                                    </div>
                                    <p className={`shrink-0 text-sm sm:text-right ${styles.tertiaryText}`}>
                                        {entry.startDate}{entry.startDate && entry.endDate ? " - " : ""}{entry.endDate}
                                    </p>
                                </div>
                                {entry.description && (
                                    <p className={`mt-3 text-sm leading-6 ${styles.description}`}>{entry.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-7">
                    <h3 className={`text-sm font-bold uppercase ${styles.sectionHeading}`}>
                        Skills
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span
                            key={index}
                            className={`px-3 py-1 text-sm ${styles.skill}`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}