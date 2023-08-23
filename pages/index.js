import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import Terminal from '../components/Terminal/Terminal';


export default function Home() {

  const commandHandler = async (command) => {
    const res = await axios.get(`/api/command?command=${command}`);
    const { result } = res.data;
    return result;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Terminal user='visitor' host='babbev-world' commandHandler={commandHandler} />
      </main>
    </div>
  )
}
