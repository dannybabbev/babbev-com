import React, { useState } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

import TerminalLine from './components/TerminalLine/TerminalLine';

export default function Home() {
  const [keysPressed, setKeysPressed] = useState([]);

  const handleKeyDown = (event) => {
      // Add the pressed key to the state
      setKeysPressed(prevKeys => {
          if (event.key === 'Backspace') {
            return prevKeys.slice(0, -1);
          } else if (event.key === ' ') {
            return [...prevKeys, '\u00A0'];
          }
          return [...prevKeys, event.key];
      });
  };

  return (
    <div className={styles.container} tabIndex="0" onKeyDown={handleKeyDown}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TerminalLine currentLine={keysPressed} />
      </main>
    </div>
  )
}
