# WhatsApp Quiz Bot

A simple WhatsApp quiz bot built with Node.js and [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js).

The bot asks JavaScript questions, checks answers, tracks each user's score, and sends the final result in WhatsApp.

## Table of Contents

- [Features](#features)
- [How the Bot Works](#how-the-bot-works)
- [Requirements](#requirements)
- [Installation](#installation)
- [Run the Bot](#run-the-bot)
- [Connect WhatsApp](#connect-whatsapp)
- [Use the Quiz](#use-the-quiz)
- [Available Commands](#available-commands)
- [Stop the Bot](#stop-the-bot)
- [Run the Bot Again](#run-the-bot-again)
- [Project Structure](#project-structure)
- [Customize Questions](#customize-questions)
- [Troubleshooting](#troubleshooting)
- [Security Notes](#security-notes)
- [Git Commands](#git-commands)
- [License](#license)

## Features

- Starts a quiz when a user sends `quiz` or `start`
- Asks three JavaScript questions
- Accepts answers using option numbers such as `1`, `2`, or `3`
- Tracks a separate score for each WhatsApp user
- Generates a WhatsApp login QR code in `qr.png`
- Saves the WhatsApp login session locally with `LocalAuth`
- Allows users to start a new quiz after finishing

## How the Bot Works

```text
1. Start the Node.js application
2. The bot generates qr.png
3. Scan qr.png using WhatsApp Linked Devices
4. Send quiz or start to the connected WhatsApp account
5. Answer each question with 1, 2, or 3
6. The bot checks the answers and calculates the score
7. The bot sends the final score
```

## Requirements

Before starting, install the following:

- [Node.js](https://nodejs.org/) 18 or newer
- npm, which is included with Node.js
- A WhatsApp account
- A phone with WhatsApp installed
- Windows, macOS, or Linux

Check that Node.js and npm are installed:

```bash
node --version
npm --version
```

Node.js should be version 18 or newer.

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/d3vshivamyadav/whatsapp-quiz-bot.git
```

### Step 2: Open the project directory

```bash
cd whatsapp-quiz-bot
```

### Step 3: Install dependencies

```bash
npm install
```

This installs the packages listed in `package.json`, including:

- `whatsapp-web.js`
- `qrcode`
- `qrcode-terminal`

### Step 4: Check the project files

```bash
ls
```

On Windows Command Prompt, use:

```bat
dir
```

You should see files such as:

```text
bot.js
package.json
package-lock.json
start.bat
```

## Run the Bot

### macOS and Linux

From the project directory, run:

```bash
node bot.js
```

### Windows Command Prompt or PowerShell

```powershell
node bot.js
```

### Windows one-click launcher

You can also run the included Windows launcher:

```bat
start.bat
```

You can run it by double-clicking `start.bat` in File Explorer or by running the command above from Command Prompt.

Keep the terminal window open while the bot is running.

## Connect WhatsApp

The first time you run the bot, follow these steps:

1. Wait for the bot to create `qr.png` in the project folder.
2. Open the `qr.png` image.
3. Open WhatsApp on your phone.
4. Tap **Settings**.
5. Tap **Linked Devices**.
6. Tap **Link a Device**.
7. Unlock your phone if requested.
8. Scan the QR code shown in `qr.png`.
9. Wait for the terminal to show that the bot is ready.

The bot uses `LocalAuth`, so the login session is saved locally. After the first successful login, you may not need to scan the QR code every time.

## Use the Quiz

After the bot is ready, send this message to the connected WhatsApp account:

```text
quiz
```

You can also send:

```text
start
```

The bot will send the first question. Reply with only the option number:

```text
1
```

```text
2
```

or:

```text
3
```

Continue answering until all three questions are complete. The bot then sends your final score, for example:

```text
Quiz Completed!
Your final score is: 2 / 3
```

To play again, send:

```text
quiz
```

## Available Commands

| Message | Description |
|---|---|
| `quiz` | Starts a new quiz |
| `start` | Starts a new quiz |
| `1` | Selects answer option 1 |
| `2` | Selects answer option 2 |
| `3` | Selects answer option 3 |

The answer numbers are used only after a quiz has started.

## Stop the Bot

To stop the bot safely, focus the terminal window and press:

```text
Ctrl + C
```

If Windows asks for confirmation, press `Y` and then `Enter`.

## Run the Bot Again

After stopping the bot, go back to the project folder:

```bash
cd whatsapp-quiz-bot
```

Start it again:

```bash
node bot.js
```

If the saved WhatsApp session is still valid, the bot should reconnect without requiring a new QR scan.

## Project Structure

```text
whatsapp-quiz-bot/
├── bot.js
├── package.json
├── package-lock.json
├── start.bat
├── qr.png                 # Generated QR code; do not commit or share it
├── wwebjs_auth/           # Generated WhatsApp session data; do not commit it
└── node_modules/          # Installed dependencies; do not commit it
```

## Customize Questions

The quiz questions and answers are defined in `bot.js`.

To customize the first question, find the first `message.reply` block and change the question text and options. Then update its correct-answer check:

```javascript
if (text === '2') {
    state.score += 1;
}
```

For example, if option `1` is correct, change it to:

```javascript
if (text === '1') {
    state.score += 1;
}
```

After changing the code:

1. Save `bot.js`.
2. Stop the running bot with `Ctrl + C`.
3. Start it again with `node bot.js`.
4. Send `quiz` to test the changes.

## Troubleshooting

### `node` is not recognized

Install Node.js 18 or newer from the official Node.js website, close and reopen the terminal, and verify:

```bash
node --version
npm --version
```

### `Cannot find module` error

Make sure you are inside the repository directory and install the dependencies again:

```bash
cd whatsapp-quiz-bot
npm install
```

Then start the bot:

```bash
node bot.js
```

### The QR code is not generated

Stop the bot and start it again:

```bash
node bot.js
```

If the session is invalid, stop the bot and remove the generated `wwebjs_auth` folder.

On macOS or Linux:

```bash
rm -rf wwebjs_auth
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force wwebjs_auth
```

On Windows Command Prompt:

```bat
rmdir /s /q wwebjs_auth
```

Then run the bot again and scan the new QR code.

### Chromium or Puppeteer error

Confirm that Node.js 18 or newer is installed. Then reinstall the dependencies.

macOS or Linux:

```bash
rm -rf node_modules
npm ci
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm ci
```

Windows Command Prompt:

```bat
rmdir /s /q node_modules
npm ci
```

### The bot does not respond

Check all of the following:

1. The terminal says the WhatsApp client is ready.
2. You are messaging the WhatsApp account connected to the bot.
3. You sent `quiz` or `start` first.
4. You replied with a valid option number.
5. The `node bot.js` process is still running.
6. Your phone has an active internet connection during login.

### The bot asks for a QR code again

A session can expire or be removed. Scan the new QR code. If necessary, remove `wwebjs_auth` and authenticate again using the commands above.

## Security Notes

- Never share an active WhatsApp QR code.
- Do not commit `wwebjs_auth` or `node_modules`.
- Do not commit personal WhatsApp session files.
- Only automate WhatsApp accounts and chats where you have permission.
- Keep the bot running only on a trusted computer.

Add these generated files to `.gitignore` before pushing code:

```gitignore
node_modules/
wwebjs_auth/
qr.png
```

## Git Commands

Use these commands to save and push README changes:

### Check changed files

```bash
git status
```

### Add the README

```bash
git add README.md
```

### Create a commit

```bash
git commit -m "Improve README with setup and usage guide"
```

### Push to the main branch

```bash
git push origin main
```

If Git asks you to configure your identity, run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## License

This project is licensed under the ISC License.
