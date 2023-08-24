import Table from 'cli-table';

class BabbevOS {
    getTable = () => new Table({
        colWidths: [15, 50],
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
        const table = this.getTable();
        table.push(...data);
    
        return table.toString();
    };
    
    help = () => this.renderTable(
        ['babbev.com'],
        [''],
        ['Usage:'],
        ['help', 'this message or help for a specific command'],
        ['about', 'short about me text'],
        ['cv', 'link to my CV'],
        ['projects', 'projects I\'ve worked on'],
        ['contact', 'contact information'],
        ['social', 'social media links'],
        ['source', 'link to the source code of this app'],
    );
    
    about = () => `Software enginner with a passion for crypto.`;
    
    contact = () => this.renderTable(
        ['Email #1', 'daniel@babbev.com'],
        ['Email #2', 'danbb@pm.me'],
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