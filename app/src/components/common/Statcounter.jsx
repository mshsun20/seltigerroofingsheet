"use client";
import React from 'react';

const CounterItem = React.memo(function CounterItem({ target, suffix, info }) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const endValue = Number(target);

        if (!Number.isFinite(endValue)) {
            setTimeout(() => {
                setCount(target);
            }, 0);
            return;
        }

        const duration = 2000;
        const startTime = performance.now();

        // Detect precision automatically
        const decimalPlaces = (() => {
            const str = endValue.toString();

            if (str.includes("e")) {
                const [, exp] = str.split("e");
                return Math.max(0, Math.abs(Number(exp)));
            }

            return str.includes(".")
                ? str.split(".")[1].length
                : 0;
        })();

        let animationFrame;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = endValue * progress;

            setCount(
                decimalPlaces > 0
                    ? Number(currentValue.toFixed(decimalPlaces))
                    : Math.round(currentValue)
            );

            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateCounter);
            } else {
                setCount(endValue);
            }
        };

        animationFrame = requestAnimationFrame(updateCounter);

        return () => cancelAnimationFrame(animationFrame);
    }, [target]);

    return (
        <div className="stat-counter">
            <div className="counter-details">
                <div className="counter-value">
                    {typeof count === "number" ? count.toLocaleString() : count}
                </div>
                <div className="counter-suffix">{suffix}</div>
            </div>
            <div className="counter-info">{info}</div>
        </div>
    );
});

const Statcounter = ({ statData=[] }) => {
    return (
        <div className="stat-counter-wrapper">
            {statData.map((elm, i) => (
                <CounterItem
                    key={i}
                    target={elm.value}
                    suffix={elm.suffix}
                    info={elm.info}
                />
            ))}
        </div>
    );
};

export default React.memo(Statcounter);