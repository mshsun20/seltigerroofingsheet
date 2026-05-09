"use client"
import React from 'react'

const RainyFilter = () => {
    const containerRef = React.useRef();

    React.useEffect(() => {
        // Logic to create raindrops dynamically
        const createRain = () => {
            if (!containerRef.current) return;
            const drop = document.createElement('div');
            drop.className = 'raindrop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
            containerRef.current.appendChild(drop);

            // Remove drop after animation ends to prevent DOM clutter
            setTimeout(() => drop.remove(), 2000);
        };

        const interval = setInterval(createRain, 50);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-cover bg-[url('/your-image.jpg')]">
        {/* Container for animated drops */}
        <div ref={containerRef} className="absolute inset-0 pointer-events-none filter-rainy" />
        
        {/* SVG Filter Definition */}
        <svg className="hidden">
            <filter id="rain-filter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
        </svg>
    </div>
  )
}

export default RainyFilter