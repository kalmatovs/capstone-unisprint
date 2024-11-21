import React from 'react'
import { navbarHelper } from '../../../utils/navbar_helper'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    

      <nav class=" border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://files.oaiusercontent.com/file-xJ70nFRNMV9nQracst3YXzIh?se=2024-11-21T03%3A37%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D6ad644ac-8f77-4482-9721-293a7d92433e.webp&sig=yHcCRAhka1DxYkE7hy8vSoyk9X8r%2B5CRYOEImfiT1BM%3D" class="w-20 rounded-full" alt="Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSprint</span>
    </a>
    <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900">
        <li>
          <Link to="/dashboard" class="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</Link>
        </li>
        <li>
          <Link to="/profile" class="block py-2 px-3 text-gray rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile </Link>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About UniSprint</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar