import CVPreview from "../components/CVPreview";
import Navbar from "../components/Navbar";
import PersonalInfoForm from "../components/formComponents/PersonalInfoForm";
import EducationForm from "../components/formComponents/EducationForm";
import WorkExperienceForm from "../components/formComponents/WorkExperienceForm";
import SkillsForm from "../components/formComponents/SkillsForm";
import { useEffect, useRef, useState } from "react";
import type { CVData } from "../types/cv";
import TemplateSelector from "../components/TemplateSelector";
import { FileDown } from "lucide-react";

function getFieldError(field: HTMLInputElement | HTMLTextAreaElement) {
    const fieldName = field.closest("div")?.querySelector("label")?.textContent
        ?.replace("*", "")
        .trim()
        .toLowerCase() || "this field";

    if (field.validity.valueMissing) {
        return `Please enter ${fieldName}.`;
    }
    if (field.validity.typeMismatch && field instanceof HTMLInputElement && field.type === "email") {
        return "Please enter a valid email address.";
    }
    if (field.validity.patternMismatch && field.title) {
        return field.title;
    }
    if (field.validity.rangeUnderflow) {
        return `${fieldName} must be on or after the start date.`;
    }
    if (field.validity.badInput) {
        return `Please enter a valid ${fieldName}.`;
    }

    return `Please check the value entered for ${fieldName}.`;
}

