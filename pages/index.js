import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Terminal from '../components/Terminal/Terminal';
import IntroAnimation from '../components/IntroAnimation/IntroAnimation';

import BabbevOS from '../model/os';

export default function Home() {
  const os = new BabbevOS();
  const [displayIntroAnimation, setDisplayIntroAnimaion] = useState(true);

  const beginFadeOutAfter = 5000;
  const hideAnimationAfter = 6000;

  useEffect(() => {
    setTimeout(() => {
      setDisplayIntroAnimaion(false);
    }, hideAnimationAfter);
  },[displayIntroAnimation]);

  const introText = [
    'Welcome to BabbevOS!',
    'This is my personal website.',
    'Browse around to learn about me and have fun!',
    'Type "help" to get started.',
    '',
  ];

  const commandHandler = async (command) => os.cmd(command);

  return (
    <div className={styles.container}>
      <Head>
        <title>BabbevOS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          { displayIntroAnimation && <IntroAnimation fadeOutAfter={beginFadeOutAfter} /> }
          { !displayIntroAnimation &&  
            <Terminal
              height='80vh'
              user='neo'
              host='mtgox-prod-1'
              commandHandler={commandHandler}
              introText={introText} />
            }
        </div>
      </main>
    </div>
  )
}
