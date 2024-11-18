const express = require('express');
const puppeteer = require('puppeteer');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const FormData = require('form-data');
const cors = require('cors');
const bodyParser = require('body-parser');

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
const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use(cors());
app.use(bodyParser.json());

// Маршрут для обработки загрузки QR-кода
app.post('/upload', upload.single('qrImage'), async (req, res) => {
    console.log('Received file:', req.file);

    if (!req.file) {
        console.log('No file received');
        return res.status(400).send('No file uploaded');
    }

    const filePath = req.file.path;

    try {
        // Создаем объект FormData
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath)); // Добавляем файл

        // Отправляем запрос на альтернативное API для декодирования QR-кода
        const response = await axios.post('https://api.qrserver.com/v1/read-qr-code/', formData, {
            headers: formData.getHeaders(),
        });

        if (response.data && response.data[0] && response.data[0].symbol[0].data) {
            const qrCodeData = response.data[0].symbol[0].data;
            console.log('Decoded QR Code:', qrCodeData);

            // Теперь, когда у нас есть данные из QR-кода, мы выполняем логику, как в первом случае
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
            let date = datumCasVyhotoveniaMatch ? datumCasVyhotoveniaMatch[1].trim() : null;
            if (date) {
                date = date.split(' ')[0]; // Оставляем только дату
                const [day, month, year] = date.split('.'); // Разделяем по точке
                date = `${day}-${month}-${year}`; // Формируем дату в формате DD-MM-YYYY
            }

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
        } else {
            console.log('No decoded text found in API response');
            res.json({ decodedText: 'No QR code found' });
        }

        // Удаляем временный файл после успешной обработки
        fs.unlinkSync(filePath);

    } catch (error) {
        console.error('Error decoding QR code:', error.message);

        // Удаляем временный файл при ошибке
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).send('Error decoding QR code');
    }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
