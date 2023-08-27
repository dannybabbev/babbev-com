'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Terminal from '../components/Terminal/Terminal';
import IntroAnimation from '../components/IntroAnimation/IntroAnimation';
import { INTRO_TEXT } from '../helpers/consts';

import BabbevOS from '../model/os';

export default function Page() {
  const os = new BabbevOS();
  const [displayIntroAnimation, setDisplayIntroAnimaion] = useState(true);

  const beginFadeOutAfter = 4000;
  const hideAnimationAfter = 5000;

  useEffect(() => {
    setTimeout(() => {
      setDisplayIntroAnimaion(false);
    }, hideAnimationAfter);
  },[displayIntroAnimation]);

  const commandHandler = async (command) => os.cmd(command);

  return (
    <div className={styles.container}>
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
