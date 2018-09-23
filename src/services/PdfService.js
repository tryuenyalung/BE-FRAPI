import Efile from './../schemas/Efile'
import _ from 'lodash'
import puppeteer from 'puppeteer'
import {
    debuglog
} from 'util';





async function generatePdf(id, efileContent) {
    // let efileData;

    // findEfileById(id).then( data =>{
    //     efileData = data


    // }).catch( err =>{
    //     console.log(err)
    // })

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let content = unescape( efileContent )

    const css = `<head><link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300" rel="stylesheet"> <style> body{font-family: 'Roboto Condensed', sans-serif; padding: 0.5em;} p{padding: 0 !important;} </style>`
    content = content.replace('<head>', css)

    // page.setContent(content,  { waitUntil: 'networkidle0' })
    await page.goto(`data:text/html,${content}`, {
        waitUntil: 'networkidle0'
    });
    const buffer = await page.pdf({
        format: 'Letter',
        printBackground: true
    });
    await browser.close();
    return buffer;

 




    // try {

    //     const browser = await puppeteer.launch()
    //     const page = await browser.newPage()

    //     await page.setContent("<h1>gago</h1>")

    //     // await page.emulateMedia('screen')

    //    const buffer = await page.pdf({
    //          format: 'A4',
    //         printBackground : true
    //     })
    //     return buffer
    //     // await browser.close()
    //     // process.exit()

    // } catch (e) {
    //     console.log(`pdf service error : ${e}`)
    // }


}

export const downloadPdf = (req, res) => {


    findEfileById(req.params.id).then( data =>{
        
        generatePdf(data._id, data.content).then(byteArr => {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `attachment; filename=${data.name}.pdf`)
            res.status(200).send(byteArr)

        }).catch(err => {
            console.log(err);
            res.status(400).send(err)
        })


    }).catch( err =>{
        res.send(err)
    })


    // generatePdf(efileData._id).then(byteArr => {
    //     res.setHeader('Content-Type', 'application/pdf')
    //     res.setHeader('Content-Disposition', 'attachment; filename=yuen.pdf')
    //     res.status(200).send(byteArr)

    // }).catch(err => {
    //     res.status(400).send("Opps.. something went wrong, please contact the developer")
    // })

    // res.status(200).send( generatePdf() )

}



//read one data
const findEfileById =(id)=> {

    return new Promise((resolve, reject) => {
        
        Efile.findById(id).exec( (err, data) =>{
            if(err){
                reject(null)
            }else{
               return resolve(data) 
            }
        })
      
    })

}//@end