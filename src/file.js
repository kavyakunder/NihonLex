// import logo from "./logo.svg";
// import date from "date-and-time";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
// import { faGear } from "@fortawesome/free-solid-svg-icons";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
// import "./App.css";
// import { useEffect, useState } from "react";
// import phrases from "./data/phrases.json";
// import words from "./data/words.json";
// import hiragana from "./data/hiragana.json";
// import katakana from "./data/katakana.json";
// import { TextRevealCardPreview } from "./Text-reveal";
// function App() {
//   // const UNSPLASH_CLIENT_ACCESS_KEY =
//   //   "uRXB2EXvbezAGhzBCrTJjT4mjsUK1-ZlZYIDfsJ4Fnk";

//   // const UNSPLASH_API = "https://api.unsplash.com/photos/random";

//   // console.log("dataa2", phrases);
//   const [data, setData] = useState({ japanese: "", english: "" });
//   const [randm, setRandm] = useState(null);
//   const [imageUrlId, setImageUrlId] = useState("");
//   const [timeNow, setTimeNow] = useState("");
//   const [day, setDay] = useState("");
//   // const [mouseEnter, setMouseEnter] = useState(false);
//   const [fade, setFade] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [dropDownValue, setDropdownValue] = useState("phrases");
//   const [dropdownSelect, setDropdownSelect] = useState(phrases);

//   const getDropDownSelectValue = (value) => {
//     console.log("dropDownValue", dropDownValue);
//     setDropdownValue(value);
//     if (value === "phrases") {
//       setDropdownSelect(phrases);
//     } else if (value === "words") {
//       setDropdownSelect(words);
//     } else if (value === "hiragana") {
//       setDropdownSelect(hiragana);
//     } else if (value === "katakana") {
//       setDropdownSelect(katakana);
//     }
//     // setDropdownSelect(value);
//     localStorage.setItem("typeOfLearning", JSON.stringify(value));
//     setRandm(getRandomNum());
//   };
//   // const fetchData = async (abc) => {
//   //   try {
//   //     const response = await fetch(LEARN_JAPANESE_API);
//   //     const responseData = await response.json();
//   //     console.log("Response data", responseData);
//   //     setData(responseData[abc]);
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //   }
//   // };

//   let cachedImageUrl = null; // Initialize with null

//   // const fetchBackgroundImage = async () => {
//   //   const newUrl = new URLSearchParams({
//   //     client_id: UNSPLASH_CLIENT_ACCESS_KEY,
//   //     orientation: "landscape",
//   //     query: "nature",
//   //   });
//   //   const finalUrl = UNSPLASH_API + `?${newUrl.toString()}`;

//   //   try {
//   //     const response = await fetch(finalUrl);
//   //     const data = await response.json();

//   //     if (data?.urls?.full) {
//   //       const newImageUrl = data.urls.full;
//   //       const newImage = new Image();
//   //       newImage.src = newImageUrl;

//   //       newImage.onload = () => {
//   //         cachedImageUrl = newImageUrl; // Cache the new image URL
//   //         setImageUrlId(newImageUrl);
//   //         console.log("New image loaded:", newImageUrl);
//   //       };

//   //       newImage.onerror = () => {
//   //         console.error("Error loading new image.");
//   //         setImageUrlId(cachedImageUrl); // Use the cached image URL
//   //       };
//   //     } else {
//   //       console.log("No new image fetched. Using cached image.");
//   //       setImageUrlId(cachedImageUrl); // Use the cached image URL
//   //     }
//   //   } catch (err) {
//   //     console.error("Error fetching image:", err);
//   //     setImageUrlId(cachedImageUrl); // Use the cached image URL in case of error
//   //   }
//   // };
//   // const fetchBackgroundImage = async () => {
//   //   const newUrl = new URLSearchParams({
//   //     client_id: UNSPLASH_CLIENT_ACCESS_KEY,
//   //     orientation: "landscape",
//   //     query: "nature",
//   //   });

//   //   const finalUrl = UNSPLASH_API + `?${newUrl.toString()}`;
//   //   try {
//   //     const response = await fetch(finalUrl);
//   //     const data = await response.json();
//   //     console.log("data reveived is check", data?.urls?.full);
//   //     // return data;
//   //     setImageUrlId(data?.urls?.full);
//   //   } catch (err) {
//   //     console.error("error is this", err);
//   //   }
//   // };

//   const getRandomNum = () => {
//     const theRandomNum = Math.floor(Math.random() * 20);

//     // setNum(theRandomNum);
//     return theRandomNum;
//   };
//   useEffect(() => {
//     // refreshFunction();
//     setRandm(getRandomNum());
//     // fetchBackgroundImage();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const getTimeNow = new Date().toLocaleTimeString([], {
//         timeStyle: "short",
//       });
//       setTimeNow(getTimeNow);
//     }, 0);

//     const now = new Date();
//     setDay(date.format(now, "ddd, MMM DD YYYY"));

//     return () => clearInterval(interval);
//   }, []);

