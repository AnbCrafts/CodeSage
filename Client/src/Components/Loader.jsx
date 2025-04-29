import React from 'react'

const Loader = ({isLoading}) => {
  return (
    
        isLoading &&
        <div className='py-3 w-full h-auto absolute'>
        <div className='h-3 w-100 rounded shadow-2xl bg-white moving-element '>
        </div>
    </div>
    
  )
}

export default Loader
