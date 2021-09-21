import axios from 'axios';

const axiosHeaders = {
    headers: {
        'DOCK-API-TOKEN': process.env.API_KEY,
    }
};
const baseUrl = process.env.API_URL;

export default async function handler(req, res) {
    const data = req.body;

    if (req.method !== "POST" || !data) {
        res.status(400);
        return;
    }

    const result = await axios.post(`${baseUrl}/verify/`, data, axiosHeaders);

    res.status(200).json(result.data);
}