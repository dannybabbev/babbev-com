import { table, getBorderCharacters } from 'table';
import {
    ABOUT_TEXT,
    PROJECTS_BH,
    PROJECTS_BTCS,
    PROJECTS_FP,
    EXPERIENCE_SHORT_CV,
    BOOKS,
    SOCIAL,
    CONTACT,
    SOURCE,
} from '../helpers/os-data';

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

        this.projectsTable = {
            border: getBorderCharacters('ramac'),
            columnDefault: {
                paddingLeft: 0,
                paddingRight: 2,
            },
            columns: [ { width: 25 }, { width: 40 } ],
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
            ['projects', 'projects I have worked on'],
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

    experience = () => table(EXPERIENCE_SHORT_CV, {
            border: getBorderCharacters('ramac'),
    });

    aboutMeText = () => table([[ABOUT_TEXT]], {
        border: getBorderCharacters('void'),
        columns: [ { width: 65 }],
        columnDefault: {
            paddingLeft: 0,
        },
        drawHorizontalLine: () => false,
    }) 

    about = () => `${this.aboutMeText()}\n\nExperience:\n${this.experience()}\n\nTechnologies:\n${this.techExp()}`;

    projectsHelpTable = () => table([
        ['bh', 'Brevan Howard'],
        ['btcs', 'Bitcoin Suisse'],
        ['fp', 'Fair Poker'],
    ], this.borderlessTable);

    projectsHelp = () => `Usage: projects <company>
A list of projects and deliverables I have worked on at each company.

${this.projectsHelpTable()}`;

    projectsBh = () => table(PROJECTS_BH, this.projectsTable);

    projectsBtcs = () => table(PROJECTS_BTCS, this.projectsTable);

    projectsFp = () => table(PROJECTS_FP, this.projectsTable);

    projects = (args) => {
        const [_, company] = args;
        switch (company) {
            case 'bh':
                return this.projectsBh();
            case 'btcs':
                return this.projectsBtcs()
            case 'fp':
                return this.projectsFp();
            default:
                return this.projectsHelp();
        }
    }
    
    contact = () => table(CONTACT, this.borderlessTable);
    
    social = () => table(SOCIAL, this.borderlessTable);
    
    source = () => `${SOURCE}\n`;

    booksTable = () => table(BOOKS, {
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
            case 'projects':
                return this.projects(command);
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