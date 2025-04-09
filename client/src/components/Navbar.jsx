import React, { useContext } from 'react';
import {assets} from '../assets/assets'
import {  Link,useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext';



function Navbar() {
    const {user,setShowLogin}=useContext(AppContext)
    const navigate=useNavigate(); 
    
  return (  
    <div className='flex justify-between items-center py-0 '
    > 
      <Link to='/'
      ><img src={assets.logo} alt="" className='w-50 sm:w-32 lg:w-40 mt-10'/></Link>
      <div>
        {
        user?
        <div className='flex items-center gap-2 sm:gap-3'>
            <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700 mt-10'>
            <img src={assets.credit_star} alt="" className='w-5'/>
            <p className='text-x sm:text-sm font-medium text-grey-600'>credits left:50</p>
            </button>
            <p className='text-grey-600 max-sm:hidden pl-4 mt-10'>Hi,Santhosh</p>
            <div className='relative group'>
                <img src={assets.profile_icon} className='w-10 dropshadow mt-10' alt=''/>
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                  <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm mt-10'>
                    <li className='py-1 px2 cursor-pointer pr-10 '>Logout</li>
                  </ul>
                </div>
            </div>

            
        </div>
        :
        <div className='flex items-center gap-2 sm:gap-5 mt-10'>
            <p onClick={()=>navigate('/buy')} className='cursor-pointer'>pricing</p>
            <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 
            text-sm rounded-full cursor-pointer 'onClick={()=>setShowLogin(true)}>login</button>
        </div>
    }
      </div>
    </div>
  )
}

export default Navbar