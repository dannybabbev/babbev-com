import Table from 'cli-table';

class BabbevOS {
    getDefaultTable = (cols = [15, 50]) => new Table({
        colWidths: cols,
        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
        , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
        , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
        , 'right': '' , 'right-mid': '' , 'middle': '' },
    });
    
    /**
     * @param {[string[]]} data 
     * @returns {string}
     */
    renderTable = (...data) => {
        const table = this.getDefaultTable();
        table.push(...data);
    
        return table.toString();
    };
    
    help = () => this.renderTable(
        ['babbev.com'],
        [''],
        ['Usage:'],
        ['help', 'this message or help for a specific command'],
        ['about', 'short about me, experience, cv'],
        ['projects', 'projects I\'ve worked on'],
        ['contact', 'contact information'],
        ['social', 'social media links'],
        ['source', 'link to the source code of this app'],
    );
    
    experience = () => {
        const year = new Date().getFullYear();
        const crypto = 2015;
        const js = 2018;
        const go = 2018;
        const python = 2018;
        const docker = 2018;
        const csharp = 2020;

        const expStr = (y) => `${y}+`;

        const table = new Table({ 
            chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
            , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
            , 'left': '' , 'left-mid': '' , 'mid': '─' , 'mid-mid': ''
            , 'right': '' , 'right-mid': '' , 'middle': '│' },
            rows: [
                ['Technology', 'Years'],
                ['Bitcoin/Crypto', expStr(year - crypto)],
                ['JavaScript', expStr(year - js)],
                ['Go', expStr(year - go)],
                ['Python', expStr(year - python)],
                ['Docker', expStr(year - docker)],
                ['C#', expStr(year - csharp)],
            ]
        });

        return table.toString();
    }

    about = () => 
        `Full-stack software enginner with a passion for crypto.\n\n${this.experience()}`;
    
    contact = () => this.renderTable(
        ['Email', 'daniel@babbev.com'],
        ['Telegram', 'danbb_fp'],
    );
    
    social = () => this.renderTable(
        ['GitHub', 'https://github.com/dannybabbev/'],
        ['LinkedIn', 'https://www.linkedin.com/in/danielbabbev/'],
        ['Twitter', 'https://twitter.com/danbb_fp'],
    );
    
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
                return this.help();
        }
    }
}

export default BabbevOS;