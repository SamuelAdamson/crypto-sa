// Fader -- Fade in child elements
import { useState, useRef, useEffect } from 'react';

const Fader = ({
    children,
}) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            // Check intersecting
            if (entries[0].isIntersecting) {
                // Set Visible
                setVisible(true);
                // Unobserve
                observer.unobserve(domRef.current);
            }
        });

        observer.observe(domRef.current);
    }, []);

    return(
        <div ref={ domRef } className={`fader ${ isVisible ? "is-visible" : "" }`}>
            { children }
        </div>
    );
}

export default Fader;