//   const refreshFunction = () => {
//     const abcNew = getRandomNum();

//     setRandm(abcNew);
//     // fetchBackgroundImage();
//   };
//   const listenPronounciation = () => {
//     let utterance = new SpeechSynthesisUtterance(
//       dropdownSelect[randm]?.hiragana
//     );
//     utterance.lang = "ja-JP";

//     speechSynthesis.speak(utterance);
//   };

//   const getModalOpen = () => {
//     setModalOpen(!modalOpen);
//   };

//   console.log("phhhhr", phrases);
//   return (
//     // <div>
//     <div
//       className="App relative bg-cover bg-center bg-no-repeat z-0  "
//       // style={{
//       //   backgroundImage: `url(${imageUrlId})`,
//       // }}
//     >
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.20]  "
//         style={{
//           // backgroundImage: `url(${imageUrlId})`,
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1515824955341-43172b4d8260?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//           // filter: "brightness(50%)",
//         }}
//       ></div>

//       <img
//         src="../mainlogo123.png"
//         alt=""
//         className="absolute left-10 top-10 w-20 h-20 brightness-[0.3]"
//       />

//       <button
//         onClick={refreshFunction}
//         className="absolute right-36 top-12 backdrop-blur-0"
//       >
//         <FontAwesomeIcon
//           className="text-neutral-500"
//           icon={faRotateRight}
//           size="2xl"
//           // style={{ color: "#FFD43B" }}
//           // style={{ color: "rgb(115 115 115)" }}
//         />{" "}
//       </button>

//       <button
//         onClick={getModalOpen}
//         className="absolute right-20 top-12 backdrop-blur-0"
//       >
//         <FontAwesomeIcon
//           className="text-neutral-500"
//           icon={faGear}
//           size="2xl"
//           // style={{ color: "#FFD43B" }}
//         />
//       </button>

//       {modalOpen && (
//         <div
//           className="absolute right-20 top-24 backdrop-blur-0
//         bg-neutral-100
//           border rounded"
//         >
//           <p
//             className="hover:bg-neutral-300 cursor-pointer p-3"
//             onClick={() => getDropDownSelectValue("phrases")}
//           >
//             {dropDownValue === "phrases" && (
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className="text-green-500 mr-2"
//                 // style={{ color: "green" }}
//               />
//             )}
//             Phrases (Hiragana)
//           </p>
//           <p
//             className="hover:bg-neutral-300 cursor-pointer p-3"
//             // className="hover:bg-gray-400 cursor-pointer p-3"
//             onClick={() => getDropDownSelectValue("words")}
//           >
//             {dropDownValue === "words" && (
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className="text-green-500 mr-2"
//                 // style={{ color: "green" }}
//               />
//             )}
//             Words (Hiragana)
//           </p>
//           <p
//             className="hover:bg-neutral-300 cursor-pointer p-3"
//             // className="hover:bg-gray-400 cursor-pointer p-3"
//             onClick={() => getDropDownSelectValue("hiragana")}
//           >
//             {dropDownValue === "hiragana" && (
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className="text-green-500 mr-2"
//                 // style={{ color: "green", marginRight: "2px" }}
//               />
//             )}
//             Letters (Hiragana)
//           </p>
//           <p
//             className="hover:bg-neutral-300 cursor-pointer p-3"
//             // className="hover:bg-gray-400 cursor-pointer p-3 "
//             onClick={() => getDropDownSelectValue("katakana")}
//           >
//             {dropDownValue === "katakana" && (
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className="text-green-500 mr-2"
//                 // style={{ color: "green" }}
//               />
//             )}
//             Letters (Katakana)
//           </p>
//         </div>
//       )}
//       <div className="backdrop-filter flex justify-center items-center h-screen ">
//         <div className="flex justify-center align-middle z-50 text-gray-300  -mt-24">
//           <div>
//             <div
//               onClick={listenPronounciation}
//               className=" flex justify-center items-baseline flex-nowrap font-bold"
//             >
//               <TextRevealCardPreview
//                 text={dropdownSelect[randm]?.japanese}
//                 revealText={
//                   dropDownValue === "katakana"
//                     ? dropdownSelect[randm]?.katakana
//                     : dropdownSelect[randm]?.hiragana
//                 }
//               />
//               <span className="cursor-pointer text-3xl ml-2">
//                 <FontAwesomeIcon icon={faVolumeHigh} />
//               </span>
//             </div>
//             <p className="text-4xl mt-8">{dropdownSelect[randm]?.english}</p>
//           </div>
//         </div>
//       </div>

//       <div className="absolute right-16 bottom-24 z-50 text-neutral-600 text-6xl">
//         {timeNow}
//       </div>
//       <div className="absolute right-16 bottom-8 z-50 text-neutral-600 text-4xl">
//         {day}
//       </div>
//       <div className="absolute left-9 bottom-8 z-50 text-neutral-500">
//         {(dropDownValue === "phrases" || dropDownValue === "words") &&
//           "* Hover over the text to see a magic"}
//       </div>
//     </div>
//   );
// }

// export default App;
