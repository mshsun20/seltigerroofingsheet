"use client";
import React from 'react'
import '@/styles/components/galleryslider.css';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'


const GallerySlider = ({ slides = [] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [ Autoplay({ delay: 2500, stopOnInteraction: false }) ]
    )
    const extendedSlides = [...slides, ...slides, ...slides]

    // const [duplicateSlides, setDuplicateSlides] = React.useState([...slides])
    const [scrollProgress, setScrollProgress] = React.useState(0)

    // 🔥 STEP 5 — Track scroll progress
    React.useEffect(() => {
        if (!emblaApi) return
        const updateProgress = () => {
            const progress = emblaApi.scrollProgress()
            setScrollProgress(progress)
        }
        emblaApi.on('scroll', updateProgress)
        emblaApi.on('reInit', updateProgress)
        updateProgress()
        return () => {
            emblaApi.off('scroll', updateProgress)
            emblaApi.off('reInit', updateProgress)
        }
    }, [emblaApi])

    return (
        <div className="gallery-slider">
            {/* 🔥 Carousel */}
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {extendedSlides.map((img, index) => (
                        <div className="embla__slide" key={index}>
                            {/* <Image
                                src={img}
                                alt={`Slide ${index}`}
                                width={100000}
                                height={100000}
                            /> */}
                            <Image src={img} alt={`Slide ${index}`} width={1000} height={1000} />
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔥 Custom Scrollbar */}
            <div className="embla__scrollbar">
                <div
                    className="embla__scrollbar_thumb"
                    style={{
                        transform: `scaleX(${scrollProgress})`
                    }}
                />
            </div>
        </div>
    )
}

export default React.memo(GallerySlider)