"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productupdates.css";
import CarouselSlider from "@/components/common/CarouselSlider";
import ProductUpdatesCard from "./ProductUpdatesCard";

const ProductUpdates = ({ dataSet = {} }) => {
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const modalRef = React.useRef();

    const handleImageClick = React.useCallback((image) => {
        setSelectedImage(image);
        setOpen(true);
    }, []);

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
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open]);

  return (
    <div className="product-updates-layout">
        <div className="contnr">
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
                <CarouselSlider
                    data={dataSet?.contents?.graphicalContents}
                    slideWidth={100}
                    gap={350}
                    autoPlay={true}
                    autoDelay={5000}
                    renderItem={(item) => (
                        <ProductUpdatesCard
                            item={item}
                            onClick={handleImageClick}
                        />
                    )}
                    animationConfig={{
                        activeOpacity: 1,
                        inactiveOpacity: 1,
                        activeBlur: "0",
                        inactiveBlur: "0"
                    }}
                    springConfig={{
                        type: "fade",
                        stiffness: 150,
                        damping: 50
                    }}
                />
            </div>
        </div>

        {
            open && selectedImage && (
                <div className="product-updates-modal">
                    <div
                        className="product-updates-modal-container"
                        ref={modalRef}
                    >
                        <button
                            className="product-updates-modal-close"
                            onClick={() => setOpen(false)}
                        >
                            ✕
                        </button>
                        <Image
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            width={selectedImage.width}
                            height={selectedImage.height}
                        />
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default React.memo(ProductUpdates)