import React from 'react'

function Testimonials() {

    const testimonials = [
        {
            name: "Priya Sharma",
            course: "Interior Design Diploma",
            message: "This course transformed my career! The hands-on projects and industry exposure helped me land my dream job."
        },
        {
            name: "Rahul Verma",
            course: "B.Sc. Interior Design",
            message: "The faculty is amazing and the curriculum is perfectly designed for industry requirements. 100% recommended!"
        },
        {
            name: "Anjali Patel",
            course: "Advanced Diploma",
            message: "The placement assistance and practical training made all the difference. Got placed with a 5L package!"
        }
    ];

    return (
        < div className="mb-12 sm:mb-16" >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-10 text-center">💬 Student Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white border-2 border-yellow-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-yellow-500 text-4xl mb-4">❝</div>
                        <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.message}"</p>
                        <div className="border-t border-yellow-200 pt-4">
                            <h4 className="font-bold text-black text-lg">{testimonial.name}</h4>
                            <p className="text-yellow-600 text-sm">{testimonial.course}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >)
}

export default Testimonials