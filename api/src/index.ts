const routes= require('./routes/index');
const express= require('express') ;
const {Express}= require('express')
import { Response, NextFunction} from 'express';
const app = express();
const port = 5000;

app.use(express.json());

app.use((_req:any, res:Response, next:NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true'); 
  next(); 
});


app.use('/', routes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
