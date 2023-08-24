import React, { useState } from 'react';
import Linkify from "linkify-react";
import TerminalInput from '../TerminalInput/TerminalInput';
import styles from './Terminal.module.css';
import { useEffect } from 'react';


export default function Terminal({ user, host, commandHandler }) {
    const [lineHistory, setLineHistory] = useState([[]]);
    const [outputHistory, setOutputHistory] = useState([[]]);

    const handleCommand = async (command) => {
        if (command === 'clear') {
            setLineHistory([[]]);
            setOutputHistory([[]]);
            return;
        }
        const res = await commandHandler(command);
        setOutputHistory(prevOutput => [...prevOutput, res.split('\n')]);
        setLineHistory(prevLines => [...prevLines, []]);
    }

    useEffect(() => {
      const keyDownHandler = event => {
        // Add the pressed key to the state
        setLineHistory(prevLines => {
            let currentLine = prevLines[prevLines.length - 1]; 

            if (event.key === 'Backspace') {
              currentLine = currentLine.slice(0, -1);
            } else if (event.key === ' ') {
              currentLine = [...currentLine, '\u00A0'];
            } else if (event.key === 'Shift') {
              currentLine = [...currentLine];
            } else if (event.key === 'Enter' || event.key === '\n' || event.key === '\r') {
              const cmd = currentLine.join('');
              handleCommand(cmd);
              currentLine = [...currentLine];
            } else {
              currentLine = [...currentLine, event.key];
            }

            const lines = prevLines.slice(0, -1);
            lines.push([...currentLine]);
            return lines;
        });
      }

      document.addEventListener('keydown', keyDownHandler);

      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }, []);
      
    return (
        <div className={styles.container}>
            {lineHistory.map((line, index) => (
              <div key={index} >
                <div className={styles.outputText}>
                  {outputHistory[index] && outputHistory[index].map((output, indexMsg) => (
                    <div key={indexMsg} className={styles.outputLine}>
                      <Linkify as="p">{output}</Linkify>
                    </div>
                  ))}
                </div>
                <TerminalInput 
                  user={user} 
                  host={host} 
                  currentLine={line} 
                  isCursorActive={index === lineHistory.length - 1} />
              </div>
            ))}
            
        </div>
    )
}
