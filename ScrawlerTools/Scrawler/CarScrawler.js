import {promises as fs} from 'fs';
import Car from '../Models/Car.js';
import carVersion from '../Models/CarVersion.js';
import path from "path";

const CarScrawler=async()=>{
    const filePath=path.join(__dirname,'..','data','Sổ làm việc1.csv');
    const data=await fs.readFile(filePath,'utf8');
    var rows=data.split('\n');
    rows.shift();
    for(const row of rows){
        if (!row.trim()) continue;
        const columns=row.split(',');
        const carRecord={
            name:columns[11].replace('"',""),
            pictureURL:columns[10],
        }
        const carVerRecord={
            verName:columns[0].replace('"',""),
            length:Number(columns[1]),
            width:Number(columns[2]),
            height:Number(columns[3]),
            weight:Number(columns[4]),
            battery:Number(columns[5]),
            dist:Number(columns[6]),
            maxPower:Number(columns[7]),
            seatsNumber:Number(columns[8]),
            acceleration:Number(columns[9]),
        }
        await Car.updateOne(
            {name:carRecord.name},
            {$set:carRecord},
            {upsert:true},
        )
        await carVersion.updateMany(
            {verName:carVerRecord.verName},
            {$set:carVerRecord},
            {upsert:true}
        )
    }
    console.log("Update successful");
};
export default CarScrawler;