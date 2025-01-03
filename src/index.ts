import { Plugin } from "@elizaos/core";
import { helloWorldAction } from "./actions/helloWorld.ts";
import { sendSmsAction } from "./actions/sendSms.ts";
import { sendWhatsAppMessageAction } from "./actions";
export * as actions from "./actions";

export const twilioPlugin: Plugin = {
    name: "twilio",
    description: "twilio implementation send sms and send whatspap message",
    actions: [        
        sendSmsAction,
        sendWhatsAppMessageAction,
    ]
};