export default function BuilderPage(){
    const formRef = useRef<HTMLFormElement>(null);
    const downloadButtonRef = useRef<HTMLButtonElement>(null);

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
        experience: [],
        skills: [],
        template: "classic",
    })

    const [skillInput, setSkillInput]= useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [validationError, setValidationError] = useState("");
    const [exportError, setExportError] = useState("");
    const [isExporting, setIsExporting] = useState(false);
    const [downloadButtonPosition, setDownloadButtonPosition] = useState<{ left: number; top: number } | null>(null);

    useEffect(() => {
        const preview = document.getElementById("cv-preview");
        if (!preview) {
            return;
        }

        const updateButtonPosition = () => {
            const button = downloadButtonRef.current;
            if (!button) {
                return;
            }

            const previewBounds = preview.getBoundingClientRect();
            const buttonBounds = button.getBoundingClientRect();
            const padding = 16;
            const minLeft = Math.max(previewBounds.left + padding, padding);
            const maxLeft = Math.min(
                previewBounds.right - buttonBounds.width - padding,
                window.innerWidth - buttonBounds.width - padding,
            );
            const minTop = Math.max(previewBounds.top + padding, padding);
            const maxTop = Math.min(
                previewBounds.bottom - buttonBounds.height - padding,
                window.innerHeight - buttonBounds.height - padding,
            );

            if (minLeft > maxLeft || minTop > maxTop) {
                setDownloadButtonPosition(null);
                return;
            }

            setDownloadButtonPosition({
                left: maxLeft,
                top: maxTop,
            });
        };

        updateButtonPosition();
        window.addEventListener("scroll", updateButtonPosition, { passive: true });
        window.addEventListener("resize", updateButtonPosition);
        const resizeObserver = new ResizeObserver(updateButtonPosition);
        resizeObserver.observe(preview);

        return () => {
            window.removeEventListener("scroll", updateButtonPosition);
            window.removeEventListener("resize", updateButtonPosition);
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!import.meta.env.DEV) {
            return;
        }

        let cancelled = false;
        let unregisterHelper: (() => void) | undefined;

        void import("../testProject").then(({ registerDummyResumeHelper }) => {
            if (cancelled) {
                return;
            }

            unregisterHelper = registerDummyResumeHelper((data) => {
                setCvData(data);
                setSkillInput("");
                setValidationMessage("");
                setValidationError("");
                setExportError("");
                formRef.current?.querySelectorAll("input, textarea").forEach((field) => {
                    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
                        field.setCustomValidity("");
                        field.removeAttribute("aria-invalid");
                        delete field.dataset.invalidField;
                    }
                });
            });
        }).catch((error: unknown) => {
            console.error("Failed to load the developer form helper.", error);
        });

        return () => {
            cancelled = true;
            unregisterHelper?.();
        };
    }, []);

    const handleExportPDF = async ()=>{
        const form = formRef.current;
        if (!form) {
            setExportError("The resume form is not available. Please try again.");
            return;
        }
        if (!form.checkValidity()) {
            setValidationMessage("");
            form.reportValidity();
            return;
        }

        setValidationError("");
        const element= document.getElementById("cv-preview");

        if (!element) {
            setExportError("The resume preview is not available. Please try again.");
            return;
        }

        setIsExporting(true);
        setExportError("");
        try {
            const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
                import("html2canvas"),
                import("jspdf"),
            ]);
            const canvas= await html2canvas(element, {
                scale: 2
            })

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            })

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const pageHeightInPixels = canvas.width * pageHeight / pageWidth;
            const pageCanvas = document.createElement("canvas");
            const pageContext = pageCanvas.getContext("2d");

            if (!pageContext) {
                throw new Error("Could not create a canvas context for PDF export.");
            }

            pageCanvas.width = canvas.width;
            for (let page = 0; page * pageHeightInPixels < canvas.height; page += 1) {
                const sourceY = page * pageHeightInPixels;
                const sliceHeight = Math.min(pageHeightInPixels, canvas.height - sourceY);
                pageCanvas.height = Math.ceil(sliceHeight);
                pageContext.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
                pageContext.drawImage(
                    canvas,
                    0,
                    sourceY,
                    canvas.width,
                    sliceHeight,
                    0,
                    0,
                    pageCanvas.width,
                    sliceHeight,
                );

                if (page > 0) {
                    pdf.addPage();
                }
                pdf.addImage(
                    pageCanvas.toDataURL("image/png"),
                    "PNG",
                    0,
                    0,
                    pageWidth,
                    sliceHeight * pageWidth / canvas.width,
                );
            }

            pdf.save("my-cv.pdf")
        } catch (error) {
            console.error("Failed to export resume as PDF.", error);
            setExportError("Unable to download the PDF. Please try again.");
        } finally {
            setIsExporting(false);
        }
    }

    return(
        <>
        <Navbar/>
        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-2 lg:items-start">
            <form
            ref={formRef}
            onChange={(event)=>{
                setValidationMessage("");
                setValidationError("");
                event.currentTarget.querySelectorAll("input, textarea").forEach((field)=>{
                    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
                        field.setCustomValidity("");
                        if (field.dataset.invalidField) {
                            field.removeAttribute("aria-invalid");
                            delete field.dataset.invalidField;
                        }
                    }
                });
            }}
            onInvalidCapture={(event)=>{
                const field = event.target;
                if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
                    const message = field.validity.customError
                        ? field.validationMessage
                        : getFieldError(field);
                    field.setCustomValidity(message);
                    field.dataset.invalidField = "true";
                    field.setAttribute("aria-invalid", "true");
                    const firstInvalidField = event.currentTarget.querySelector('[data-invalid-field="true"]');
                    if (firstInvalidField === field) {
                        setValidationError(message);
                    }
                }
            }}
            onSubmit={(event)=>{
                event.preventDefault();

                const form= event.target;

                if(!form.checkValidity()){
                    setValidationMessage("");
                    form.reportValidity();
                    return;
                }

                setValidationError("");
                setValidationMessage("All entered details are valid.");
            }}
            className="grid gap-10"
            >
                
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

                <div>
                    <button
                    type="submit"
                    className="rounded-xl bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
                    >
                        Validate Details
                    </button>
                    {validationMessage && (
                        <p role="status" className="mt-2 text-sm text-green-700">
                            {validationMessage}
                        </p>
                    )}
                </div>

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
        {validationError && (
            <div
                role="alert"
                aria-live="assertive"
                className="fixed left-1/2 top-6 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border border-red-300 border-l-4 border-l-red-600 bg-amber-50 p-4 shadow-lg"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="font-semibold text-gray-900">Please check your details</p>
                        <p className="mt-1 text-sm text-gray-800">{validationError}</p>
                    </div>
                    <button
                        type="button"
                        aria-label="Dismiss validation message"
                        onClick={() => setValidationError("")}
                        className="rounded px-2 text-lg leading-none text-gray-700 hover:bg-amber-100"
                    >
                        ×
                    </button>
                </div>
            </div>
        )}

        {exportError && (
            <div
                role="alert"
                className="fixed left-1/2 top-6 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border border-red-300 border-l-4 border-l-red-600 bg-amber-50 p-4 shadow-lg"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="font-semibold text-gray-900">PDF download failed</p>
                        <p className="mt-1 text-sm text-gray-800">{exportError}</p>
                    </div>
                    <button
                        type="button"
                        aria-label="Dismiss PDF download error"
                        onClick={() => setExportError("")}
                        className="rounded px-2 text-lg leading-none text-gray-700 hover:bg-amber-100"
                    >
                        ×
                    </button>
                </div>
            </div>
        )}

        <button
            ref={downloadButtonRef}
            type="button"
            onClick={handleExportPDF}
            disabled={isExporting}
            aria-busy={isExporting}
            aria-hidden={!downloadButtonPosition}
            tabIndex={downloadButtonPosition ? 0 : -1}
            style={{
                left: downloadButtonPosition?.left ?? 0,
                top: downloadButtonPosition?.top ?? 0,
                visibility: downloadButtonPosition ? "visible" : "hidden",
                pointerEvents: downloadButtonPosition ? "auto" : "none",
            }}
            className="fixed z-40 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-700 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-80"
        >
            <FileDown size={20} aria-hidden="true" />
            {isExporting ? "Preparing PDF..." : "Download PDF"}
        </button>
        </>
    )
}