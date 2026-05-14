"use client";
import React from "react";
import '@/styles/components/testimonial.css'
import {
    m,
    AnimatePresence,
    // PanInfo,
} from "framer-motion";
import SliderCard from "./SliderCard";
import testimonialData from "@/configs/testimonialData";

const AUTO_SLIDE_DELAY = 5000;
const CARD_WIDTH = 520;

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [enableTransition, setEnableTransition] = React.useState(true);
    const [paused, setPaused] = React.useState(false);
    const intervalRef = React.useRef(null);

    // NEXT
    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === testimonialData.length - 1
                ? 0
                : prev + 1
        );
    };
    // PREVIOUS
    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0
                ? testimonialData.length - 1
                : prev - 1
        );
    };
    // AUTO PLAY
    React.useEffect(() => {
        if (currentIndex >= testimonialData.length) {
            setTimeout(() => {
                setEnableTransition(false);
                setCurrentIndex(0);
            }, 1200);
        } else {
            setEnableTransition(true);
        }
    }, [currentIndex]);
    React.useEffect(() => {
        if (paused) return;

        intervalRef.current = setInterval(() => {
            nextSlide();
        }, AUTO_SLIDE_DELAY);

        return () => clearInterval(intervalRef.current);
    }, [paused]);

    // DRAG END
    const handleDragEnd = (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -100 || velocity < -500) nextSlide();
        if (offset > 100 || velocity > 500) prevSlide();
    };

    // GET INDEX
    // const getVisibleCards = () => {
    //     const prev = currentIndex === 0
    //         ? testimonialData.length - 1
    //         : currentIndex - 1;

    //     const next = currentIndex === testimonialData.length - 1
    //         ? 0
    //         : currentIndex + 1;

    //     return [
    //         testimonialData[prev],
    //         testimonialData[currentIndex],
    //         testimonialData[next],
    //     ];
    // };

    // const visibleCards = getVisibleCards();

  return (
    <section
        className="testimonial-section"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
    >
        <div className="slider-wrapper">
            {/* <AnimatePresence mode="popLayout"> */}

                <m.div
                    className="slider-track"
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0,
                    }}
                    onDragEnd={handleDragEnd}
                    animate={{
                        x: -(currentIndex * CARD_WIDTH),
                    }}
                    transition={
                        enableTransition
                            ? {
                                duration: 1.8,
                                ease: [0.22, 1, 0.36, 1],
                            }
                            : {
                                duration: 0,
                            }
                    }
                >

                {testimonialData.map((item, index) => {
                    const activeIndex = currentIndex % testimonialData.length;
                    const isActive = index === activeIndex;

                    return (
                    <SliderCard
                        key={item.id}
                        heading={item.heading}
                        icon={item.icon}
                        details={item.details}
                        isActive={isActive}
                    />
                    );
                })}

                </m.div>

            {/* </AnimatePresence> */}
        </div>

        {/* PAGINATION */}
        <div className="slider-pagination">
            {testimonialData.map((_, index) => (
                <button
                    key={index}
                    className={`pagination-dot ${
                        currentIndex === index
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                        setCurrentIndex(index)
                    }
                />
            ))}
        </div>
    </section>
  );
};

export default React.memo(TestimonialSlider);