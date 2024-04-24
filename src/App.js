/* global chrome */

import "./App.css";
import { useEffect, useState } from "react";

import phrases from "./data/phrases.json";
import words from "./data/words.json";
import hiragana from "./data/hiragana.json";
import katakana from "./data/katakana.json";

import { TextRevealCardPreview } from "./Text-reveal";
import date from "date-and-time";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [imageUrlId, setImageUrlId] = useState("");
  const [timeNow, setTimeNow] = useState("");
  const [day, setDay] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dropDownValue, setDropdownValue] = useState("phrases");
  const [dropdownSelect, setDropdownSelect] = useState(phrases);

  const options = [
    { value: "phrases", label: "Phrases (Hiragana)", data: phrases },
    { value: "words", label: "Words (Hiragana)", data: words },
    { value: "hiragana", label: "Letters (Hiragana)", data: hiragana },
    { value: "katakana", label: "Letters (Katakana)", data: katakana },
  ];

  let cachedImageUrl = null;
  console.log("watching cahec", cachedImageUrl);
  useEffect(() => {
    const storedTypeOfLearning = localStorage.getItem("typeOfLearning");

    if (storedTypeOfLearning) {
      const getJson = options.find(
        (option) => option.value === JSON.parse(storedTypeOfLearning)
      );

      setDropdownSelect(getJson.data);
      setDropdownValue(getJson.value);
      generateRandomNumber(getJson.data.length);
    } else {
      generateRandomNumber(phrases.length);
    }
    // setImageUrlId(cachedImageUrl);
    // fetchBackgroundImage();

    chrome.runtime.sendMessage({ type: "GET_CACHED_IMAGE_URL" }, (response) => {
      const { cachedImageUrl } = response;
      setImageUrlId(cachedImageUrl);
      fetchBackgroundImage();
    });
  }, []);

  const getDropDownSelectValue = (value) => {
    setDropdownValue(value);

    const getOptionValue = options.find((option) => option.value === value);
    setDropdownSelect(getOptionValue.data);

    localStorage.setItem(
      "typeOfLearning",
      JSON.stringify(getOptionValue.value)
    );

    generateRandomNumber(getOptionValue.data.length);
    fetchBackgroundImage();
  };

  const fetchBackgroundImage = async () => {
    console.log("cacheddd", cachedImageUrl);
    // setImageUrlId(cachedImageUrl);

    const newUrl = new URLSearchParams({
      client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ACCESS_KEY,
      orientation: "landscape",
      query: "nature",
    });
    const finalUrl =
      process.env.REACT_APP_UNSPLASH_API + `?${newUrl.toString()}`;
    try {
      const response = await fetch(finalUrl);
      const data = await response.json();
      if (data?.urls?.full) {
        const newImageUrl = data.urls.full;
        const newImage = new Image();
        newImage.src = newImageUrl;

        newImage.onload = () => {
          // cachedImageUrl = newImageUrl;
          // setImageUrlId(newImageUrl);
          chrome.runtime.sendMessage({
            type: "SET_CACHED_IMAGE_URL",
            newImageUrl,
          });
          setImageUrlId(newImageUrl);
          console.log("New image loaded:", newImageUrl);
        };

        newImage.onerror = () => {
          console.error("Error loading new image.");
          setImageUrlId(
            "https://images.unsplash.com/photo-1515824955341-43172b4d8260?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          );
        };
      } else {
        console.log("No new image fetched. Using cached image.");
        setImageUrlId(cachedImageUrl);
      }
    } catch (err) {
      console.error("Error fetching image:", err);
      setImageUrlId(
        "https://images.unsplash.com/photo-1515824955341-43172b4d8260?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    }
  };

  const generateRandomNumber = (length) => {
    const getTheNumber = Math.floor(Math.random() * length);
    setRandomNumber(getTheNumber);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const getTimeNow = new Date().toLocaleTimeString([], {
        timeStyle: "short",
      });
      setTimeNow(getTimeNow);
    }, 0);

    const now = new Date();
    setDay(date.format(now, "ddd, MMM DD YYYY"));

    return () => clearInterval(interval);
  }, []);

  const refreshFunction = (newLength) => {
    generateRandomNumber(newLength);
    fetchBackgroundImage();
  };

  const listenPronounciation = () => {
    let utterance = new SpeechSynthesisUtterance(
      dropdownSelect[randomNumber]?.hiragana
    );
    utterance.lang = "ja-JP";

    speechSynthesis.speak(utterance);
  };

  const getModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="App relative bg-cover bg-center bg-no-repeat z-0  ">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.20]  "
        style={{
          backgroundImage: `url(${imageUrlId})`,
        }}
      ></div>

      <img
        src="../nihonlexlogo.png"
        alt="Nihonlex logo"
        className="absolute left-10 top-10 w-20 h-20 brightness-[0.3]"
      />

      <button
        onClick={() => refreshFunction(dropdownSelect.length)}
        className="absolute right-36 top-12 backdrop-blur-0"
      >
        <FontAwesomeIcon
          className="text-neutral-500"
          icon={faRotateRight}
          size="2xl"
        />{" "}
      </button>

      <button
        onClick={getModalOpen}
        className="absolute right-20 top-12 backdrop-blur-0"
      >
        <FontAwesomeIcon
          className="text-neutral-500"
          icon={faGear}
          size="2xl"
        />
      </button>

      {modalOpen && (
        <div className="text-base absolute right-20 top-24 backdrop-blur-0 bg-neutral-100 border rounded">
          {options.map((option) => {
            return (
              <p
                key={option.label}
                className="hover:bg-neutral-300 cursor-pointer p-3"
                onClick={() => getDropDownSelectValue(option.value)}
              >
                {dropDownValue === option.value && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 mr-2"
                  />
                )}
                {option.label}
              </p>
            );
          })}
        </div>
      )}
      <div className="backdrop-filter flex justify-center items-center h-screen ">
        <div className="flex justify-center align-middle z-50 text-gray-300  -mt-24">
          <div>
            <div
              onClick={listenPronounciation}
              className=" flex justify-center items-baseline flex-nowrap font-bold"
            >
              <TextRevealCardPreview
                text={dropdownSelect[randomNumber]?.japanese}
                revealText={
                  dropDownValue === "katakana"
                    ? dropdownSelect[randomNumber]?.katakana
                    : dropdownSelect[randomNumber]?.hiragana
                }
              />
              <span className="cursor-pointer text-3xl ml-2">
                <FontAwesomeIcon icon={faVolumeHigh} />
              </span>
            </div>
            <p className="text-4xl mt-8">
              {dropdownSelect[randomNumber]?.english}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-16 bottom-24 z-50 text-neutral-600 text-6xl">
        {timeNow}
      </div>
      <div className="absolute right-16 bottom-8 z-50 text-neutral-600 text-4xl">
        {day}
      </div>
      <div className="absolute left-9 bottom-8 z-50 text-neutral-500 text-base">
        {(dropDownValue === "phrases" || dropDownValue === "words") &&
          "* Hover over the text to see a magic"}
      </div>
    </div>
  );
}

export default App;
