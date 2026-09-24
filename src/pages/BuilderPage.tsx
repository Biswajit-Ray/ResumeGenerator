import CVPreview from "../components/CVPreview";
import Navbar from "../components/Navbar";
import PersonalInfoForm from "../components/formComponents/PersonalInfoForm";
import EducationForm from "../components/formComponents/EducationForm";
import WorkExperienceForm from "../components/formComponents/WorkExperienceForm";
import SkillsForm from "../components/formComponents/SkillsForm";
import { useState } from "react";
import type { Education, Experience, PersonalInfo } from "../types/cv";

export default function BuilderPage(){

    const [personalInfo, setPersonalInfo]=useState<PersonalInfo>({
            name: "",
            email : "",
            phone: "",
        })

    const [education, setEducation]= useState<Education[]>([]);

    const [experience, setExperience]= useState<Experience[]>([]);

    const [skillInput, setSkillInput]= useState("");
    const [skills, setSkills]= useState<string[]>([]);

    return(
        <>
        <Navbar/>
        <div className="lg:grid lg:grid-cols-2 lg:items-start gap-6 p-4 sm:p-6">    
            <form action="#" className=" grid gap-10">
                
                <PersonalInfoForm personalInfo={personalInfo} setPersonalInfo={setPersonalInfo}/>

                <EducationForm education={education} setEducation={setEducation}/>                

                <WorkExperienceForm experience={experience} setExperience={setExperience}/>

                <SkillsForm skillInput={skillInput }setSkillInput={setSkillInput} skills={skills} setSkills={setSkills}/>
            </form>
            <CVPreview personalInfo={personalInfo} education={education} experience={experience} skills={skills}/>
        </div>
        </>
    )
}