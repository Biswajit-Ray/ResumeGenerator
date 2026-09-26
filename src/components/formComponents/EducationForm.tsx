import type { Education } from "../../types/cv";
import { Plus } from "lucide-react";

interface EducationFormProps{
    education: Education[],
    onChange: (updatedEducation: Education[])=>void;
}

export default function EducationForm({education, onChange}: EducationFormProps){

    return (
        <fieldset className="border bg-gray-100 rounded-xl mx-auto max-w-xl w-full p-6">{/* EDUCATION */}
                    <legend className="text-xl font-bold">Education</legend>
                    <div>
                        
                        <button
                        type="button"
                        onClick={()=>{onChange([...education, {
                            institution:"",
                            degree: "",
                            year: "",
                        }])}}
                        className="grid grid-cols-2 bg-black text-white px-2 py-1 rounded-sm items-center text-center max-w-24 ms-auto ps-5 hover:bg-gray-800 hover:cursor-pointer" 
                        >
                            Add <Plus size={20} color="white"/>
                        </button>
                    </div>
                    {
                        education.map((entry, index)=>{
                            const hasEducationDetails = Boolean(
                                entry.degree.trim() || entry.institution.trim() || entry.year.trim()
                            );

                            const isRequired= index===0 || hasEducationDetails;

                            return (
                            <div key={index} className="grid gap-4 border rounded-sm bg-white mt-6 px-4 pb-3 pt-3 sm:grid-cols-2">
                                <div className="grid mt-1">
                                    <label className="font-semibold">Degree</label>
                                    <input type="text"
                                    value={entry.degree}
                                    placeholder="degree"
                                    onChange={(e)=>{
                                        onChange(education.map(
                                            (item,i)=> index===i 
                                            ?{...item, degree: e.target.value}
                                            : item
                                        )
                                        )
                                    }}
                                    className="px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    required={isRequired}
                                    maxLength={120}
                                    pattern=".*\S.*"
                                    title="Degree must include at least one non-space character."
                                    />
                                </div>
                                <div className="grid mt-1">
                                    <label className="font-semibold">Institution</label>
                                    <input type="text"
                                    value={entry.institution}
                                    placeholder="institution"
                                    onChange={(e)=>{
                                        onChange(
                                            education.map(
                                                (item,i)=> index===i 
                                                ?{...item, institution: e.target.value}
                                                : item
                                            )
                                        )
                                    }}
                                    className="px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    required={isRequired}
                                    maxLength={160}
                                    pattern=".*\S.*"
                                    title="Institution must include at least one non-space character."
                                    />
                                </div>
                                <div className="grid mt-1 sm:col-span-2">
                                    <label className="font-semibold">Year</label>
                                    <input type="text"
                                    value={entry.year}
                                    placeholder="year"
                                    inputMode="numeric"
                                    onChange={(e)=>{
                                        const year = e.target.value.replace(/\D/g, "").slice(0, 4);
                                        onChange(
                                            education.map(
                                                (item, i)=> index===i 
                                                ?{...item, year}
                                                : item
                                            )
                                        )
                                    }}
                                    className="px-3 py-2 border-2 rounded-xl bg-gray-100"
                                    required={isRequired}
                                    pattern="[0-9]{4}"
                                    title="Enter a four-digit year."
                                    maxLength={4}
                                    />
                                </div>
                                {education.length > 1 && (
                                    <button
                                    type="button"
                                    onClick={()=>onChange(education.filter((_, i)=> index!==i))}
                                    className="bg-black text-white rounded-xl px-4 py-2 mt-2 hover:bg-gray-900 hover:cursor-pointer sm:col-span-2"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            );
                        })
                    }
                </fieldset>
    )
}