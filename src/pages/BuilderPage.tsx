import { useState } from "react";
import { type Experience, type Education, type PersonalInfo } from "../types/cv";
import CVPreview from "../components/CVPreview";
import { Plus, Trash } from "lucide-react";
import Navbar from "../components/Navbar";

export default function BuilderPage(){
    const [personalInfo, setPersonalInfo]=useState<PersonalInfo>({
        name: "",
        email : "",
        phone: "",
    })

    const [education, setEducation]= useState<Education[]>([]);

    const [experience, setExperience]= useState<Experience[]>([]);

    const [skills, setSkills]= useState<string[]>([]);
    const [skillInput, setSkillInput]= useState("");

    return(
        <>
        <Navbar/>
        <div className="lg:grid lg:grid-cols-2 lg:items-start gap-6 p-4 sm:p-6">    
            <form action="#" className=" grid gap-10">
                <fieldset className="border bg-gray-100 rounded-xl mx-auto max-w-xl w-full p-6">{/* PERSONAL INFO */}
                    <legend className="text-2xl font-bold">Personal Information</legend>
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input type="text" placeholder="Enter Your Name"
                        value={personalInfo.name}
                        onChange={(e)=> setPersonalInfo({...personalInfo, name: e.target.value})}
                        className="mt-1 w-full rounded-md border px-3 py-2" required/>
            
                    </div>
                    <div>
                        <label  className="text-sm font-medium">Email</label>
                        <input type="text" placeholder="example: youremail@email.com"
                        value={personalInfo.email}
                        onChange={(e)=>setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="mt-1 w-full rounded-md border px-3 py-2" required/>
                    </div>
                    <div>
                        <label  className="text-sm font-medium">Phone No.</label>
                        <input type="tel" placeholder="+91 xxxxx xxxxx"
                        value={personalInfo.phone}
                        onChange={(e)=>setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="mt-1 w-full rounded-md border px-3 py-2 uppercase" required/>
                    </div>
                </fieldset>

                <fieldset className="border bg-gray-100 rounded-xl mx-auto max-w-xl w-full p-6">{/* EDUCATION */}
                    <legend className="text-xl font-bold">Education</legend>
                    <div className="flex justify-end">
                        
                        <button
                        type="button"
                        onClick={()=>{setEducation([...education, {
                            institution:"",
                            degree: "",
                            year: "",
                        }])}}
                        className="grid grid-cols-2 bg-black text-white px-2 py-1 rounded-sm items-center text-center max-w-24 mx-aut ps-5 hover:bg-gray-800 hover:cursor-pointer" 
                        >
                            Add <Plus size={20} color="white"/>
                        </button>
                    </div>
                    {
                        education.map((entry, index)=>
                            (<div key={index} className="grid gap-4 border rounded-sm bg-white mt-6 px-4 pb-3 pt-3 sm:grid-cols-2">
                                <div className="grid mt-1">
                                    <label className="font-semibold">Degree</label>
                                    <input type="text"
                                    value={entry.degree}
                                    placeholder="degree"
                                    onChange={(e)=>{
                                        setEducation((prevEducation)=> prevEducation.map(
                                                (item,i)=> index===i ?{...item, degree: e.target.value} : item
                                            )
                                        )
                                    }}
                                    className="px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    />
                                </div>
                                <div className="grid mt-1">
                                    <label className="font-semibold">Institution</label>
                                    <input type="text"
                                    value={entry.institution}
                                    placeholder="institution"
                                    onChange={(e)=>{
                                        setEducation((prevEducation)=> prevEducation.map(
                                                (item,i)=> index===i ?{...item, institution: e.target.value} : item
                                            )
                                        )
                                    }}
                                    className="px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    />
                                </div>
                                <div className="grid mt-1 sm:col-span-2">
                                    <label className="font-semibold">Year</label>
                                    <input type="text"
                                    value={entry.year}
                                    placeholder="year"
                                    onChange={(e)=>{
                                        setEducation((prevEducation)=> prevEducation.map(
                                                (item,i)=> index===i ?{...item, year: e.target.value} : item
                                            )
                                        )
                                    }}
                                    className="px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    />
                                </div>
                                <button
                                type="button"
                                onClick={()=>setEducation(prevEducation=>prevEducation.filter((_, i)=> index!==i))}
                                className="bg-black text-white rounded-xl px-4 py-2 mt-2 hover:bg-gray-900 hover:cursor-pointer sm:col-span-2"
                                >
                                    Remove
                                </button>
                            </div>)
                        )
                    }
                </fieldset>

                <fieldset className="border bg-gray-100 rounded-xl mx-auto max-w-xl w-full p-6">{/* WORK EXPERINCE */}
                    <legend className="text-xl font-bold"> Work Experience</legend>

                    <div className="grid justify-end">
                        <button
                        type="button"
                        onClick={()=>setExperience([{
                            company: "",
                            position: "",
                            startDate: "",
                            endDate: "",
                            description: "",
                        },...experience])}
                        className="grid grid-cols-2 bg-black text-white px-2 py-1 rounded-sm items-center text-center max-w-24 mx-aut ps-5 hover:bg-gray-800 hover:cursor-pointer"
                        >
                            Add <Plus size={20} color="white"/>
                        </button>
                    </div>
                    {experience.map((entry, index)=>(
                            <div key={index}
                            className="grid gap-4 border rounded-sm bg-white mt-6 px-4 pb-3 pt-3 sm:grid-cols-2"
                            >
                                <div className="w-full">
                                    <label className="mb-1 block font-medium">Company Name</label>
                                    <input type="text" 
                                    value={entry.company}
                                    onChange={(e)=>setExperience((prevExperience)=>
                                        prevExperience.map((item, i)=> index !==i ? item : {...item, company:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-1 block font-medium">Position</label>
                                    <input type="text" 
                                    value={entry.position}
                                    onChange={(e)=>setExperience((prevExperience)=>
                                        prevExperience.map((item, i)=> index !==i ? item : {...item, position:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-1 block font-medium">Start Date</label>
                                    <input type="month" 
                                    value={entry.startDate}
                                    onChange={(e)=>setExperience((prevExperience)=>
                                        prevExperience.map((item, i)=> index !==i ? item : {...item, startDate:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-1 block font-medium">End Date</label>
                                    <input type="month" 
                                    value={entry.endDate}
                                    onChange={(e)=>setExperience((prevExperience)=>
                                        prevExperience.map((item, i)=> index !==i ? item : {...item, endDate:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    />
                                </div>
                                <div className="w-full sm:col-span-2">
                                    <label className="mb-1 block font-medium">Description</label>
                                    <textarea
                                    value={entry.description}
                                    onChange={(e)=>setExperience((prevExperience)=>
                                        prevExperience.map((item, i)=> index !==i ? item : {...item, description:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    rows={3}
                                    />
                                </div>
                                <button
                                type="button"
                                onClick={()=>setExperience((prevExperience)=> prevExperience.filter((_, i)=> index !== i))}
                                className="bg-black text-white rounded-xl ms-auto px-4 py-2 mt-2 hover:bg-gray-900 hover:cursor-pointer sm:col-span-2"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                </fieldset>

                <fieldset className="border bg-gray-100 rounded-xl mx-auto max-w-xl w-full p-6">
                    <legend className="text-xl font-bold">Skills</legend>
                    <label >Enter A Skill</label>
                    <input
                        type="text"
                        placeholder="Enter a skill"
                        value={skillInput}
                        onChange={(e)=>setSkillInput(e.target.value)}
                        className="w-full px-3 py-2 border-2 rounded-xl bg-white"
                    />

                    <div className="mt-4 flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                           <div 
                           key={index}
                           className="rounded-full grid text-center grid-cols-2 gap-2 bg-white px-3 py-1 text-sm border">
                           <span
                            className="text-[1rem]"
                            >
                            {skill}
                            </span>
    
                            <button
                            type="button"
                            onClick={()=>setSkills((prevSkills)=>prevSkills.filter((_, i)=> i!==index ))}
                            className="cursor-pointer ms-auto w-auto"
                            >
                                <Trash size={16}/>
                            </button>
                           </div> 
                            
                        ))}
                    </div>

                    <div className="grid justify-end">
                        <button
                            type="button"
                            onClick={()=>{
                                if(skillInput.trim()==="") return;
                                setSkills([...skills, skillInput.trim()]);
                                setSkillInput("");
                            }}
                            className="mt-3 bg-black text-white px-4 py-2 rounded-xl grid justify-end"
                            >
                            Add Skill
                        </button>
                    </div>
                </fieldset>
            </form>
            <CVPreview personalInfo={personalInfo} education={education} experience={experience} skills={skills}/>
        </div>
        </>
    )
}