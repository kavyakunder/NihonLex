"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export const TextRevealCard = ({ text, revealText }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  function mouseLeaveHandler() {
    setIsMouseOver(false);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
    setHasInteracted(true);
  }
  console.log("isssssmouseover", isMouseOver);

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      // onTouchStart={mouseEnterHandler}
      // onTouchEnd={mouseLeaveHandler}
    >
      <div className="relative flex items-center overflow-hidden">
        <motion.div
          initial={false}
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                }
          }
          transition={{ duration: 1 }}
          className="absolute 
            z-20  will-change-transform cursor-pointer"
        >
          <p
            style={{
              fontSize: "5rem",
              whiteSpace: "nowrap",
            }}
            className="text-2xl sm:text-[3rem] py-6 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
          >
            {revealText}
          </p>
        </motion.div>

        <div className=" overflow-hidden">
          <motion.div
            initial={false}
            animate={
              isMouseOver
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 1,
                  }
            }
            transition={{ duration: 1 }}
          >
            <p className="text-4xl lg:text-8xl md:text-6xl py-12 font-bold bg-clip-text bg-[#ffffff] ">
              {text}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
