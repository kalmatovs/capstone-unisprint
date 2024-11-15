import React, { useState } from 'react';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from "react-router-dom";
import Navbar_Login_CreateAcc from '../../components/Navbar/Navbar_Login_CreateAcc';
import axiosInstance from '../../utils/axiosInstance';




const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()



  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email:email,
        password: password,
      });
  
  
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/login");
      }} catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          console.error('Error during login:', error);
          setError(error.response.data.message);
        } else {
          setError("error just occured");
        }
      };
  }

  return (
    <>
    <Navbar_Login_CreateAcc />

    <div class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Create an Account</h1>
        <form>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input  id="name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black" placeholder="Name" required
            
            value={name}
            onChange={(e) => setName(e.target.value)}
            />          </div>
          <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input type="email" id="email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black" placeholder="your@email.com" required
            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />          </div>

          < PasswordInput
          value={password}
          onChange = {(e) => setPassword(e.target.value)}
          />
          <div class="flex items-center justify-center mb-4">
            <div class="flex items-center">
            
              <Link to="/login" class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Already have an account?</Link></div>
          </div>

          <button onClick={handleSignup} type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create account</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default SignUp