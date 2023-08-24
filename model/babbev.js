import Table from 'cli-table';

const getTable = () => new Table({
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
const renderTable = (...data) => {
    const table = getTable();
    table.push(...data);

    return table.toString();
};

const help = () => renderTable(
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

const about = () => ` Software enginner with a passion for crypto.`;

const contact = () => renderTable(
    ['Email #1', 'daniel@babbev.com'],
    ['Email #2', 'danbb@pm.me'],
);

const social = () => renderTable(
    ['GitHub', 'https://github.com/dannybabbev/'],
    ['LinkedIn', 'https://www.linkedin.com/in/danielbabbev/'],
    ['Twitter', 'https://twitter.com/danbb_fp'],
);

const source = () => 'https://github.com/dannybabbev/babbev-com';

export default function BabbevExec(command) {
    switch (command) {
        case 'help':
            return help();
        case 'about':
            return about();
        case 'contact':
            return contact();
        case 'social':
            return social();
        case 'source':
            return source();
        default:
            return help();
    }
}