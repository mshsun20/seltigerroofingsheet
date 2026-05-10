import React from 'react';

const statCounter = [
    { value: 50, info: 'Countries Worldwide' },
    { value: 400, info: 'Team Members' },
    { value: 2000, info: 'Network Channel' },
];

const CounterItem = React.memo(function CounterItem({ target, info }) {
    const [count, setCount] = React.useState(0);

    const counter = React.useCallback(() => {
        let start = 0;
        // Animation duration
        const duration = 2000;
        // Increase speed calculation
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
       counter();
    }, [counter]);

    return (
        <div className="stat-counter">
            <div className="counter-value">
                {count}+
            </div>
            <div className="counter-info">
                {info}
            </div>
        </div>
    );
});

const Statcounter = () => {
    return (
        <div className="hero-stat">
            {statCounter.map((elm, i) => (
                <CounterItem
                    key={i}
                    target={elm.value}
                    info={elm.info}
                />
            ))}
        </div>
    );
};

export default React.memo(Statcounter);