import type { PersonalInfo } from "../../types/cv"

interface PersonalFormProps{
    personalInfo: PersonalInfo,
    onChange: (updatedInfo: PersonalInfo)=> void;
}

export default function PersonalInfoForm({personalInfo, onChange}: PersonalFormProps){

    


    return(
        <fieldset className="border bg-gray-100 rounded-xl mx-auto max-w-xl w-full p-6">{/* PERSONAL INFO */}
                    <legend className="text-2xl font-bold">Personal Information</legend>
                    <div>
                        <label className="text-sm font-medium grid grid-cols-2 w-fit">Name <span className="text-red-600 text-">*</span></label>
                        <input type="text" placeholder="Enter Your Name"
                        value={personalInfo.name}
                        onChange={(e)=> onChange({...personalInfo, name: e.target.value})}
                        className="mt-1 w-full rounded-md border px-3 py-2"
                        autoComplete="name"
                        minLength={2}
                        maxLength={100}
                        pattern=".*\S.*"
                        title="Name must include at least one non-space character."
                        required
                        />
            
                    </div>
                    <div>
                        <label  className="text-sm font-medium grid grid-cols-2 w-fit">Email <span className="text-red-600">*</span></label>
                        <input type="email" placeholder="example: youremail@email.com"
                        value={personalInfo.email}
                        onChange={(e)=>onChange({...personalInfo, email: e.target.value})}
                        className="mt-1 w-full rounded-md border px-3 py-2"
                        autoComplete="email"
                        maxLength={254}
                        required
                        />
                    </div>
                    <div>
                        <label  className="text-sm font-medium">Phone No. <span className="text-red-600">*</span> </label>
                        <input type="tel" placeholder="+91 xxxxx xxxxx"
                        value={personalInfo.phone}
                        onChange={(e)=>onChange({...personalInfo, phone: e.target.value})}
                        className="mt-1 w-full rounded-md border px-3 py-2"
                        autoComplete="tel"
                        pattern="\+?[0-9][0-9 ().-]{5,18}[0-9]"
                        title="Enter a valid phone number using digits, spaces, +, parentheses, dots, or hyphens."
                        required
                        />
                    </div>
                </fieldset>
    )
}