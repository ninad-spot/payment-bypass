import express from 'express'
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express()

app.use(express.json())

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'paymentStatus.txt');

app.post('/payment/check-status', async (req, res) => {
    const  { amount } = req.body
    let data;
    while (true) {
        data = await readFile(filePath, 'utf8');
        if (data === 'success') break;
        await delay(1000);
    }
    const updatedContent = 'pending';
    await writeFile(filePath, updatedContent, 'utf8');
    return res.json({ message: "Payment Successful" })
})

app.post('/payment/pay-now', async (req, res) => {
    const  { amount } = req.body
    const data = await readFile(filePath, 'utf8');
    const updatedContent = 'success';
    await writeFile(filePath, updatedContent, 'utf8');
    return res.json({ message: "Payment Successful" })
})



app.listen(4090, () => console.log("App running on PORT 5090"))