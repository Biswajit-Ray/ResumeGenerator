import type { CVTemplate } from "../types/cv";


interface TemplateSelectorProps{
    template: CVTemplate;
    onChange: (updatedTemplate: CVTemplate)=>void;
}

const buttonBaseClass = "rounded-lg border px-4 py-2 transition-colors";
const templateButtonStyles: Record<CVTemplate, { selected: string; unselected: string }> = {
    classic: {
        selected: "border-gray-900 bg-gray-900 text-white",
        unselected: "border-gray-300 bg-white text-gray-700 hover:border-gray-500",
    },
    modern: {
        selected: "border-teal-700 bg-teal-700 text-white",
        unselected: "border-gray-300 bg-white text-gray-700 hover:border-teal-400",
    },
    minimal: {
        selected: "border-slate-600 bg-slate-600 text-white",
        unselected: "border-slate-300 bg-white text-slate-700 hover:border-slate-500",
    },
    executive: {
        selected: "border-slate-800 bg-slate-800 text-white",
        unselected: "border-slate-300 bg-white text-slate-700 hover:border-amber-600",
    },
};

const templateOptions: { value: CVTemplate; label: string }[] = [
    { value: "classic", label: "Classic" },
    { value: "modern", label: "Modern" },
    { value: "minimal", label: "Minimal" },
    { value: "executive", label: "Executive" },
];

export default function TemplateSelector({template, onChange}: TemplateSelectorProps){
    return (
        <div className="mb-4 flex flex-wrap gap-3">
            {templateOptions.map(({value, label}) => (
                <button
                key={value}
                type="button"
                onClick={()=>onChange(value)}
                aria-pressed={template === value}
                className={`${buttonBaseClass} ${templateButtonStyles[value][template === value ? "selected" : "unselected"]}`}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}