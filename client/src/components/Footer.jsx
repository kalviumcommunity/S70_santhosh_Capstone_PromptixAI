import React from 'react'
import {assets} from '../assets/assets'

const Footer=()=> {
  return (
    <div className='flex justify-betwen items-center gap-4 py-3 mt-20'>
      <img src={assets.logo} alt="" width={150}/>
      <p className='flex-1 border-l border-gray-00 pl-4 text-sm text-grey-500 max-sm:hidden '>Copyright @Promtrix.dev | All Rights Reserved</p>
       <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="" width={35}/>
        <img src={assets.twitter_icon} alt="" width={35}/>
        <img src={assets.instagram_icon} alt="" width={35}/>
       </div>
    </div>
  )
}

export default Footer
