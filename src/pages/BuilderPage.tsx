import CVPreview from "../components/CVPreview";
import Navbar from "../components/Navbar";
import PersonalInfoForm from "../components/formComponents/PersonalInfoForm";
import EducationForm from "../components/formComponents/EducationForm";
import WorkExperienceForm from "../components/formComponents/WorkExperienceForm";
import SkillsForm from "../components/formComponents/SkillsForm";
import { useState } from "react";
import type { CVData } from "../types/cv";
import TemplateSelector from "../components/TemplateSelector";

export default function BuilderPage(){

    const [cvData, setCvData]= useState<CVData>({
        personalInfo:{
            name: "",
            email: "",
            phone: "",
        },
        education: [{
            institution: "",
            degree: "",
            year: "",
        }],
        experience: [{
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
        }],
        skills: [],
        template: "classic",
    })

    const [skillInput, setSkillInput]= useState("");

    return(
        <>
        <Navbar/>
        <div className="lg:grid lg:grid-cols-2 lg:items-start gap-6 p-4 sm:p-6">    
            <form action="#" className=" grid gap-10">
                
                <PersonalInfoForm 
                personalInfo={cvData.personalInfo} 
                onChange={(updatedInfo)=>
                setCvData((prev)=>({
                    ...prev, 
                    personalInfo:updatedInfo,
                    }))}
                />

                <EducationForm 
                education={cvData.education} 
                onChange={ (updatedEducation)=>
                    setCvData(
                        (prev)=>({
                            ...prev,
                            education: updatedEducation,
                        })
                    )

                }/>                

                <WorkExperienceForm 
                experience={cvData.experience} 
                onChange={(updatedExperience)=>
                    setCvData(
                        (prev)=>(
                        {...prev,
                            experience: updatedExperience,
                        }
                        )
                    )
                }/>

                <SkillsForm 
                skillInput={skillInput } setSkillInput={setSkillInput} 
                skills={cvData.skills} 
                onChange={
                    (updatedSkills)=>setCvData(
                        (prev)=>(
                            {
                                ...prev,
                                skills: updatedSkills,
                            }
                        )
                    )
                }/>

            </form>

            <div>
                <TemplateSelector 
                template={cvData.template} 
                onChange={(updatedTemplate)=>setCvData(
                    (prev)=>(
                        {
                            ...prev,
                            template: updatedTemplate,
                        }
                ))}
                />
                <CVPreview personalInfo={cvData.personalInfo} education={cvData.education} experience={cvData.experience} skills={cvData.skills} template={cvData.template}/>
            </div>
        </div>
        </>
    )
}