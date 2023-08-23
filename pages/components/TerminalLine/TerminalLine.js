import Character from '../Character/Character';

import styles from './TerminalLine.module.css';

export default function Terminal({ currentLine }) {
    return (
        <div className={styles.container}>
            <Character character="visitor@babbev-world" className={styles.terminalAccount} />
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