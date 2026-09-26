import { Plus } from "lucide-react";
import type { Experience } from "../../types/cv";

interface WorkExperienceFormProps{
    experience: Experience[],
    onChange: (updatedInfo: Experience[])=> void;
}

export default function WorkExperienceForm({experience, onChange}: WorkExperienceFormProps){
    

    
    return(
        <fieldset className="border bg-gray-100 rounded-xl mx-auto max-w-xl w-full p-6">{ /* WORK EXPERINCE */}
                    <legend className="text-xl font-bold"> Work Experience</legend>

                    <div >
                        <button
                        type="button"
                        onClick={()=>onChange([{
                            company: "",
                            position: "",
                            startDate: "",
                            endDate: "",
                            description: "",
                        },...experience])}
                        className="grid grid-cols-2 bg-black text-white px-2 py-1 rounded-sm items-center text-center max-w-24 ms-auto ps-5 hover:bg-gray-800 hover:cursor-pointer"
                        >
                            Add <Plus size={20} color="white"/>
                        </button>
                    </div>
                    {experience.map((entry, index)=>{
                        const hasExperienceDetails = Boolean(
                            entry.company.trim() || entry.position.trim() || entry.startDate
                            || entry.endDate || entry.description.trim()
                        );

                        return (
                            <div key={index}
                            className="grid gap-4 border rounded-sm bg-white mt-6 px-4 pb-3 pt-3 sm:grid-cols-2"
                            >
                                <div className="w-full">
                                    <label className="mb-1 block font-medium">Company Name</label>
                                    <input type="text" 
                                    value={entry.company}
                                    onChange={(e)=>onChange(experience.map((item, i)=> index !==i ? item : {...item, company:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    required={hasExperienceDetails}
                                    maxLength={160}
                                    pattern=".*\S.*"
                                    title="Company name must include at least one non-space character."
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-1 block font-medium">Position</label>
                                    <input type="text" 
                                    value={entry.position}
                                    onChange={(e)=>onChange(
                                        experience.map((item, i)=> index !==i ? item : {...item, position:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    required={hasExperienceDetails}
                                    maxLength={120}
                                    pattern=".*\S.*"
                                    title="Position must include at least one non-space character."
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-1 block font-medium">Start Date</label>
                                    <input type="month" 
                                    value={entry.startDate}
                                    onChange={(e)=>onChange(experience.map((item, i)=> index !==i ? item : {...item, startDate:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    required={hasExperienceDetails}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-1 block font-medium">End Date</label>
                                    <input type="month"
                                    value={entry.endDate}
                                    onChange={(e)=>onChange(experience.map((item, i)=> index !==i ? item : {...item, endDate:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    min={entry.startDate || undefined}
                                    />
                                </div>
                                <div className="w-full sm:col-span-2">
                                    <label className="mb-1 block font-medium">Description</label>
                                    <textarea
                                    value={entry.description}
                                    onChange={(e)=>onChange(experience.map((item, i)=> index !==i ? item : {...item, description:e.target.value} )
                                    )}
                                    className="w-full px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    rows={3}
                                    maxLength={2000}
                                    />
                                </div>
                                
                                    <button
                                    type="button"
                                    onClick={()=>onChange(experience.filter((_, i)=> index !== i))}
                                    className="bg-black text-white rounded-xl ms-auto px-4 py-2 mt-2 hover:bg-gray-900 hover:cursor-pointer sm:col-span-2"
                                    >
                                        Remove
                                    </button>
                                
                            </div>
                        );
                    })}

                </fieldset>
    )
}