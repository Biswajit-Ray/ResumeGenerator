import { Trash } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface SkillInputProps{
    skillInput: string,
    skills: string[],
    setSkillInput: Dispatch<SetStateAction<string>>,
    setSkills: Dispatch<SetStateAction<string[]>>
}

export default function SkillsForm({skillInput, skills, setSkillInput, setSkills}: SkillInputProps){
    
    return(
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
    )
}