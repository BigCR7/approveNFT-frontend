import botInfo from '../constants/telegramBot.js';

const sendMessage = (text) => {
    const options = {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
        text: text,
        disable_web_page_preview: false,
        disable_notification: false,
        reply_to_message_id: null,
        chat_id: botInfo.chat_id
        })
    };
    console.log("options: ", options)
    fetch(`https://api.telegram.org/${botInfo.bot_token}/sendMessage`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

export default sendMessage;