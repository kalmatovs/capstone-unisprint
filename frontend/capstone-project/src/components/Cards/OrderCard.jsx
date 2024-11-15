import React from 'react'

const OrderCard = ({title, date, content, category, price, urgency, skills_needed}) => {


  return (
    <>
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    {/* <!-- Urgency Indicator --> */}
    <div class="bg-red-500 text-white text-xs font-semibold uppercase px-4 py-2 text-center">
        Urgent
    </div>
    
    {/* <!-- Main Content --> */}
    <div class="p-4">
        {/* <!-- Job Title --> */}
        <h2 class="text-xl font-semibold text-gray-800">Math Tutoring for Calculus II</h2>
        
        {/* <!-- Job Description --> */}
        <p class="mt-2 text-gray-600 text-sm">
            Need help reviewing derivatives and integrals for upcoming exam. 1-hour session.
        </p>
        
        {/* <!-- Category and Location --> */}
        <div class="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span class="inline-flex items-center">
                <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
                Tutoring
            </span>
            <span class="inline-flex items-center">
                <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 19l-1.415-1.414A2 2 0 012 15.586V7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v5.586a2 2 0 01-.586 1.414L14.707 19"></path>
                </svg>
                Library, Study Room B
            </span>
        </div>
        
        {/* <!-- Date, Time, Duration --> */}
        <div class="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span class="inline-flex items-center">
                <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 0v4m5 4H3m12 4h3m-6 0h3m-3 4h3m3-4v3m-3 0v3"></path>
                </svg>
                April 12, 3 PM
            </span>
            <span class="inline-flex items-center">
                <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 15.121A4 4 0 016.343 14H18a2 2 0 012 2v3"></path>
                </svg>
                1 hour
            </span>
        </div>
        
        {/* <!-- Payment --> */}
        <div class="mt-4 text-lg font-semibold text-green-500">$15 / hour</div>
        
        {/* <!-- Apply Button --> */}
        <button class="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
            Apply Now
        </button>
    </div>
</div>

    </>
  )
}

export default OrderCard