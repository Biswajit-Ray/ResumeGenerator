 export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
}

export interface Education {
    institution: string;
    degree: string;
    year: string;
}

export interface Experience{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export type CVTemplate = "classic" | "modern" | "minimal" | "executive";

export interface CVData{
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: string[];
    template: CVTemplate;
}