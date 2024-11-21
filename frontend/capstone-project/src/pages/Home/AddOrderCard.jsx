import React,{ useState } from 'react'
import axiosInstance from '@/utils/axiosInstance';
import Navbar from '@/components/mycomponents/Navbar/Navbar';

const AddOrderCard = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [payment, setPayment] = useState(0);
    const [urgency, setUrgency] = useState(false);
    const [duration, setDuration] = useState(0);






    const handleCreateOrder = async (e) => {
        e.preventDefault();

        const newPost = { title, content, category, location, payment, urgency, duration };

        try {
            const token = localStorage.getItem("token"); // Retrieve token
            const response = await axiosInstance.post("/add-order", newPost, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Post created:", response.data);

            if (onPostCreated) {
                onPostCreated(response.data.post); // Notify parent component about the new post
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

  return (
    <>

    <Navbar />
    {/* <!-- Modal Background --> */}
<div class="flex items-center justify-center">
    {/* <!-- Modal Container --> */}
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* <!-- Close Button --> */}    
        
        {/* <!-- Modal Title --> */}
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Post a Job</h2>
        
        {/* <!-- Job Form --> */}
        <form onSubmit={handleCreateOrder}>
            {/* <!-- Job Title --> */}
            <label class="block mb-2 text-gray-600">Job Title</label>
            <input value={title} type='text' onChange={(e) => setTitle(e.target.value)}
                required placeholder="e.g., Math Tutoring for Calculus II" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4" />

            {/* <!-- Job Description --> */}
            <label class="block mb-2 text-gray-600">Job Description</label>
            <textarea placeholder="Describe the task you need help with" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4" value={content} onChange={(e) => setContent(e.target.value)}
                required></textarea>
            
            {/* <!-- Category --> */}
            <label class="block mb-2 text-gray-600">Category</label>
            <select class="text-black w-full border border-gray-300 rounded-md p-2 mb-4" value={category} onChange={(e) => setCategory(e.target.value)}
                required>
                <option>Tutoring</option>
                <option>Food Delivery</option>
                <option>Tech Help</option>
                <option>Moving Services</option>
                <option>Other</option>
            </select>

            {/* <!-- Location --> */}
            <label class="block mb-2 text-gray-600">Location</label>
            <input type="text" placeholder="e.g., Library, Study Room B" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4" value={location} onChange={(e) => setLocation(e.target.value)}
                required/>
            
            {/* <!-- Date & Time --> */}
            {/* <label class="block mb-2 text-gray-600">Date & Time</label>
            <input type="datetime-local" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4" value={date} onChange={(e) => setDate(e.target.value)}
                required/> */}
            
            {/* <!-- Duration --> */}
            <label class="block mb-2 text-gray-600">Duration (in hours)</label>
            <input type="number" placeholder="e.g., 1" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4" value={duration} onChange={(e) => setDuration(e.target.value)}
                required/>
            
            {/* <!-- Payment --> */}
            <label class="block mb-2 text-gray-600">Payment</label>
            <input type="number" placeholder="e.g., 15" class="text-black w-full border border-gray-300 rounded-md p-2 mb-4" value={payment} onChange={(e) => setPayment(e.target.value)}
                required/>
            
            {/* <!-- Urgency Checkbox --> */}
            <label class="inline-flex items-center mt-4">
                <input type="checkbox" class="form-checkbox text-red-500" value={urgency} onChange={(e) => setUrgency(e.target.value)}
                required/>
                <span class="ml-2 text-gray-700">Mark as Urgent</span>
            </label>
            
            {/* <!-- Submit Button --> */}
            <button onClick={handleCreateOrder} class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-6">
                Post Job
            </button>
        </form>
    </div>
</div>
    </>
  )
}

export default AddOrderCard