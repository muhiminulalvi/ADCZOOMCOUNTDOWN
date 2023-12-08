import { useState, useEffect } from "react";

function App() {
  const initialTime = 2*60;
  const [zoomed, setZoomed] = useState(false);
  const calculateTimeLeft = () => {
    let difference = initialTime - Math.floor((+new Date() - startTime) / 1000);
    let timeLeft = {
      // hours: String(Math.floor((difference / 3600) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor(difference % 60)).padStart(2, "0"),
    };

    return timeLeft;
  };

  const [startTime] = useState(+new Date());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentTime = calculateTimeLeft();
      setTimeLeft(currentTime);

      if (currentTime.minutes === "00" && currentTime.seconds === "00") {
        setShowVideo(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const zoomInterval = setInterval(() => {
      setZoomed((prevZoomed) => !prevZoomed);
    }, 2000); // Toggle zoom effect every 2 seconds (adjust the interval as needed)

    return () => clearInterval(zoomInterval); // Clear interval on component unmount
  }, []);

  const toggleZoom = () => {
    setZoomed((prevZoomed) => !prevZoomed);
  };
  return (
    <>
      <div className="max-w-5xl mx-auto my-24 border-4 bg-gray-50 border-primary shadow-lg rounded-lg">
        {!showVideo ? (
          <div className="py-10">
            {/* Session details */}
            <div className="flex flex-col justify-center items-center space-y-2">
              <p className="text-xl font-semibold text-[#08041C]">Session On</p>
              <h2 className="text-5xl font-bold text-[#080698]">
                Study Abroad: The Way Should Be
              </h2>
              <p className="text-2xl font-semibold text-[#08041C]">
                Organized by{" "}
                <span className=" font-extrabold text-neutral-700 italic">
                  Amateur Developers Club, BRUR
                </span>
              </p>
              <img
                src="src\assets\adc.png"
                width={100}
                alt=""
                className= {`transition-transform duration-500 ${zoomed ? 'scale-0' : 'scale-100'}`}
                
              />
            </div>
            {/* Countdown */}
            <section className="py-4">
              <div className="text-center pb-4">
                <h2 className="font-bold ">
                  Please wait for a while. The session will start in
                </h2>
              </div>
              <div className="grid grid-flow-col justify-center gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-5 bg-white shadow-md rounded-box text-primary">
                  <span className="countdown font-mono font-bold text-5xl">
                    {timeLeft.minutes}
                  </span>
                  <b>min</b>
                </div>
                <div className="flex flex-col p-5 bg-white shadow-md rounded-box text-primary">
                  <span className="countdown font-mono font-bold text-5xl">
                    {timeLeft.seconds}
                  </span>
                  <b>sec</b>
                </div>
              </div>
            </section>
          </div>
        ) : (
          // Display video when showVideo is true
          <div className="video-container">
            <video controls autoPlay muted>
              <source src="src\assets\vid1.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
