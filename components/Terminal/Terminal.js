import React, { useState, useRef } from 'react';
import Linkify from "linkify-react";
import TerminalInput from '../TerminalInput/TerminalInput';
import styles from './Terminal.module.css';
import { useEffect } from 'react';


export default function Terminal({
      user, 
      host, 
      commandHandler, 
      introText = [],
      height = '400px',
    }) {
      
    const [inputHistory, setInputHistory] = useState([[]]);
    const [outputHistory, setOutputHistory] = useState([ introText ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    };

    /**
     * @param {string[]} command 
     * @returns 
     */
    const handleCommand = async (command) => {
        const [ arg1 ] = command;
        if (arg1 === 'clear') {
            setInputHistory([[]]);
            setOutputHistory([[]]);
            return;
        } else if (command.length === 0) {
            // Empty line if no command is given
            setOutputHistory(prevOutput => [...prevOutput, []]);
            setInputHistory(prevLines => [...prevLines, []]);
            return;
        }

        const res = await commandHandler(command);

        setOutputHistory(prevOutput => [...prevOutput, res.split('\n')]);
        setInputHistory(prevLines => [...prevLines, []]);
    }

    useEffect(() => {
      const keyDownHandler = event => {
        scrollToBottom();

        // Add the pressed key to the state
        setInputHistory(prevLines => {
            let currentLine = prevLines[prevLines.length - 1]; 

            if (event.key === 'Backspace') {
              currentLine = currentLine.slice(0, -1);
            } else if (event.key === ' ') {
              currentLine = [...currentLine, '\u00A0'];
            } else if (event.key === 'Shift') {
              currentLine = [...currentLine];
            } else if (event.key === 'Enter' || event.key === '\n' || event.key === '\r') {
              // build the command array from input line
              const cmd = currentLine
                .join('')
                .split('\u00A0')
                .filter(x => x !== '');

              handleCommand(cmd);
              currentLine = [...currentLine];
            } else if (event.key.length === 1) {
              // On non ascii-keys even.key is multiple characters long
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

    useEffect(() => {
      scrollToBottom();
    }, [outputHistory]);
      
    return (
        <div className={styles.container} style={{ height: height }}>
            {inputHistory.map((line, index) => (
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
                  isCursorActive={index === inputHistory.length - 1} />
              </div>
            ))}

            <div ref={messagesEndRef}> 
            </div>
        </div>
    )
}
