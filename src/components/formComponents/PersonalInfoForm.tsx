import type { PersonalInfo } from "../../types/cv"

interface PersonalFormProps{
    personalInfo: PersonalInfo,
    setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>
}

export default function PersonalInfoForm({personalInfo, setPersonalInfo}: PersonalFormProps){

    


    return(
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
    )
}