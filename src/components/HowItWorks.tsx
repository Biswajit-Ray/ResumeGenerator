export default function HowItWorks(){

    return(
        <section className="px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <h2 className="text-center text-3xl font-bold">How It Works</h2>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <div className="rounded-lg border p-6">
                        <div className="text-3xl font-bold">
                            01
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Enter Your Information</h3>
                        <p className="mt-2 text-gray-600">
                            Add you education, skills, and other details.
                        </p>
                    </div>
                    <div className="rounded-lg border p-6">
                        <div className="text-3xl font-bold">
                            02
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Choose a Template</h3>
                        <p className="mt-2 text-gray-600">Pick a professional design that fits your style.</p>
                    </div>
                    <div className="rounded-lg border p-6">
                        <div className="text-3xl font-bold">
                            03
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Download your CV</h3>
                        <p className="mt-2 text-gray-600">Generate your finished CV and download it as a PDF</p>
                    </div>
                </div>
            </div>
        </section>
    )
}