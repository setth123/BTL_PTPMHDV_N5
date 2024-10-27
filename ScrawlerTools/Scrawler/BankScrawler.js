import InterestRate from "../Models/InterestRate.js"
import chromium from 'chrome-aws-lambda'
import puppeteer from "puppeteer-core";

const BankScrawler = async () => {
    //setting up browser
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    //go to page
    const page = await browser.newPage();
    await page.goto('https://vietnambiz.vn/tim-kiem.htm?keywords=l%C3%A3i%20su%E1%BA%A5t%20vay%20mua%20%C3%B4%20t%C3%B4&zoneid=0&page=1', { 
        waitUntil: 'networkidle2',
        timeout: 60000 
    });
    
    //find latest data
    const lastest=await page.evaluate(()=>{
        const latestNew=document.querySelector('h3.title');
        const latestLink=latestNew.querySelector('a');
        return latestLink.href;
    })

    await page.goto(lastest,{
        waitUntil: 'networkidle2',
        timeout: 60000
    })
    
    //scrawl data
    const rateData=await page.evaluate(()=>{
        const curMonth=new Date().getMonth()+1;
        const cols=['Ngân hàng','Lãi suất ưu đãi kỳ đầu tiên (%/năm)',`Tháng ${curMonth}`,'Tỷ lệ cho vay tối đa (%)','Kỳ hạn vay tối đa (năm)'];

        const table=document.querySelector('table');
        const headerRow=table.querySelector('tr');
        const header=Array.from(headerRow.querySelectorAll('td')).map(td=>td.innerText.trim());
        const columnIndex=cols.map(col=>header.indexOf(col));

        const rows=Array.from(table.querySelectorAll('tr')).slice(2);
        const data=rows.map(row=>{
            const cells=row.querySelectorAll('td');
            let rowData={};
            columnIndex.forEach((index,i)=>{
                rowData[cols[i]]=cells[index]?.innerText.trim();
            })
            return rowData;
        })
        return data.filter(item=>{
            return Object.values(item).filter(value=>value).length>=3;
        })
    })
    
    const curMonth=new Date().getMonth()+1;
    

    //data cleaning
    const updateRate=async()=>{
        for(const item of rateData){
            var rate,percent,term;
            rate = item[`Tháng ${curMonth}`] === '-' ? 0 : Number.parseFloat(item[`Tháng ${curMonth}`].replace(',','.'));
            percent = item['Tỷ lệ cho vay tối đa (%)'] === '-' ? 0 : Number(item['Tỷ lệ cho vay tối đa (%)'].replace(',','.'));
            term = item['Kỳ hạn vay tối đa (năm)'] === '-' ? 0 : Number(item['Kỳ hạn vay tối đa (năm)'].replace(',','.'));
            
            const newRecord={
                BankName:item['Ngân hàng'],
                Rate:rate,
                MaxPercent:percent,
                MaxTerm:term
            }
            await InterestRate.updateOne(
                {BankName:newRecord.BankName},
                {$set:newRecord},
                {upsert:true}
            )
        }
    }
    await updateRate();
    await browser.close();
    
};
export default BankScrawler;
