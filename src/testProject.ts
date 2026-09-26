import type { CVData } from "./types/cv";

declare global {
    interface Window {
        fillResumeWithDummyData?: () => void;
    }
}

export function registerDummyResumeHelper(onFill: (data: CVData) => void) {
    const fillResumeWithDummyData = () => {
        onFill({
            personalInfo: {
                name: "Alex Morgan",
                email: "alex.morgan@example.com",
                phone: "+1 555 123 4567",
            },
            education: [
                {
                    institution: "Northwest University",
                    degree: "Bachelor of Science in Computer Science",
                    year: "2022",
                },
            ],
            experience: [
                {
                    company: "Brightside Technologies",
                    position: "Frontend Developer",
                    startDate: "2022-06",
                    endDate: "2025-03",
                    description: "Built accessible React interfaces and improved application performance.",
                },
            ],
            skills: ["React", "TypeScript", "Accessibility", "CSS"],
            template: "modern",
        });
    };

    window.fillResumeWithDummyData = fillResumeWithDummyData;
    console.info("Developer helper ready: run window.fillResumeWithDummyData() to fill the resume form.");

    return () => {
        if (window.fillResumeWithDummyData === fillResumeWithDummyData) {
            delete window.fillResumeWithDummyData;
        }
    };
}
