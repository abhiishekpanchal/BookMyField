import React from 'react'
import Slider from '../components/Slider.jsx'
import AmenityCard from '../components/AmenityCard.jsx'
import Book from '../components/Book.jsx'
import wifiLogo from '../assets/wifi.png'
import parkingLogo from '../assets/parking.png'
import waterCoolerLogo from '../assets/waterCooler.png'
import changingRoomLogo from '../assets/changingRoom.png'
import cafeLogo from '../assets/cafe.png'
import Pic1 from '../assets/pic1.png'
import Pic2 from '../assets/pic2.jpg'
import Pic4 from '../assets/pic4.jpg'
import Pic5 from '../assets/pic5.png'
import Pic6 from '../assets/pic6.jpg'
import Slide1 from '../assets/slide1.png'
import Slide2 from '../assets/slide2.jpg'
import Slide3 from '../assets/slide3.png'

function Home() {
      let slides = [
        Slide1,
        Slide2,
        Slide3,
        Pic4,
      ]

      let amenities = [
        { 
            name: 'Wi-Fi', 
            logo: wifiLogo, 
        },
        { 
            name: 'Parking', 
            logo: parkingLogo,
        },
        { 
            name: 'Water Cooler', 
            logo: waterCoolerLogo,
        },
        {
            name: 'Changing Room',
            logo: changingRoomLogo,
        },
        {
            name: 'Cafe',
            logo: cafeLogo,
        },
    ]

    let gallery = [
        Pic1,
        Pic2,
        Pic6,
        Pic5,
        Pic6,
        Pic4,
    ]

  return (
    <>
        {/* Carousel */}
        <div className='h-full w-full flex justify-center relative' id='home'>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            <Slider slides={slides} />
            <div className="absolute top-[35%] md:top-[43%] left-0 w-full flex flex-col md:flex-row gap-4 justify-center items-center z-20">
                <button className="text-bold uppercase text-black bg-white text-md font-bold p-1 md:text-xl md:p-2 rounded-3xl shadow-lg shadow-tertiary hover:text-tertiary">
                <a href="tel:+91-777-305-0563">Call Now</a>
                </button>
                <button className="text-bold uppercase text-black bg-white text-md font-bold p-1 md:text-xl md:p-2 rounded-3xl shadow-lg shadow-tertiary hover:text-tertiary">
                <a href="https://wa.me/917773050563">Chat with us</a>
                </button>
            </div>
        </div>

        {/* Map */}
        <div className='flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start h-[80vh] lg:h-[100vh] w-full' id='location'>
            <div className='w-full lg:w-1/2 h-1/2 lg:h-full bg-primary flex flex-col justify-center lg:justify-center items-center lg:items-start p-4'>
                <h1 className='text-5xl md:text-6xl lg:text-8xl font-bold text-tertiary font-amsterdam tracking-wide'>LOCATE US !!</h1>
                <p className='text-xl md:text-2xl lg:text-3xl font-semibold text-white text-center lg:text-left'>See exactly where we are and get directions to our turf in seconds.</p>
            </div>
            <div className='w-full lg:w-1/2 h-1/2 lg:h-full flex justify-center items-center bg-primary'>
                <iframe className='border-4 rounded-lg border-tertiary p-4 w-[85%] h-[85%]' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Bicholi%20Mardana,%20near%20Agarwal%20Public%20School,%20Scheme%20140.+(Ace%20Turf)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                <a href="https://www.gps.ie/">gps devices</a>
                </iframe>
            </div>
        </div>

        {/* Amenities */}
        <div className='bg-tertiary w-full'>
            <h1 className='text-center font-bold text-4xl py-6 w-screen'>AMENITIES</h1>
            <div className='w-full pb-6'>
                <AmenityCard amenities={amenities} />
            </div>
        </div>

        {/* Gallery */}
        <div className='p-2 md:p-3 bg-primary w-full' id='gallery'>
            <h1 className='text-white text-4xl font-bold text-center pt-4'>GALLERY</h1>
            <div className='columns-1 sm:columns-2 lg:columns-3 py-5 md:py-8 gap-4'>
                {gallery.map((image, ind) => (
                    <div key={ind} className='mb-4 break-inside-avoid overflow-hidden'>
                        <img className='w-full object-cover rounded-lg transition duration-300 ease-in-out hover:scale-125' src={image} key={ind} alt={`image-${ind}`} />
                    </div>
                ))}
            </div>
        </div>

        {/* Book */}
        <div
            id="book"
            style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/abstract-modern-dark-black-background-design-with-stripes-lines_84443-2827.jpg?t=st=1725346461~exp=1725350061~hmac=44f7e8c877626991327971fcbf8d864a2229de8abe9024d59fbd7134d4ac2cc6&w=1060")`,
            }}
            className="h-screen w-full bg-cover bg-center flex flex-col lg:flex-row justify-evenly items-center">
            <div className="flex md:flex-col justify-center items-start">
                <h1 className="text-4xl lg:text-9xl font-bold text-tertiary">Book.</h1>
                <h1 className="text-4xl lg:text-9xl font-bold text-white">Play.</h1>
                <h1 className="text-4xl lg:text-9xl font-bold text-tertiary">Repeat.</h1>
            </div>
            <Book style={{ height: '100%', width: '100%' }} />
        </div>


        {/* About */}
        <div className='bg-primary h-[50vh] md:h-[45vh] w-full flex justify-center items-center'>
            <div className='flex flex-col gap-3 justify-center items-center w-[90%] md:w-[60%] text-white'>
                <div className='p-3 text-tertiary text-2xl md:text-3xl font-semibold text-center'>BOOK YOUR GAME TODAY!</div>
                <div className='text-center md:text-left'>Location: Bicholi Mardana, near Agarwal Public School, Scheme 140.</div>
                <div className='flex flex-col text-md items-center'>
                    <div>Reach us at: bookmyfield@gmail.com</div>
                    <div>Contact: +91-9876543210</div>
                </div>
                <div className='flex gap-5 text-md'>
                    <div className='h-9 w-9'>
                        <img className='object-fill scale-110 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnOIbTxVrpbDGJacC7-wmO6uHocVhji_L9cg&s" alt="Instagram" />
                    </div>      
                    <div className='h-9 w-9'>
                        <img className='object-fill scale-110 rounded-lg' src="https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338507_1280.png" alt="Facebook" />
                    </div>              
                </div>
                <div className='text-md text-gray-600 pb-3 text-center md:text-left'>Copyright © Abhishek Panchal</div>
            </div>
        </div>

    </> 
  )
}

export default Home