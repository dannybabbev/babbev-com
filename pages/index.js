import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Terminal from '../components/Terminal/Terminal';
import BabbevOS from '../model/os';


export default function Home() {
  const os = new BabbevOS();

  const commandHandler = async (command) => os.cmd(command);

  return (
    <div className={styles.container}>
      <Head>
        <title>BabbevOS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Terminal 
            height='80vh'
            user='guest' 
            host='babbev-vm' 
            commandHandler={commandHandler} />
        </div>
      </main>
    </div>
  )
}
