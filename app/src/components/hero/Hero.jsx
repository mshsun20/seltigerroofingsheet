"use client";
import React from 'react'
import "@/styles/components/hero.css";
import Image from 'next/image';
import Link from 'next/link';
import Statcounter from '@/components/Statcounter';
import { heroStatCounterItems } from '@/configs/allStatCounterItems';

const Hero = () => {
    const [arrow, setArrow] = React.useState('↗');

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
        </div>
        <div className="hero-part">
            <div className="hero-container container">
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
                    <button onMouseEnter={() => setArrow('→')} onMouseLeave={() => setArrow('↗')}>Discover More <span>{arrow}</span></button>
                </div>
                <div className="hero-stat">
                    <Statcounter statData={heroStatCounterItems} />
                </div>
            </div>
            <div className="hero-links">
                <div className="link-wrap"></div>
                <div className="link-info">
                    <Link href="#">Industrial Use</Link>
                    <Link href="#">Domestic Use</Link>
                    <Link href="#">Project Application</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero