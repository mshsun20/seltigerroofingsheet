"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productupdates.css";
import CarouselSlider from "@/components/common/CarouselSlider";

const ProductUpdates = ({ dataSet = {} }) => {
    const [open, setOpen] = React.useState(false);
    const modalRef = React.useRef();

    const handleClickOutside = React.useCallback((e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpen(false)
        }
    }, [])
    React.useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside, open])

  return (
    <div className="product-updates-layout">
        <div className="product-updates-hdr">
            <div className="product-updates-top">
                <span className="topper-icon">
                    <Image
                        src={dataSet?.topper?.icon?.url}
                        alt={dataSet?.topper?.icon?.alt}
                        width={parseInt(dataSet?.topper?.icon?.width)}
                        height={parseInt(dataSet?.topper?.icon?.height)}
                    />
                </span>
                <span className="topper-text">{dataSet?.topper?.text?.data}</span>
            </div>
            <div className="product-updates-heading">{dataSet?.heading?.data}</div>
        </div>
        <div className="product-updates-container">
            <div className="product-updates-contents">
                <CarouselSlider
                    data={dataSet?.contents?.graphicalContents}
                    cardWidth={80}
                    slideWidth={50}
                    gap={50}
                    autoPlay={true}
                    autoDelay={5000}
                    renderItem={(item) => (
                        <div>
                            <Image
                                src={item?.image?.url || "/"}
                                alt={item?.image?.alt || "No Image"}
                                width={item?.image?.width || 0}
                                height={item?.image?.height || 0}
                            />
                        </div>
                    )}
                    animationConfig={{
                        activeOpacity: 1,
                        inactiveOpacity: 0.4,
                        activeBlur: "0",
                        inactiveBlur: "0.2rem"
                    }}
                    springConfig={{
                        type: "spring",
                        stiffness: 150,
                        damping: 50
                    }}
                />
            </div>
        </div>
    </div>
  )
}

export default React.memo(ProductUpdates)