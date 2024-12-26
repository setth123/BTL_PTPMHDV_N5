import express from "express"
import { getCarVers } from "../services/getCarVer.js"

const getCarVerRouter = express.Router()

getCarVerRouter.get('/carver/:carid', async(req, res) => {
    try {
        const carID = req.params.carid
        const carVers = await getCarVers(carID)
        res.status(200).json(carVers)
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default getCarVerRouter