"use client";
import Image from 'next/image';
import React from 'react'
import { testimonialData } from "@/data/testimonialData"
import CarouselSlider from "@/components/common/CarouselSlider";
import ContactLocationCard from "./ContactLocationCard";

const Contactlocation = () => {
  return (
    <div className='contact-locations'>
        <div className="contact-location-hdr">
            <div className="contact-location-top">
                <div className="topper-icon">
                    <Image
                        src="/wp-content/themes/sel/assets/img/icons/sub-logo3.svg"
                        alt="sub logo3"
                        width={20}
                        height={20}
                    />
                </div>
                <div className="topper-text">Locations</div>
            </div>
            <div className="contact-location-hdng">Our Other Loactions</div>
        </div>
        <div className="contact-location-slider">
            <CarouselSlider
                data={testimonialData}
                cardWidth={80}
                slideWidth={350}
                gap={40}
                autoPlay={true}
                autoDelay={5000}
                renderItem={(item) => (
                    <ContactLocationCard item={item} />
                )}                
                animationConfig={{
                    activeOpacity: 1,
                    inactiveOpacity: 0.4,
                    activeBlur: "0",
                    inactiveBlur: "0.2rem"
                }}
                springConfig={{
                    type: "spring",
                    stiffness: 500,
                    damping: 350
                }}
            />
        </div>
        <div className="contact-location-map"></div>
    </div>
  )
}

export default React.memo(Contactlocation)