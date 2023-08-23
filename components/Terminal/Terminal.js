import React, { useState } from 'react';
import TerminalLine from '../TerminalLine/TerminalLine';
import styles from './Terminal.module.css';

export default function Terminal({ user, host, commandHandler }) {
    const [currentLine, setKeysPressed] = useState([]);

    const handleCommand = async (command) => {
        const res = await commandHandler(command);
        console.log('got back from api', res.data);
    }
  
    const handleKeyDown = (event) => {
        // Add the pressed key to the state
        setKeysPressed(prevKeys => {
            if (event.key === 'Backspace') {
              return prevKeys.slice(0, -1);
            } else if (event.key === ' ') {
              return [...prevKeys, '\u00A0'];
            } else if (event.key === 'Shift') {
              return [...prevKeys];
            } else if (event.key === 'Enter') {
              console.log('execute command!', prevKeys);
              handleCommand(prevKeys.join(''));
              return prevKeys;
            }
            return [...prevKeys, event.key];
        });
    };

    return (
        <div className={styles.container} tabIndex="0" onKeyDown={handleKeyDown}>
            <TerminalLine className={styles.container} user={user} host={host} currentLine={currentLine} />
        </div>
    )
}
