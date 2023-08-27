import classNames from 'classnames';
import Character from '../Character/Character';
import styles from './TerminalInput.module.css';

export default function TerminalInput({ 
        user, 
        host, 
        currentLine,
        isCursorActive = true,
        hideSystemInfo = false,
        isTyping = false,
    }) {

    const start = `${user}@${host}`;

    let textAsArray = currentLine;
    if (typeof(textAsArray) === 'string') { 
        textAsArray = textAsArray.split('');
    }

    const blinkerClasses = classNames(
        styles.blinkingBox, 
        { 
            [styles.blinking] : !isTyping,
        });
    
    return (
        <div className={styles.container}>
            { !hideSystemInfo && 
                <div className={styles.systemInfoGroup}>
                    <Character character={start} className={styles.terminalAccount} />
                    <Character character=":" className={styles.terminalSeparator} />
                    <Character character="~" className={styles.terminalLine} />
                    <Character character="$&nbsp;" className={styles.terminalSeparator} />
                </div>
            }

            {textAsArray.map((key, index) => (
                    <Character key={index} character={key} className={styles.terminalFontColor} />
            ))}

            { isCursorActive && <div className={blinkerClasses}></div> }

            <textarea className={styles.hiddenTextArea} />
        </div>
    )
}