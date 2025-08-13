import React from 'react'

const Navbar = () => {
  return (
    <div className='flex bg-purple-500 justify-between p-3'>
      <div className='font-bold text-lg'>iTask</div>
      <div>
        <ul className='flex gap-7'>
            <li className=' text-lg'>Home</li>
            <li className=' text-lg'>Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
