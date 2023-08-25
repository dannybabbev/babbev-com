import { table, getBorderCharacters } from 'table';

class BabbevOS {
    constructor() {
        this.borderlessTable = {
            border: getBorderCharacters('void'),
            columnDefault: {
                paddingLeft: 0,
                paddingRight: 1,
            },
            columns: [ { width: 20 }, { width: 50 } ],
            drawHorizontalLine: () => false,
        }
    }

    notFound = (cmd) => `${cmd}: command not found. Type "help" to get started.`;
    
    help = () => table(
        [
            ['babbev.com', ''],
            ['', ''],
            ['Usage:', ''],
            ['help', 'this message or help for a specific command'],
            ['about', 'short about me, experience, cv'],
            ['books', 'my favorite books'],
            ['contact', 'contact information'],
            ['social', 'social media links'],
            ['source', 'link to the source code of this app'],
        ],
        this.borderlessTable,
    );
    
    techExp = () => {
        const year = new Date().getFullYear();
        const crypto = 2015;
        const linux = 2018;
        const js = 2018;
        const python = 2018;
        const docker = 2018;
        const react = 2019;
        const csharp = 3;
        const go = 3;

        const expStr = (y) => `${y}+`;

        const data = [
            ['Technology', 'Years of experience'],
            ['Bitcoin / Crypto', expStr(year - crypto)],
            ['Linux', expStr(year - linux)],
            ['JavaScript / Ts', expStr(year - js)],
            ['Python', expStr(year - python)],
            ['Docker / Swarm / k8s', expStr(year - docker)],
            ['React', expStr(year - react)],
            ['Go', expStr(go)],
            ['C#', expStr(csharp)],
        ];

        return table(data, {
            border: getBorderCharacters('ramac'),
        });
    }

    experience = () => {
        const data = [
            ['Company', 'Period', 'Position', 'Description'],
            ['Brevan Howard', 'May 2022 - May 2023', 'Risk Strategist', 'Developed a risk management system for the crypto trading desk.'],
            ['Bitcoin Suisse', 'May 2020 - April 2022', 'Crypto Developer', 'Developed the deposit and withdrawal crypto systems.'],
            ['Fair Poker', 'Nov 2018 - Dec 2021', 'Founder & Developer', 'Developed a full crypto poker platform.'],
        ];

        return table(data, {
            border: getBorderCharacters('ramac'),
        });
    }

    about = () => 
        `My name is Daniel Babbev, from Sofia, Bulgaria. I am currently based 
in Geneva, Switzerland. I am a full-stack software engineer with a 
passion for crypto. I am expericed in building full crypto systems from
scratch and maintaining existing enterprise-level software. My approach
to development is to write clean, test-driven code with an emphasis on 
security.

Experience:
${this.experience()}

Technologies:
${this.techExp()}

Full Resume: https://babbev.com/cv.pdf`;
    
    contact = () => table([
        ['Email', 'daniel@babbev.com'],
        ['Telegram', 'https://t.me/danbb_fp'],
    ], this.borderlessTable);
    
    social = () => table([
        ['GitHub', 'https://github.com/dannybabbev'],
        ['LinkedIn', 'https://www.linkedin.com/in/danielbabbev'],
        ['Twitter', 'https://twitter.com/danbb_fp'],
    ], this.borderlessTable);
    
    source = () => 'https://github.com/dannybabbev/babbev-com';

    booksTable = () => table([
        ['Atlas Shrugged', 'Ayn Rand'],
        ['The Mistery of Banking', 'Murray Rothbard'],
        ['The Black Swan', 'Nassim Taleb'],
        ['The Blocksize War', 'Jonathan Bier'],
        ['Reckless: The Story Of Cryptocurrency Interest Rates', 'Jonathan Bier'],
        ['Zero to One', 'Peter Thiel'],
    ], {
        ...this.borderlessTable,
        columns: [ { width: 40 }, { width: 30 } ],
    });

    books =() => `Those are the top picks of my favorite books.
I enjoy reading about philosophy, economics and history.

${this.booksTable()}`;

    /**
     * Execute command
     * @param {string[]} command
     * @returns 
     */
    cmd = (command) => {
        if (!command || command.length === 0) {
            return null;
        }

        const [ arg1 ] = command;
        switch (arg1) {
            case 'help':
                return this.help();
            case 'about':
                return this.about();
            case 'contact':
                return this.contact();
            case 'social':
                return this.social();
            case 'source':
                return this.source();
            case 'books':
                return this.books();
            default:
                return this.notFound(arg1);
        }
    }
}

export default BabbevOS;