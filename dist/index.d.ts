import { Action, Plugin } from '@elizaos/core';

declare const helloWorldAction: Action;

declare const sendSmsAction: Action;

declare const index_helloWorldAction: typeof helloWorldAction;
declare const index_sendSmsAction: typeof sendSmsAction;
declare namespace index {
  export { index_helloWorldAction as helloWorldAction, index_sendSmsAction as sendSmsAction };
}

declare const twilioPlugin: Plugin;

export { index as actions, twilioPlugin };
