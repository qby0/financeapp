const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyDtgbKuAAPKtPeOz27vJcH0JqIPtbxH6G0",
    authDomain: "pennywise-50c4b.firebaseapp.com",
    databaseURL: "https://pennywise-50c4b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pennywise-50c4b",
    storageBucket: "pennywise-50c4b.appspot.com",
    messagingSenderId: "677718301346",
    appId: "1:677718301346:web:b44b38f03919122d0355fb",
    measurementId: "G-YS2SG2378P"
  };

const appFirebase = initializeApp(firebaseConfig);
const database = getDatabase(appFirebase);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/fetch-purchase-info', async (req, res) => {
    const qrCodeData = req.body.qrCodeData;

    if (!qrCodeData) {
        return res.status(400).send({ error: 'QR code data is required' });
    }

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        await page.goto('https://opd.financnasprava.sk/#!/check');

        await page.type('#input-receipt-id', qrCodeData);
        await page.click('#search-button');

        await page.waitForSelector('.receipt-detail-body');
        const result = await page.$eval('.receipt-detail-body', el => el.innerText);

        const obchodneMenoMatch = result.match(/Obchodné meno\s*([^\n]+)/);
        const datumCasVyhotoveniaMatch = result.match(/Dátum a čas vyhotovenia:\s*([^\n]+)/);
        const celkovaSumaDokladuMatch = result.match(/Celková suma dokladu:\s*([^\n]+)/);

        const description = obchodneMenoMatch ? obchodneMenoMatch[1].trim() : null;

        // Разделяем дату и время
        let date = datumCasVyhotoveniaMatch ? datumCasVyhotoveniaMatch[1].trim() : null;
        if (date) {
            date = date.split(' ')[0]; // Оставляем только дату
        }

        // Убираем валюту из суммы
        let cost = celkovaSumaDokladuMatch ? celkovaSumaDokladuMatch[1].trim() : null;
        if (cost) {
            cost = cost.replace('€', '').trim(); // Убираем символ евро
        }

        const purchaseId = Date.now().toString();
        
        const costInfoQr = {
            date: date,
            description: description,
            cost: cost,
            id: purchaseId,
        };

        console.log(costInfoQr);

        
        await set(ref(database, 'purchases/' + purchaseId), costInfoQr)
            .then(() => {
                console.log("Data saved to Firebase");
            })
            .catch((error) => {
                console.error("Error saving data to Firebase:", error); 
            });

        await browser.close();

        res.send({ success: true, data: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ success: false, message: 'Error fetching purchase info' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});