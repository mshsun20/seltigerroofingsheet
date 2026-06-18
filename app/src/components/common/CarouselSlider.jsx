"use client";
import React from "react";
import { m } from "framer-motion";
import "@/styles/components/carouselslider.css";

const DEFAULT_ANIMATION = {
    activeScale: 1,
    inactiveScale: 0.9,
    activeOpacity: 1,
    inactiveOpacity: 0.4,
    activeBlur: "0px",
    inactiveBlur: "6px",
    activeZIndex: 5,
    inactiveZIndex: 1,
};

const CarouselSlider = ({
    data = [],
    renderItem,
    autoPlay = true,
    autoDelay = 5000,
    slideWidth = 500,
    gap = 40,
    className = "",
    showPagination = true,
    animationConfig = {},
    springConfig = {
        type: "spring",
        stiffness: 120,
        damping: 20,
    },
}) => {
    const config = { ...DEFAULT_ANIMATION, ...animationConfig };
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [paused, setPaused] = React.useState(false);

    const nextSlide = React.useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length);
    }, [data.length]);
    const prevSlide = React.useCallback(() => {
        setCurrentIndex((prev) => prev === 0 ? data.length - 1 : prev - 1);
    }, [data.length]);

    React.useEffect(() => {
        if (!autoPlay) return;
        if (paused) return;
        const timer = setInterval(nextSlide, autoDelay);
        return () => clearInterval(timer);
    }, [paused, autoPlay, autoDelay, nextSlide]);

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -100 || velocity < -500) nextSlide();
        if (offset > 100 || velocity > 500) prevSlide();
    };

    return (
        <section
            className={`carousel-container ${className}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="carousel-stage">
                {data.map((item, index) => {
                    let position = index - currentIndex;
                    const total = data.length;
                    position = (position + total) % total;
                    if (position > total / 2) {
                        position -= total;
                    }
                    const isActive = position === 0;
                    return (
                        <m.div
                            key={
                                item.id ||
                                index
                            }
                            className="carousel-slide"
                            drag="x"
                            dragConstraints={{
                                left: 0,
                                right: 0
                            }}
                            onDragEnd={handleDragEnd}
                            style={{ translateX: "-50%" }}
                            animate={{
                                x: position * (slideWidth + gap),
                                y: "-50%",
                                scale: isActive ? config.activeScale : config.inactiveScale,
                                opacity: isActive ? config.activeOpacity : config.inactiveOpacity,
                                filter: isActive ? `blur(${config.activeBlur})` : `blur(${config.inactiveBlur})`,
                                zIndex: isActive ? config.activeZIndex : config.inactiveZIndex,
                            }}
                            transition={springConfig}
                        >
                            {
                                renderItem(
                                    item,
                                    isActive,
                                    position
                                )
                            }
                        </m.div>
                    );
                })}
            </div>
            {
                showPagination && (
                    <div className="carousel-pagination">
                        {data.map((_, index) => (
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
                )
            }
        </section>
    );
};

export default React.memo(CarouselSlider);