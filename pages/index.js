import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Terminal from '../components/Terminal/Terminal';
import IntroAnimation from '../components/IntroAnimation/IntroAnimation';
import { INTRO_TEXT } from '../helpers/consts';

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

  const commandHandler = async (command) => os.cmd(command);

  return (
    <div className={styles.container}>
      <Head>
        <title>BabbevOS</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="description" content="Personal Website of Daniel Babbev" />
        <meta property="og:image" content="https://www.babbev.com/og-image.png"></meta>
        <meta property="og:title" content="Daniel Babbev"></meta>
        <meta property="og:description" content="Personal website" />
      </Head>

      <div>
        { displayIntroAnimation && <IntroAnimation fadeOutAfter={beginFadeOutAfter} /> }
        { !displayIntroAnimation &&  
          <Terminal
            height='80vh'
            user='neo'
            host='mtgox-prod-1'
            commandHandler={commandHandler}
            introText={INTRO_TEXT} />
          }
      </div>
    </div>
  )
}
