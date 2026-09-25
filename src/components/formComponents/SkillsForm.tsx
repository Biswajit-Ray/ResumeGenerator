import { Trash } from "lucide-react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface SkillInputProps{
    skillInput: string,
    skills: string[],
    setSkillInput: Dispatch<SetStateAction<string>>,
    onChange: (updatedExperience: string[])=>void,
}

export default function SkillsForm({skillInput, skills, setSkillInput, onChange}: SkillInputProps){
    const [skillError, setSkillError] = useState("");

    return(
        <fieldset className="border bg-gray-100 rounded-xl mx-auto max-w-xl w-full p-6">
                    <legend className="text-xl font-bold">Skills</legend>
                    <label htmlFor="skill-input">Enter A Skill</label>
                    <input
                        id="skill-input"
                        type="text"
                        placeholder="Enter a skill"
                        value={skillInput}
                        onChange={(e)=>{
                            setSkillInput(e.target.value);
                            setSkillError("");
                        }}
                        className="w-full px-3 py-2 border-2 rounded-xl bg-white"
                        maxLength={60}
                        aria-invalid={Boolean(skillError)}
                        aria-describedby={skillError ? "skill-error" : undefined}
                    />
                    {skillError && (
                        <p id="skill-error" role="alert" className="mt-1 text-sm text-red-700">
                            {skillError}
                        </p>
                    )}

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
                            onClick={()=>onChange(skills.filter((_, i)=> i!==index ))}
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
                                const newSkill = skillInput.trim();
                                if(newSkill === ""){
                                    setSkillError("Enter a skill before adding it.");
                                    return;
                                }
                                if(skills.some((skill)=>skill.toLocaleLowerCase() === newSkill.toLocaleLowerCase())){
                                    setSkillError("This skill has already been added.");
                                    return;
                                }
                                onChange([...skills, skillInput.trim()]);
                                setSkillInput("");
                                setSkillError("");
                            }}
                            className="mt-3 bg-black text-white px-4 py-2 rounded-xl grid justify-end"
                            >
                            Add Skill
                        </button>
                    </div>
                </fieldset>
    )
}