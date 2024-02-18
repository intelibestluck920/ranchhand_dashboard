const twilio = require('twilio');
require('dotenv').config();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

// const TWILIO_ACCOUNT_SID = "AC1357443a04001311528ef00b80459576";
// const TWILIO_AUTH_TOKEN = "e01cd83e89b95afbedc2d85c0ad157ad";
// const TWILIO_PHONE_NUMBER = "17809825081";

// console.log("hello", TWILIO_ACCOUNT_SID);

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.sendSMS = async (req, res) => {
    // const { phonenumber } = req.body;

    // if (!phonenumber) {
    //     return res.status(400).json({ error: 'Phone number and channel are required' });
    // }

    try {
        const message = await client.messages.create({
            body: 'Sent SMS',
            from: TWILIO_PHONE_NUMBER,
            to: '+17809825081',
        });
        console.log('SMS sent successfully: ', message.sid);
        res.status(200).json({ message: 'SMS sent successfully', messageId: message.sid });
    } catch (err) {
        console.error('Error sending SMS: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
}

exports.sendSMSWithData = async (req, res) => {
    const { id, temperature } = req.body;

    // if (!phonenumber) {
    //     return res.status(400).json({ error: 'Phone number and channel are required' });
    // }

    try {
        const message = await client.messages.create({
            body: `${id}'s temperature is ${temperature}`,
            from: TWILIO_PHONE_NUMBER,
            to: '+17809825081',
        });
        console.log('SMS sent successfully: ', message.body);
        res.status(200).json({ message: 'SMS sent successfully', messageId: message.sid });
    } catch (err) {
        console.error('Error sending SMS: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
}