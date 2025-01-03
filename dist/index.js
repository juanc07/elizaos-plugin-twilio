var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/actions/helloWorld.ts
var helloWorldAction = {
  name: "HelloWorld",
  similes: [
    "HELLO"
  ],
  validate: async (_runtime, _message) => {
    return true;
  },
  description: "send hellow world to user",
  handler: async (_runtime, _message, _state, _options, _callback) => {
    const helloWorld = "hello world from agent action!";
    const newState = await _runtime.updateRecentMessageState(
      {
        ..._state,
        helloWorld
      }
    );
    _callback(
      {
        text: helloWorld
      }
    );
    return true;
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "please say hello world" }
      },
      {
        user: "{{user2}}",
        content: { text: "", action: "HELLO_WORLD" }
      }
    ]
  ]
};

// src/actions/sendSms.ts
import twilio from "twilio";
var sendSmsAction = {
  name: "SendSms",
  similes: [
    "SendSms"
  ],
  validate: async (_runtime, _message) => {
    return true;
  },
  description: "Send SMS to the mobile number provided by the user",
  handler: async (_runtime, _message, _state, _options, _callback) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    console.log("CHECK _message: ", _message.content.text);
    if (!accountSid || !authToken) {
      console.error("TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN is not set");
      return false;
    }
    const mobileNumberRegex = /(?:\+|00)(\d{1,3})\s?(\d{3,5})\s?(\d{4,10})/;
    const text = _message.content?.text || "";
    const matches = text.match(mobileNumberRegex);
    const messageRegex = /'([^']+)'/;
    const messageMatch = text.match(messageRegex);
    let mobileNumberProvidedByUser = null;
    let messageToSendFromUser = "Hi, from SoulSparks";
    if (messageMatch) {
      messageToSendFromUser = messageMatch[1];
    }
    if (matches) {
      mobileNumberProvidedByUser = `+${matches[1]}${matches[2]}${matches[3]}`;
    } else {
      const alternativeMobileNumberRegex = /\b(\d{3})[-.]?(\d{3})[-.]?(\d{4})\b/;
      if (!mobileNumberProvidedByUser) {
        const alternativeMatches = text.match(alternativeMobileNumberRegex);
        if (alternativeMatches) {
          mobileNumberProvidedByUser = `${alternativeMatches[1]}${alternativeMatches[2]}${alternativeMatches[3]}`;
        }
      }
    }
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    console.log("check target mobile number: ", mobileNumberProvidedByUser);
    console.log("check messageToSendFromUser: ", messageToSendFromUser);
    console.log("check twilioNumber: ", twilioNumber);
    if (!mobileNumberProvidedByUser) {
      console.error("Mobile number is missing");
      _callback({
        text: `Sorry there was an issue send sms, please try again later`
      });
      return false;
    }
    if (!twilioNumber) {
      console.error("Twilio phone number is missing");
      _callback({
        text: `Sorry there was an issue send sms, please try again later`
      });
      return false;
    }
    try {
      const client = twilio(accountSid, authToken);
      const message = await client.messages.create({
        body: messageToSendFromUser,
        // The message body
        to: mobileNumberProvidedByUser,
        // The recipient's phone number
        from: twilioNumber
        // Your Twilio phone number
      });
      console.log("message body: ", message);
      const messageFromAgent = `SMS sent successfully to ${mobileNumberProvidedByUser}`;
      _callback({
        text: messageFromAgent
      });
      return true;
    } catch (error) {
      console.error("Failed to send SMS:", error);
      _callback({
        text: `Failed to send SMS to ${mobileNumberProvidedByUser}`
      });
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "please send my message via sms to target mobile number" }
      },
      {
        user: "{{user2}}",
        content: { text: "", action: "SEND_SMS" }
      }
    ]
  ]
};

// src/actions/index.ts
var actions_exports = {};
__export(actions_exports, {
  helloWorldAction: () => helloWorldAction,
  sendSmsAction: () => sendSmsAction
});

// src/index.ts
var twilioPlugin = {
  name: "twilio",
  description: "Agent twilio with basic actions and evaluators",
  actions: [
    helloWorldAction,
    sendSmsAction
  ]
};
export {
  actions_exports as actions,
  twilioPlugin
};
//# sourceMappingURL=index.js.map