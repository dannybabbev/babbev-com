import babbevExec from '../../model/babbev';

export default function handler(req, res) {
    const { command } = req.query;
    if (!command) {
        return res.status(400).json({
            error: 'No command provided',
        });
    }

    const out = babbevExec(command);

    res.status(200).json({ 
        result: out, 
    });
}