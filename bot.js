const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');

// Purana session hata do taaki naya QR code bina error ke ban sake
if (fs.existsSync('./wwebjs_auth')) {
    console.log('Purana session mil gaya, naya QR code generate ho raha hai...');
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const userStates = {};

client.on('qr', (qr) => {
    qrcode.toFile('qr.png', qr, { width: 300 }, (err) => {
        if (err) {
            console.error('QR code save karne mein error aaya:', err);
        } else {
            console.log('\n==================================================');
            console.log('📱 QR CODE READY! Folder mein "qr.png" khol kar scan karein.');
            console.log('==================================================\n');
        }
    });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Quiz Bot online aur ready hai!');
});

client.on('message', async (message) => {
    const sender = message.from;
    const text = message.body.trim().toLowerCase();

    if (!userStates[sender]) {
        userStates[sender] = { step: 0, score: 0 };
    }

    let state = userStates[sender];

    if (text === 'quiz' || text === 'start') {
        state.step = 1;
        state.score = 0;
        await message.reply(
            "🧠 *Welcome to the WhatsApp Quiz!*\n\n" +
            "Question 1: What is the default file extension for JavaScript files?\n" +
            "1️⃣ .java\n" +
            "2️⃣ .js\n" +
            "3️⃣ .script\n\n" +
            "*(Reply with just the number)*"
        );
        return;
    }

    if (state.step === 1) {
        if (text === '2') {
            state.score += 1;
            await message.reply("✅ Correct!\n\n");
        } else {
            await message.reply("❌ Incorrect. Correct answer was 2️⃣ (.js).\n\n");
        }

        state.step = 2;
        await message.reply(
            "Question 2: Which keyword is used to declare a variable in modern JavaScript (ES6)?\n" +
            "1️⃣ var\n" +
            "2️⃣ variable\n" +
            "3️⃣ let\n\n" +
            "*(Reply with just the number)*"
        );
    } 
    else if (state.step === 2) {
        if (text === '3') {
            state.score += 1;
            await message.reply("✅ Correct!\n\n");
        } else {
            await message.reply("❌ Incorrect. Correct answer was 3️⃣ (let).\n\n");
        }

        state.step = 3;
        await message.reply(
            "Question 3: Which Node.js package manager command is used to install dependencies?\n" +
            "1️⃣ npm run\n" +
            "2️⃣ npm install\n" +
            "3️⃣ npm update\n\n" +
            "*(Reply with just the number)*"
        );
    } 
    else if (state.step === 3) {
        if (text === '2') {
            state.score += 1;
            await message.reply("✅ Correct!\n\n");
        } else {
            await message.reply("❌ Incorrect. Correct answer was 2️⃣ (npm install).\n\n");
        }

        await message.reply(
            `🎉 *Quiz Completed!*\n\n` +
            `Your final score is: *${state.score} / 3*\n\n` +
            `Type 'quiz' anytime to play again!`
        );

        state.step = 0;
    }
});

client.initialize();