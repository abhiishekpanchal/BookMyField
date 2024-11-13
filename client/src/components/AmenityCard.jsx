import React from 'react'

function AmenityCard({amenities}) {
  return (
    <div className='p-5 flex flex-wrap justify-evenly items-center gap-'>
        {amenities.map((amenity, index) => (
            <div className='flex flex-col justify-start items-center w-28 h-44 transition duration-300 ease-in-out hover:scale-110' key={index}> 
            <div className='flex justify-center items-center rounded-full overflow-hidden mb-2 shadow-2xl bg-white p-7'>
                <img className='scale-150' src={amenity.logo} alt={amenity.name} />
            </div>
            <div className='text-2xl font-semibold text-center'>{amenity.name}</div>
            </div>
        ))} 
    </div>
  )
}

export default AmenityCard
