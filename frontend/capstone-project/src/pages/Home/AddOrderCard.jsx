import React from 'react'

const AddOrderCard = ( {toggleModal}) => {

  return (
    <>
    {/* <!-- Modal Background --> */}
<div id="jobPostModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    {/* <!-- Modal Container --> */}
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* <!-- Close Button --> */}
        <button onClick={toggleModal} class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        
        {/* <!-- Modal Title --> */}
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Post a Job</h2>
        
        {/* <!-- Job Form --> */}
        <form>
            {/* <!-- Job Title --> */}
            <label class="block mb-2 text-gray-600">Job Title</label>
            <input type="text" placeholder="e.g., Math Tutoring for Calculus II" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4"/>

            {/* <!-- Job Description --> */}
            <label class="block mb-2 text-gray-600">Job Description</label>
            <textarea placeholder="Describe the task you need help with" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4"></textarea>
            
            {/* <!-- Category --> */}
            <label class="block mb-2 text-gray-600">Category</label>
            <select class="text-black w-full border border-gray-300 rounded-md p-2 mb-4">
                <option>Tutoring</option>
                <option>Food Delivery</option>
                <option>Tech Help</option>
                <option>Moving Services</option>
                <option>Other</option>
            </select>

            {/* <!-- Location --> */}
            <label class="block mb-2 text-gray-600">Location</label>
            <input type="text" placeholder="e.g., Library, Study Room B" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4"/>
            
            {/* <!-- Date & Time --> */}
            <label class="block mb-2 text-gray-600">Date & Time</label>
            <input type="datetime-local" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4"/>
            
            {/* <!-- Duration --> */}
            <label class="block mb-2 text-gray-600">Duration (in hours)</label>
            <input type="number" placeholder="e.g., 1" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4"/>
            
            {/* <!-- Payment --> */}
            <label class="block mb-2 text-gray-600">Payment</label>
            <input type="number" placeholder="e.g., 15" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4"/>
            
            {/* <!-- Urgency Checkbox --> */}
            <label class="inline-flex items-center mt-4">
                <input type="checkbox" class="form-checkbox text-red-500" />
                <span class="ml-2 text-gray-700">Mark as Urgent</span>
            </label>
            
            {/* <!-- Submit Button --> */}
            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-6">
                Post Job
            </button>
        </form>
    </div>
</div>
    </>
  )
}

export default AddOrderCard