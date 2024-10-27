import carVersion from "../Models/CarVersion.js";
import Car from "../Models/Car.js";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
const CarVersionScrawler=async()=>{
    //setting browser
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    
    //go to page
    const page=await browser.newPage();
    await page.goto('https://otodien.vn/gia-xe-o-to-dien-vinfast-moi-nhat',{waitUntil:'networkidle2',timeout:60000});
    
    const titles=await page.evaluate(()=>{
        const eles=document.querySelectorAll(`.wp-block-heading`);
        return Array.from(eles).map(ele=>ele.textContent.trim());
    });
    const newTitle=titles.map(title=>{
        const index=title.indexOf('VF');
        var finalStr=title.slice(index);
        finalStr=finalStr.replace('VF','VF ');
        return finalStr; // Trả về chuỗi đã xử lý
    })

   //scrawl data
    const tables=await page.$$('tbody');
    var j=-1;
    for(const table of tables){
        //get the price table
        const firstRow=await table.$('tr');
        const firstCell=await firstRow.$('td');
        const value=await page.evaluate(el=>el.innerText,firstCell);
        if(value==="Nội dung"){
            break;
        }
        
        //scrawl data
        const data=await page.evaluate(table=>{
        const rows=Array.from(table.querySelectorAll('tr'));
        const data= rows.map(row=>{
                return Array.from(row.querySelectorAll('td')).map(cell=>cell.innerText);
        })
        data.shift();
        return data;
        },table);
        
        //data cleaning
        const categorize=async()=>{
            var k=1;
            for(const item of data){
                var verName=item[0];
                verName=verName.replace(/\(.*pin\)/i,"")
                verName=verName.replace(/VinFast /i,"");
                var str=item[item.length-1].replace(/\./g,'');
                str=str.replace(' VNĐ','');
                str=str.replace(/0{6}$/,'');
                var price=parseInt(str);
                const isBaterry=k%2===0?true:false;
                const car=await Car.findOne({name:newTitle[j]+'\r'});
                const newRecord={
                    verName:verName,
                    isBaterry:isBaterry,
                    price:price, 
                    carID:car._id,
                }

                await carVersion.updateOne(
                    {verName:newRecord.verName,isBaterry:newRecord.isBaterry},
                    {$set:newRecord},
                    {upsert:true},
                    )
                    k++;
                }
            }   
            j++;
            await categorize();
        }
        await browser.close();
}
export default CarVersionScrawler;