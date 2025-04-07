import React from 'react'
import { assets } from '../assets/assets'

const  Login=()=>{
  return (
    <div className='absolute top-0 left-0 right-0  bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form className='relative bg-white p-10 rounded-xl text-slate-500 shadow-lg flex flex-col gap-4 w-full sm:w-[400px]'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Signup</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>
        <div className='border px-2 py-2  rounded-full mt-5 flex items-center gap-2'>
            {/* <img src={assets.profile_icon} alt=""/>    */}
            <input type="text" className='outline-none text-sm' placeholder='Username' required/>
        </div>
        <div className='border px-2 py-2  rounded-full mt-5 flex items-center gap-2'>
            <img src={assets.email_icon} alt=""/>   
            <input type="text" className='outline-none text-sm' placeholder='Email' required/>
        </div>
        <div className='border px-2 py-2  rounded-full mt-5 flex items-center gap-2'>
            <img src={assets.lock_icon} alt=""/>   
            <input type="text" className='outline-none text-sm' placeholder='Password' required/>
        </div>
        <p className='text-blue-600 text-sm cursor-pointer my-4'>Forgot Password?</p>
        <button className='rounded-full bg-teal-300 w-full  cursor-pointer text-white py-2'>Create Account</button>
        <p className='mt-5 text-center'>Don't have an account?<span className='text-blue-600 cursor-pointer'>Sign Up</span></p>
        <p className='mt-5 text-center'>Already have an account?<span className='text-blue-600 cursor-pointer'>Log in</span></p>
        
        
      </form>
    </div>
  )
}

export default Login
