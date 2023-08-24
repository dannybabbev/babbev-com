import BabbevOS from '../../model/os';

export default function handler(req, res) {
    const { command } = req.query;

    const os = new BabbevOS();

    const out = os.cmd(command);

    res.status(200).json({ 
        result: out, 
    });
}