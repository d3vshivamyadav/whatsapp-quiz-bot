# WhatsApp Quiz Bot

A simple WhatsApp quiz bot built with Node.js and [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js).

The bot asks JavaScript questions, checks answers, tracks each user's score, and displays the final result.

## Features

- Starts a quiz with `quiz` or `start`
- Asks three JavaScript questions
- Checks answers and tracks scores per user
- Generates a WhatsApp login QR code in `qr.png`
- Lets users restart the quiz after completion
- Stores WhatsApp authentication locally with `LocalAuth`

## Requirements

- Node.js 18 or newer
- npm
- A WhatsApp account
- Windows users can use the included `start.bat` launcher

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/d3vshivamyadav/whatsapp-quiz-bot.git
cd whatsapp-quiz-bot
npm install
```

## Running the Bot

Start the bot with:

```bash
node bot.js
```

On Windows, you can also double-click `start.bat` or run:

```bat
start.bat
```

When the bot starts for the first time:

1. Wait for the `qr.png` file to be generated.
2. Open WhatsApp on your phone.
3. Go to **Settings → Linked Devices**.
4. Select **Link a Device**.
5. Scan the QR code from `qr.png`.
6. Wait until the terminal reports that the bot is ready.

Keep the terminal window open while you want the bot to receive messages.

## How to Use the Quiz

Send one of these messages to the connected WhatsApp account:

```text
quiz
```

or:

```text
start
```

Then reply to each question with the option number, such as `1`, `2`, or `3`.

After the third question, the bot sends the final score. Send `quiz` again to start a new game.

## Project Structure

```text
whatsapp-quiz-bot/
├── bot.js
├── package.json
├── package-lock.json
├── start.bat
└── qr.png              # Generated after the bot requests authentication
```

## Configuration

The bot uses the following configuration in `bot.js`:

- `LocalAuth` saves the WhatsApp session locally.
- Puppeteer runs in headless mode.
- `--no-sandbox` and `--disable-setuid-sandbox` help Chromium run in some environments.

To change the quiz questions or correct answers, edit the message-handling logic in `bot.js`.

## Troubleshooting

### QR code is not generated

Stop the bot and run it again:

```bash
node bot.js
```

If the saved WhatsApp session is invalid, remove the local `wwebjs_auth` directory and authenticate again.

### Chromium or Puppeteer fails to start

Confirm that Node.js 18 or newer is installed, then reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows, delete `node_modules` and `package-lock.json` manually before running `npm install` again.

### The bot does not respond

- Confirm that the terminal says the bot is ready.
- Make sure the message is sent to the linked WhatsApp account.
- Start a quiz with `quiz` or `start`.
- Keep `node bot.js` running.

## Security Notes

- Never share `qr.png` while it contains an active login QR code.
- Do not commit the `wwebjs_auth` directory or WhatsApp session files.
- Use this bot only with accounts and chats where you have permission to automate messages.

## License

This project is licensed under the ISC License.
