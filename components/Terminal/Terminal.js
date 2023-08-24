import React, { useState, useRef } from 'react';
import Linkify from "linkify-react";
import TerminalInput from '../TerminalInput/TerminalInput';
import styles from './Terminal.module.css';
import { useEffect } from 'react';


export default function Terminal({ 
      user, 
      host, 
      commandHandler, 
      height = '400px',
    }) {

    const introText = [
      'Welcome to BabbevOS!',
      'Type "help" to get started.',
      '',
    ];
    const [inputHistory, setInputHistory] = useState([[]]);
    const [outputHistory, setOutputHistory] = useState([ introText ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    };

    const handleCommand = async (command) => {
        if (command === 'clear') {
            setInputHistory([[]]);
            setOutputHistory([[]]);
            return;
        }
        const res = await commandHandler(command);
        console.log(res);
        setOutputHistory(prevOutput => [...prevOutput, res.split('\n')]);
        setInputHistory(prevLines => [...prevLines, []]);
    }

    useEffect(() => {
      const keyDownHandler = event => {
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
