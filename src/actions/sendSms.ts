import {
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    type Action,
} from "@elizaos/core";
import twilio from 'twilio';

export const sendSmsAction: Action = {
    name: "SendSms",
    similes: [
        "SendSms"
    ],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description:
        "Send SMS to the mobile number provided by the user",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options:{[key:string]: unknown},
        _callback: HandlerCallback,
    ): Promise<boolean> => {
        // Check if environment variables are set
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        console.log("CHECK _message: ",_message.content.text);

        if (!accountSid || !authToken) {
            console.error('TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN is not set');
            return false;
        }

        // Extract the mobile number from the message
        const mobileNumberRegex = /(?:\+|00)(\d{1,3})\s?(\d{3,5})\s?(\d{4,10})/; // This regex matches numbers like +1 123 4567890 or 001 123 4567890
        const text = (_message.content as { text?: string })?.text || '';
        const matches = text.match(mobileNumberRegex);

        const messageRegex = /'([^']+)'/;
        const messageMatch = text.match(messageRegex);

        let mobileNumberProvidedByUser = null;
        let messageToSendFromUser = 'Hi, from SoulSparks';

        if(messageMatch){
            messageToSendFromUser = messageMatch[1];
        }
        if (matches) {
            // Combine the parts of the number into a single string, removing spaces and plus signs
            mobileNumberProvidedByUser = `+${matches[1]}${matches[2]}${matches[3]}`;
        }else{
            const alternativeMobileNumberRegex = /\b(\d{3})[-.]?(\d{3})[-.]?(\d{4})\b/; // For formats like 123-456-7890 or 123.456.7890
            if (!mobileNumberProvidedByUser) {
                const alternativeMatches = text.match(alternativeMobileNumberRegex);
                if (alternativeMatches) {
                    mobileNumberProvidedByUser = `${alternativeMatches[1]}${alternativeMatches[2]}${alternativeMatches[3]}`;
                }
            }
        }

        const twilioNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

        console.log('check target mobile number: ', mobileNumberProvidedByUser);
        console.log('check messageToSendFromUser: ', messageToSendFromUser);
        console.log('check twilioNumber: ', twilioNumber);

        if (!mobileNumberProvidedByUser) {
            console.error('Mobile number is missing');

            _callback({
                text: `Sorry there was an issue send sms, please try again later`,
            });
            return false;
        }

        if (!twilioNumber) {
            console.error('Twilio phone number is missing');

            _callback({
                text: `Sorry there was an issue send sms, please try again later`,
            });
            return false;
        }

        try {
            // Initialize Twilio client
            const client = twilio(accountSid, authToken);

            // Send the SMS
            const message= await client.messages.create({
                body: messageToSendFromUser, // The message body
                to: mobileNumberProvidedByUser, // The recipient's phone number
                from: twilioNumber, // Your Twilio phone number
            });

            console.log("message body: ", message);

            const messageFromAgent = `SMS sent successfully to ${mobileNumberProvidedByUser}`;

            // Call the callback to notify the user
            _callback({
                text: messageFromAgent,
            });

            return true;
        } catch (error) {
            console.error('Failed to send SMS:', error);
            _callback({
                text: `Failed to send SMS to ${mobileNumberProvidedByUser}`,
            });
            return false;
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "please send my message via sms to target mobile number" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "SEND_SMS" },
            },
        ],
    ] as ActionExample[][],
} as Action;