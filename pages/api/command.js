export default function handler(req, res) {
    const { command } = req.query;
    res.status(200).json({ 
        res: command, 
    });
}