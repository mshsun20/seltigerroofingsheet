"use client";
import React from 'react'
import "@/styles/components/hero.css";
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="hero-layout">
        <div className="hero-wrapper">
            <Image
                src="/wp-content/themes/sel/assets/img/all-images/hero/hero0.jpg"
                alt="Roofing Sheet"
                width={500}
                height={100}
                className="hero-bg"
            />
        </div>
        <div className="hero-part">
            <div className="hero-content">
                <h1>Welcome to Seltiger Roofing Sheet</h1>
                <p>
                    We are a leading provider of high-quality roofing sheets, offering durable and reliable solutions for residential and commercial buildings. Our roofing sheets are designed to withstand harsh weather conditions while providing excellent protection and aesthetic appeal. With a commitment to customer satisfaction, we strive to deliver top-notch products and exceptional service to meet your roofing needs.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Hero