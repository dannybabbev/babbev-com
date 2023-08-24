import { table, getBorderCharacters } from 'table';

class BabbevOS {
    constructor() {
        this.borderlessTable = {
            border: getBorderCharacters('void'),
            columnDefault: {
                paddingLeft: 0,
                paddingRight: 0,
            },
            columns: [ { width: 20 }, { width: 50 } ],
            drawHorizontalLine: () => false,
        }
    }

    notFound = () => `Command not found. Type "help" to get started.`;
    
    help = () => table(
        [
            ['babbev.com', ''],
            ['', ''],
            ['Usage:', ''],
            ['help', 'this message or help for a specific command'],
            ['about', 'short about me, experience, cv'],
            ['projects', 'projects I\'ve worked on'],
            ['contact', 'contact information'],
            ['social', 'social media links'],
            ['source', 'link to the source code of this app'],
        ],
        this.borderlessTable,
    );
    
    techExp = () => {
        const year = new Date().getFullYear();
        const crypto = 2015;
        const js = 2018;
        const go = 2018;
        const python = 2018;
        const docker = 2018;
        const csharp = 2020;

        const expStr = (y) => `${y}+`;

        const data = [
            ['Technology', 'Years of experience'],
            ['Bitcoin/Crypto', expStr(year - crypto)],
            ['JavaScript', expStr(year - js)],
            ['Python', expStr(year - python)],
            ['Go', expStr(year - go)],
            ['Docker', expStr(year - docker)],
            ['C#', expStr(year - csharp)],
        ];

        return table(data, {
            border: getBorderCharacters('ramac'),
        });
    }

    experience = () => {
        const data = [
            ['Company', 'Period', 'Position', 'Description'],
            ['Brevan Howard', 'May 2022 - May 2023', 'Risk Strategist', 'Developed a risk management system for the crypto trading desk.'],
            ['Bitcoin Suisse', 'June 2020 - May 2022', 'Crypto Developer', 'Developed the deposit and withdrawal crypto systems'],
            ['Fair Poker', 'June 2018 - June 2021', 'Founder & Develper', 'Developed a full crypto poker platform.'],
        ];

        return table(data, {
            border: getBorderCharacters('ramac'),
        });
    }

    about = () => 
        `My name is Daniel Babbev, currently based in Geneva, Switzerland.
I am a full-stack software enginner with a passion for crypto.
I am expericed in building full crypto systems from scratch. My
approach is to write clean, test-driven code with emphasis on 
security.

Experience:
${this.experience()}

Technologies:
${this.techExp()}`;
    
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

    /**
     * Execute command
     * @param {string} command 
     * @returns 
     */
    cmd = (command) => {
        switch (command) {
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
            default:
                return this.notFound();
        }
    }
}

export default BabbevOS;