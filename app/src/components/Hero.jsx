"use client";
import React from 'react'
import "@/styles/components/hero.css";
import Image from 'next/image';
import RainyFilter from '@/components/RainyFilter';

const statCounter = [
    { value: 50, info: 'Countries Worldwide' },
    { value: 400, info: 'Team Members' },
    { value: 2000, info: 'Network Channel' },
]

const Hero = () => {
    const counter = React.useMemo(() => statCounter, [])

  return (
    <div className="hero-layout">
        <div className="hero-wrapper">
            <Image
                src="/wp-content/themes/sel/assets/img/all-images/hero/hero0.avif"
                alt="Roofing Sheet"
                width={500}
                height={100}
                className="hero-bg"
            />
            {/* <RainyFilter /> */}
        </div>
        <div className="hero-part container">
            <div className="hero-container">
                <div className="hero-topper">
                    <span className="topper-icon">
                        <Image
                            src="/wp-content/themes/sel/assets/img/icons/sub-logo3.svg"
                            alt="sub logo3"
                            width={20}
                            height={20}
                        />
                    </span>
                    <span className="topper-text">Industrial Use</span>
                </div>
                <div className="hero-heading">
                    Engineered for Strength Built for Industry
                </div>
                <div className="hero-content">
                    <span>From manufacturing plants to warehouses, our high-performance roofing sheets offer durability, efficiency, and long-lasting protection for industrial applications.</span>
                </div>
                <div className="hero-actions">
                    <button>Discover More</button>
                </div>
                <div className="hero-stat">
                    {counter?.length>0 && counter?.map((elm, i) => (
                        <div className="stat-counter" key={i}>
                            <div className="counter-value">{elm.value}+</div>
                            <div className="counter-info">{elm.info}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero