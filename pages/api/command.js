import BabbevOS from '../../model/os';

export default function handler(req, res) {
    const { command } = req.query;
    if (!command) {
        return res.status(400).json({
            error: 'No command provided',
        });
    }

    const os = new BabbevOS();

    const out = os.cmd(command);

    res.status(200).json({ 
        result: out, 
    });
}