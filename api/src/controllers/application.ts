const axios = require('axios');
import {Request, Response} from 'express';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const application= async (req:Request, res:Response) => {

    const { files } = req;
    const { frontSide, backSide } = req.body;

    const image1Buffer = (files as Record<string, Express.Multer.File[]>)['image1'][0].buffer;
    const image2Buffer = (files as Record<string, Express.Multer.File[]>)['image2'][0].buffer;

    try {
        await axios.put(frontSide, image1Buffer,
         {headers: {
            'Accept': 'application/json',
            'Content-Type': 'binary',
            'Truora-API-Key': process.env.API_KEY,
        }});

        await axios.put(backSide,image2Buffer, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'binary',
            'Truora-API-Key': process.env.API_KEY,
        }})

        res.status(200).json({message:'Completed'})
        
    } catch (error:any) {
        res.status(500).json({ error: error})
    }

}

module.exports = application;