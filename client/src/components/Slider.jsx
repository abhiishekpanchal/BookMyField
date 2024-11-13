import { useState, useEffect } from "react";

function Slider({ slides }) {
  const [current, setCurrent] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);

    const newIntervalId = setInterval(() => {
      nextSlide();
    }, 4000);

    setIntervalId(newIntervalId);

    return () => clearInterval(newIntervalId);
  }, [current, slides]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden w-full h-[40vh] md:h-[87vh]">
      {/* Slider Container */}
      <div
        className="flex transition-transform ease-out duration-500 h-[100%]"
        style={{
          transform: `translateX(-${current * 25}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              style={{ minHeight: "100%", minWidth: "100%" }} // Ensures image fully covers container
            />
          </div>
        ))}
      </div>

      {/* Dots/Indicators */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
