"use client";
import React from "react";
import { m } from "framer-motion";
import testimonialData from "@/data/contact/testimonialData";

const AUTO_DELAY = 5000;
const CARD_WIDTH = 480;
const GAP = 40;

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [paused, setPaused] = React.useState(false);

    // NEXT
    const nextSlide = React.useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
    }, []);

    // PREV
    const prevSlide = React.useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
    }, []);

    // AUTOPLAY
    React.useEffect(() => {
        if (paused) return;
        const interval = setInterval(() => {
            nextSlide();
        }, AUTO_DELAY);
        return () => clearInterval(interval);
    }, [paused, nextSlide]);

    // DRAG
    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -100 || velocity < -500) {
            nextSlide();
        }
        if (offset > 100 || velocity > 500) {
            prevSlide();
        }
    };

    return (
        <section
            className="testimonial-section"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="testimonial-stage">
                {testimonialData.map((item, index) => {
                    let position = index - currentIndex;
                    // TRUE CIRCULAR POSITIONING
                    const total = testimonialData.length;
                    position = ((position + total) % total);
                    if (position > total / 2) {
                        position -= total;
                    }
                    const isActive = position === 0;
                    return (
                        <m.div
                            key={item.id}
                            className="testimonial-card"
                            drag="x"
                            dragConstraints={{
                                left: 0,
                                right: 0,
                            }}
                            onDragEnd={handleDragEnd}
                            animate={{
                                x:
                                    (
                                        position *
                                        (CARD_WIDTH + GAP)
                                    ) - (CARD_WIDTH / 2),

                                y: "-50%",

                                scale: isActive
                                    ? 1
                                    : 0.88,

                                opacity: isActive
                                    ? 1
                                    : 0.55,

                                filter: isActive
                                    ? "blur(0px)"
                                    : "blur(0.2rem)",

                                zIndex: isActive
                                    ? 5
                                    : 1,
                            }}

                            transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 18,
                            }}
                        >
                            <div className="slider-card">
                                <div className="slider-card-hdr">
                                    <div className="slider-hdr">
                                        {item.heading}
                                    </div>
                                    <div className="slider-icon">
                                        <img
                                            src={item.icon.src}
                                            alt="icon"
                                        />
                                    </div>
                                </div>
                                <div className="slider-details">
                                    {item.details}
                                </div>
                            </div>
                        </m.div>
                    );
                })}

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
}

export default React.memo(TestimonialSlider);