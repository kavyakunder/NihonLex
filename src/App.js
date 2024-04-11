import logo from "./logo.svg";
import date from "date-and-time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useEffect, useState } from "react";
import { CiVolumeHigh } from "react-icons/ci";
import data2 from "./data.json";
import data3 from "./data1.json";
import { TextRevealCardPreview } from "./Text-reveal";
function App() {
  const LEARN_JAPANESE_API = "https://test-api-project-nine.vercel.app/lesson";

  // const UNSPLASH_CLIENT_ACCESS_KEY =
  //   "uRXB2EXvbezAGhzBCrTJjT4mjsUK1-ZlZYIDfsJ4Fnk";

  // const UNSPLASH_API = "https://api.unsplash.com/photos/random";

  console.log("dataa2", data2);
  const [data, setData] = useState({ japanese: "", english: "" });
  const [randm, setRandm] = useState(null);
  const [imageUrlId, setImageUrlId] = useState("");
  const [timeNow, setTimeNow] = useState("");
  const [day, setDay] = useState("");
  const [mouseEnter, setMouseEnter] = useState(false);
  const [fade, setFade] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropDownValue, setDropdownValue] = useState("phrases");
  const [dropdownSelect, setDropdownSelect] = useState(data2);
  // const [mouseLeave, setMouseLeave] = useState(false);
  // const [num, setNum] = useState(0);

  const getDropDownSelectValue = (value) => {
    console.log("get value", value);
    setDropdownValue(value);
    if (value === "phrases") {
      setDropdownSelect(data2);
    } else if (value === "words") {
      setDropdownSelect(data3);
    }
    setRandm(getRandomNum());

    // setDropdownSelect()
  };
  console.log("dropDownValue", dropDownValue);
  const fetchData = async (abc) => {
    try {
      const response = await fetch(LEARN_JAPANESE_API);
      const responseData = await response.json();
      console.log("Response data", responseData);
      setData(responseData[abc]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchBackgroundImage = async () => {
  //   const newUrl = new URLSearchParams({
  //     client_id: UNSPLASH_CLIENT_ACCESS_KEY,
  //     orientation: "landscape",
  //     query: "nature",
  //   });

  //   const finalUrl = UNSPLASH_API + `?${newUrl.toString()}`;
  //   try {
  //     const response = await fetch(finalUrl);
  //     const data = await response.json();
  //     console.log("data reveived is check", data?.urls?.full);
  //     // return data;
  //     setImageUrlId(data?.urls?.full);
  //   } catch (err) {
  //     console.error("error is this", err);
  //   }
  // };

  const getRandomNum = () => {
    const theRandomNum = Math.floor(Math.random() * 20);

    // setNum(theRandomNum);
    return theRandomNum;
  };
  useEffect(() => {
    // refreshFunction();
    setRandm(getRandomNum());
    // fetchBackgroundImage();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const getTimeNow = new Date().toLocaleTimeString([], {
        timeStyle: "short",
      });
      setTimeNow(getTimeNow);
    }, 0); // Update time every second

    const now = new Date();
    setDay(date.format(now, "ddd, MMM DD YYYY")); // => 'Fri, Jan 02 2015'

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  console.log("time", timeNow, day);
  const refreshFunction = () => {
    const abcNew = getRandomNum();
    console.log("hello inside useeffect!", abcNew);
    // const buttonNew = () => {
    // console.log("randomnum", getRandomNum());
    // };
    // fetchData(abcNew);
    setRandm(abcNew);
    // fetchBackgroundImage();
  };
  const listenPronounciation = () => {
    console.log("hey");
    let utterance = new SpeechSynthesisUtterance(
      dropdownSelect[randm]?.japanese
    );
    utterance.lang = "ja-JP";

    speechSynthesis.speak(utterance);
    // 'ja-JP' represents the Japanese language and Japanese voice
  };

  const mouseEnterFunction = () => {
    setMouseEnter(true);
    // setFade(true);
  };

  const mouseLeaveFunction = () => {
    setMouseEnter(false);
    // setFade(true);
  };

  const handleTransitionEnd = () => {
    if (fade) {
      setFade(false);
    }
  };

  const getModalOpen = () => {
    setModalOpen(!modalOpen);
  };
  console.log("dataaa", data);
  return (
    // <div>
    <div
      className="App relative bg-cover bg-center bg-no-repeat z-0  "
      // style={{
      //   backgroundImage: `url(${imageUrlId})`,
      // }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.5]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515824955341-43172b4d8260?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          // filter: "brightness(50%)",
        }}
      ></div>

      <img
        src="../mainlogo123.png"
        alt=""
        className="absolute left-10 top-10 w-20 h-20 brightness-[0.3]"
      />

      <button
        onClick={refreshFunction}
        className="absolute right-40 top-12 backdrop-blur-0"
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
        </svg> */}
        {/* <i class="fa-solid fa-rotate-right"></i> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-rotate-right" /> */}
        <FontAwesomeIcon
          icon={faRotateRight}
          size="2xl"
          style={{ color: "#FFD43B" }}
        />{" "}
        {/* <i class="fa-solid fa-rotate-right"></i> */}
        {/* <i class="fa-solid fa-rotate-right"></i> */}
        {/* Refresh */}
      </button>

      <button
        onClick={getModalOpen}
        className="absolute right-20 top-12 backdrop-blur-0"
      >
        <FontAwesomeIcon
          icon={faGear}
          size="2xl"
          style={{ color: "#FFD43B" }}
        />
        {/* <FontAwesomeIcon icon={faRotateRight} /> */}
      </button>

      {modalOpen && (
        <div className="absolute right-20 top-24 backdrop-blur-0 bg-red-200 w-32 border rounded">
          <p
            className="hover:bg-gray-400 cursor-pointer p-3"
            onClick={() => getDropDownSelectValue("phrases")}
          >
            {dropDownValue === "phrases" && (
              <FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} />
            )}
            Phrases
          </p>
          <p
            className="hover:bg-gray-400 cursor-pointer p-3"
            onClick={() => getDropDownSelectValue("words")}
          >
            {dropDownValue === "words" && (
              <FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} />
            )}
            Words
          </p>
        </div>
      )}
      <div className="backdrop-filter flex justify-center items-center h-screen ">
        <div
          style={
            {
              // filter: "blur(0px)",
              // filter: "brightness(100%)",
            }
          }
          className="flex justify-center align-middle z-50 text-white font-bold"
          //  bg-white p-10 rounded-lg  w-1/3  z-50 bg-opacity-70 opacity-100 "
        >
          <div className="text-4xl">
            <div
              onMouseEnter={mouseEnterFunction}
              onMouseLeave={mouseLeaveFunction}
              // onClick={listenPronounciation}
              className=" flex justify-center items-baseline flex-nowrap "
            >
              {/* {dropdownSelect[randm]?.japanese} */}
              {/* {mouseEnter ? ( */}
              {/* {mouseEnter ? ( */}

              {/* )} */}

              {/* <div
                className="relative"
              
              > */}
              {/* <div className="flex items-baseline flex-nowrap relative"> */}
              {/* {!mouseEnter && (
                <span className="absolute">hello hello world qaz</span>
              )} */}
              {/* {!mouseEnter && (
                <span>hello hello in this what are you now!</span>
              )} */}

              {/* <div className="relative"> */}
              {/* {mouseEnter && ( */}
              {/* <div className="relative"> */}
              {/* {mouseEnter && (
                <p
                  // className={`absolute top-0 left-0 fade-out-on-hover ${
                  //   mouseEnter ? "fade-in-on-hover" : "fade-out-on-hover"
                  // }`}
                  className={`absolute m-0 left-0 inline-block`}
                >
                  hehehehdawdasefedjk
                </p>
              )} */}
              {/* {!mouseEnter && (
                <p
                  // className={`absolute top-0 left-0 fade-in-on-hover ${
                  //   left-0
                  //   // mouseEnter ? "fade-out-on-hover" : "fade-in-on-hover"
                  // }`}
                  className="absolute m-0 left-0 inline-block"
                >
                  ksfij
                </p>
              )} */}
              {/* </div> */}
              {/* )} */}
              {/* {!mouseEnter && ( */}

              {/* )} */}
              {/* </div> */}

              {/* <span className="inline-block">
                  {!mouseEnter && "the and this is"}
                </span> */}
              {/* </div> */}
              {/* </div> */}
              {/* <p className="relative"> */}
              {/* <span className="absolute top-0 left-0">
                csdvcdsvfbgbcsdvcdsvfbgbcsdvcdsvfbgbcsdvcdsvfbgb
              </span>
              <span className="absolute top-0 left-0">helloooqaz</span> */}
              {/* </p> */}

              <TextRevealCardPreview mouseEnter={mouseEnter} />
              <span className="cursor-pointer">
                <FontAwesomeIcon icon={faVolumeHigh} />
              </span>
            </div>
            {/* <hr className="h-px my-2  border-0 bg-gray-300" /> */}
            <p className="text-2xl mt-16">{dropdownSelect[randm]?.english}</p>
          </div>
        </div>
      </div>

      {/* <div> */}
      <div className="absolute right-16 bottom-36 z-50 text-neutral-600 text-5xl">
        {day}
      </div>
      <div className="absolute right-16 bottom-16 z-50 text-neutral-600 text-7xl">
        {timeNow}
      </div>
      {/* </div> */}
    </div>
    // <div className="App relative bg-cover bg-center bg-no-repeat z-0 ">
    //   <div
    //     className="absolute inset-0"
    //     style={{
    //       backgroundImage:
    //         "url('https://images.unsplash.com/photo-1515824955341-43172b4d8260?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    //       filter: "brightness(50%)",
    //       zIndex: "-1", // Ensure the overlay is behind other content
    //     }}
    //   />
    //   <button onClick={refreshFunction} className="absolute right-20 top-12">
    //     Refresh
    //   </button>

    //   <div className="flex justify-center items-center h-screen">
    //     <div className="flex justify-center align-middle bg-white p-10 rounded-lg shadow-2xl w-1/3 z-50 bg-opacity-70 opacity-100">
    //       <h1 className="text-4xl">
    //         <div
    //           onClick={listenPronounciation}
    //           className="flex justify-center items-end"
    //         >
    //           <span className="text-4xl">{data2[randm]?.japanese}</span>
    //           <span className="cursor-pointer">
    //             <CiVolumeHigh />
    //           </span>
    //         </div>
    //         <hr className="h-px my-2 border-0 bg-red-300" />
    //         <span className="text-2xl">{data2[randm]?.english}</span>
    //       </h1>
    //     </div>
    //   </div>
    // </div>

    // </div>
  );
}

export default App;

// <div
//   className="absolute"
//   onMouseEnter={mouseEnterFunction}
//   onMouseLeave={mouseLeaveFunction}
// >
//   <span
//     className={
//       mouseEnter
//         ? "initial-fade-out fade-in-on-hover absolute"
//         : "initial-fade-in  fade-out-on-hover absolute"
//     }
//   >
//     {"hello worldo "}
//     {/* {mouseEnter ? "hello world" : "abc"} */}
//   </span>
//   <span
//     className={
//       mouseEnter
//         ? "initial-fade-in fade-out-on-hover absolute"
//         : "initial-fade-out fade-in-on-hover absolute"
//     }
//     // className={
//     //   mouseEnter ? "fade-out-on-hover" : "fade-in-on-hover"
//     // }
//     // className="fade-in-on-hover"
//   >
//     {"abcdefghi"}
//     {/* {mouseEnter ? "abc" : "hello world"} */}
//     {/* {dropdownSelect[randm]?.japanese} */}
//   </span>
// </div>;
