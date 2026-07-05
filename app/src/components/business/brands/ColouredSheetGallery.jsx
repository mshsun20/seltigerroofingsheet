"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/colouredsheetgallery.css";
import CarouselSlider from "@/components/common/CarouselSlider";
import ColouredSheetGalleryCard from "./ColouredSheetGalleryCard";

const ColouredSheetGallery = ({ dataSet = {} }) => {
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
    <div className="coloured-sheet-gallery-layout">
        <div className="contnr">
            <div className="coloured-sheet-gallery-hdr">
                <div className="coloured-sheet-gallery-top">
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
                <div className="coloured-sheet-gallery-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="coloured-sheet-gallery-container">
                <CarouselSlider
                    data={dataSet?.contents?.graphicalContents}
                    slideWidth={100}
                    gap={350}
                    autoPlay={true}
                    autoDelay={5000}
                    renderItem={(item) => (
                        <ColouredSheetGalleryCard
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
                <div className="coloured-sheet-gallery-modal">
                    <div
                        className="coloured-sheet-gallery-modal-container"
                        ref={modalRef}
                    >
                        <button
                            className="coloured-sheet-gallery-modal-close"
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

export default React.memo(ColouredSheetGallery)