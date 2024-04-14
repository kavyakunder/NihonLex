"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cn } from "../../utils/cn";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
  mouseEnter,
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event) {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }
  function touchMoveHandler(event) {
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;

  console.log("widthpercentage", widthPercentage);

  console.log("revealText", revealText);
  console.log("text is", text);
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        // " w-[30rem]
        " rounded-lg p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="relative flex items-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute 
            z-20  will-change-transform
           
"
          //          bg-[#1d1c20]"
        >
          <p
            style={{
              // textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
              fontSize: "5rem",
              whiteSpace: "nowrap", // Prevent text wrapping
            }}
            className="text-base sm:text-[3rem] py-6 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
          >
            {revealText}
          </p>
        </motion.div>
        {/* <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
        ></motion.div> */}

        <div
          className=" overflow-hidden"
          //  [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"
        >
          <p
            className={`text-2xl sm:text-[3rem] py-12 font-bold bg-clip-text bg-[#ffffff] 
             `}
            style={{
              clipPath: `inset(0 0 0 ${widthPercentage}%)`,
              fontSize: "6rem",
              // paddingBottom: "48px",
            }}
          >
            {text}
          </p>
          {/* <MemoizedStars /> */}
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({ children, className }) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({ children, className }) => {
  return (
    <p className={twMerge("text-[#a9a9a9] text-sm", className)}>{children}</p>
  );
};
