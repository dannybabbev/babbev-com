import React, { useState, useRef } from 'react';
import MatrixRain from '../MatrixRain/MatrixRain';
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
      
    const [inputExecutedCmdHistory, setInputExecutedCmdHistory] = useState(
      {
        history: [],
        browseIndex: 0,
      }
    );
    const [inputHistory, setInputHistory] = useState([[]]);
    const [outputHistory, setOutputHistory] = useState([ introText ]);
    const messagesEndRef = useRef(null);
    const [isMatrixRain, setIsMatrixRain] = useState(false);

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ block: 'nearest', inline: 'start' });
    };

    useEffect(() => {
      /**
       * @param {string[]} command
       * @returns
       */
      const handleCommand = async (command) => {
        const [arg1] = command;
        if (arg1 === "clear") {
          setInputHistory([[]]);
          setOutputHistory([[]]);
          return;
        }

        const res = await commandHandler(command);
        if (res === null) {
          setOutputHistory((prevOutput) => [...prevOutput, []]);
        } else {
          setOutputHistory((prevOutput) => [...prevOutput, res.split("\n")]);
        }

        setInputHistory((prevLines) => [...prevLines, []]);

        if (command.length > 0) {
          setInputExecutedCmdHistory((prevHistory) => {
            const history = [...prevHistory.history, command.join(' ').split('')];
            return {
              history,
              browseIndex: history.length,
            };
          });
        }

        if (command.length === 1 && command[0] === 'matrix') {
          setTimeout(() => setIsMatrixRain(true), 250);
        }
      };

      const keyDownHandler = (event) => {
        event.preventDefault();

        if (!isMatrixRain) {
          scrollToBottom();
        }

        // Hande the key down events
        setInputHistory((prevLines) => {
          let currentLine = prevLines[prevLines.length - 1];

          if (event.key === "Backspace") {
            // Delete character
            currentLine = currentLine.slice(0, -1);
          } else if (
            event.key === "Enter" ||
            event.key === "\n" ||
            event.key === "\r"
          ) {
            // build the command array from input line
            const cmd = currentLine
              .join("")
              .split(" ")
              .filter((x) => x !== "");

            // execute the command
            handleCommand(cmd);
            currentLine = [...currentLine];
          } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            // Browse command history
            const { key } = event;
            const { history, browseIndex } = inputExecutedCmdHistory;
            const selector = key === 'ArrowUp' ? - 1 : 1;
            const histCmd = history[browseIndex + selector];
            if (histCmd) {
              currentLine = [...histCmd];
              setInputExecutedCmdHistory((prevHistory) => ({
                ...prevHistory,
                browseIndex: prevHistory.browseIndex + selector,
              }));
            } else if (history.length > 0 && key === 'ArrowDown') {
              currentLine = [];
              setInputExecutedCmdHistory((prevHistory) => ({
                ...prevHistory,
                browseIndex: prevHistory.history.length,
              }));
            }
          } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
              // Stop the matrix
              setIsMatrixRain(false);
          } else if (event.key.length === 1) {
            // Add character to current line
            // On non ascii-keys even.key is multiple characters long
            currentLine = [...currentLine, event.key];
          }

          const lines = prevLines.slice(0, -1);
          lines.push([...currentLine]);
          return lines;
        });
      };

      document.addEventListener("keydown", keyDownHandler);

      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }, [commandHandler, inputExecutedCmdHistory, isMatrixRain]);

    useEffect(() => {
      scrollToBottom();
    }, [outputHistory]);

    return (
        <div>
          { isMatrixRain && <MatrixRain /> }
          { !isMatrixRain && 
            <div className={styles.container} style={{ height: height }}>
                {inputHistory.map((line, index) => (
                  <div key={index} >
                    <div className={styles.outputText}>
                      {outputHistory[index] && outputHistory[index].map((output, indexMsg) => (
                        <div key={indexMsg} className={styles.outputLine}>
                          <Linkify as="p" options={{target: '_blank'}}>{output}</Linkify>
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
          }
        </div>
    )
}
