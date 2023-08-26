import React, { useState, useEffect } from "react";
import TerminalInput from "../TerminalInput/TerminalInput"

export default function TyperWriter({ text, speed = 100,  }) {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (index < text.length) {
                setDisplayText((prevText) => prevText + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
            } else {
                clearInterval(intervalId);
                setIsTyping(false);
            }
        }, speed);  // adjust the timing for typing speed

        return () => clearInterval(intervalId); // cleanup on component unmount
    }, [index, displayText, speed, text]);

    return (
        <div>
            <TerminalInput currentLine={displayText} isTyping={isTyping} hideSystemInfo={true} />
        </div>
    )
}