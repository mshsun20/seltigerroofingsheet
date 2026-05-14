import Image from 'next/image';
import React from 'react'
import TestimonialSlider from '@/components/TestimonialSlider'

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
        <div className="contact-location-slider"><TestimonialSlider /></div>
        <div className="contact-location-map"></div>
    </div>
  )
}

export default Contactlocation