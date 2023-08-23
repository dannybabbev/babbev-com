import Character from '../Character/Character';

import styles from './TerminalLine.module.css';

export default function TerminalLine({ 
        user, 
        host, 
        currentLine,
    }) {

    const start = `${user}@${host}`;
    
    return (
        <div className={styles.container}>
            <Character character={start} className={styles.terminalAccount} />
            <Character character=":" className={styles.terminalSeparator} />
            <Character character="~" className={styles.terminalLine} />
            <Character character="$&nbsp;" className={styles.terminalSeparator} />
            {currentLine.map((key, index) => (
                    <Character key={index} character={key} className={styles.terminalFontColor} />
            ))}
            <div className={styles.blinkingBox}></div>
        </div>
    )
}