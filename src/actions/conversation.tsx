"use server";

import BotMessage from "@/components/functions/BotMessage";
import EmailInput from "@/components/functions/EmailInput";
import GenericInput from "@/components/functions/GenericInput";
import NameInput from "@/components/functions/NameInput";
import ScaleInput from "@/components/functions/ScaleInput";
import WebsiteInput from "@/components/functions/WebsiteInput";
import YesNoSelectInput from "@/components/functions/YesNo";

import {
  InputMessage,
  streamComplete,
} from "@chatbotkit/react/actions/complete";
import { ChatBotKit } from "@chatbotkit/sdk";

const cbk = new ChatBotKit({
  secret: process.env.CHATBOTKIT_API_SECRET!,
});

const parameters = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: `Write a message to continue the conversation. If the user's input does not match the expected format, inform them and prompt them to provide valid input.`,
    },
  },
  required: ["message"],
};

export async function complete({ messages }: { messages: InputMessage[] }) {
  return streamComplete({
    client: cbk.conversation,

    // The backstory is the heart of the conversation. It provides the context
    // and rules for the conversational AI agent to follow.

    backstory: `You are witty conversational assistant built by ChatBotKit. Your purpose is to collect information from users through an engaging conversation. You have acccess to a number of UI functions to help you with getting information from the user. These function start with the prefix "render". The functions will display interactive form to the user where user input is expected. Always use these functions to get the required information from the user.

    Here are the steps to follow:
    1. To start the conversation, wait for the user to say "start". Once they do, you can begin rendering the renderNameForm.
    2.  Continue with the rest of the 'render' functions provided to you. Use all of them.
    3. At the end of the conversation render the "formComplete" form and point the user to go to https://github.com/chatbotkit/node-sdk for more information on our SDKs
    
    
    Here are the rules you must follow:
    
    - Use the provided functions to render a form and collect information.
    - Show your personality through the conversation with the user.
    - Mix and match the order in which you present the functions to keep the form engaging.
    - If the function is required and the user fails to provide the required information after 2-3 reminders, end the form by running the function 'formComplete'.
    - Use the function 'renderGenericForm' to prompt the user for information that is not covered in a pre-defined form.
    - Always confirm the correctness of the user's input.
    - Failure to follow these rules will result in a penalty!
    
    Remember, your purpose is to create an engaging and helpful conversation experience for the user.`,

    // We allow configuration of the model to be used for the conversation by
    // setting the CHATBOTKIT_MODEL environment variable. The default model is
    // GPT-3.5 Turbo

    model: process.env.CHATBOTKIT_MODEL || "gpt-3.5-turbo",

    messages,

    // Pass a list of functions that the AI agent can call to interact with.

    functions: [
      // This function will be called to render a Name Input.
      {
        name: "renderNameForm",
        description: "Render a form to capture the full name of the person.",
        parameters: parameters,
        handler: async ({ message }, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <NameInput message={message} />,
            result: {
              status: "waiting for user input",
            },
          };
        },
      },

      // This function will be called to capture the name and continue the conversation.
      {
        name: "captureName",
        description: "Capture the name of the person.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
          required: ["name"],
        },
        handler: async ({ name }) => {
          return {
            result: {
              status: name ? "success" : "failure",
              data: {
                name,
              },
            },
          };
        },
      },

      // This function will be called to render an Email Input.
      {
        name: "renderEmailForm",
        description: "Render a form to capture the email of the person.",
        parameters: parameters,
        handler: async ({ message }, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <EmailInput message={message} />,
            result: {
              status: "waiting for user input",
            },
          };
        },
      },

      // This function will be called to capture the email of the user.
      {
        name: "captureEmail",
        description: "Capture the email of the person.",
        parameters: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
          },
          required: ["email"],
        },
        handler: async ({ email }) => {
          return {
            result: {
              status: email ? "success" : "failure",
              data: {
                email,
              },
            },
          };
        },
      },

      // This function will be called to render an Website Input.
      {
        name: "renderWebsiteForm",
        description: "Render a form to capture the website of the person.",
        parameters: parameters,
        handler: async ({ message }, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <WebsiteInput message={message} />,
            result: {
              status: "waiting for user input",
            },
          };
        },
      },

      // This function will be called to capture the website of the user.
      {
        name: "captureWebsite",
        description: "Capture the website of the person.",
        parameters: {
          type: "object",
          properties: {
            website: {
              type: "string",
            },
          },
          required: ["website"],
        },
        handler: async ({ website }) => {
          return {
            result: {
              status: website ? "success" : "failure",
              data: {
                website,
              },
            },
          };
        },
      },

      // This function will be called to render an Generic Input.
      {
        name: "renderGenericForm",
        description:
          "Render a generic form to capture the input of the person.",
        parameters: parameters,
        handler: async ({ message }, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <GenericInput message={message} />,
            result: {
              status: "waiting for user input",
            },
          };
        },
      },

      // This function will be called to capture any information from the Generic Input.
      {
        name: "captureGenericInput",
        description: "Capture the generic input of the person.",
        parameters: {
          type: "object",
          properties: {
            value: {
              type: "string",
            },
          },
          required: ["value"],
        },
        handler: async ({ value }) => {
          return {
            result: {
              status: value ? "success" : "failure",
              data: {
                value,
              },
            },
          };
        },
      },

      // This function will be called to render a Yes/No choice.
      {
        name: "renderYesNoForm",
        description:
          "Render a form to capture a yes or no answer of the person.",
        parameters: parameters,
        handler: async ({ message }, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <YesNoSelectInput message={message} />,
            result: {
              status: "waiting for user input",
            },
          };
        },
      },

      // This function will be called to capture the choice made by the user
      {
        name: "captureYesNo",
        description: "Capture the yes or no answer of the person.",
        parameters: {
          type: "object",
          properties: {
            answer: {
              type: "boolean",
            },
          },
          required: ["answer"],
        },
        handler: async ({ answer }) => {
          return {
            result: {
              data: {
                answer,
              },
            },
          };
        },
      },

      // This function will be called to render a choice between 0-10.
      {
        name: "renderScaleForm",
        description:
          "Render a form to capture a number between 0 and 10 from the person.",
        parameters: parameters,
        handler: async ({ message }, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <ScaleInput message={message} />,
            result: {
              status: "waiting for user input",
            },
          };
        },
      },

      // This function will be called to capture that choice
      {
        name: "captureScale",
        description: "Capture the number between 0 and 10 from the person.",
        parameters: {
          type: "object",
          properties: {
            scale: {
              type: "number",
            },
          },
          required: ["scale"],
        },
        handler: async ({ scale }) => {
          return {
            result: {
              data: {
                scale,
              },
            },
          };
        },
      },

      // This function will be called to end the conversation
      {
        name: "formComplete",
        description:
          "Complete the form with an awesome message thanking the customer",
        parameters: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "A nice fun message to complete the form.",
            },
          },
          required: ["message"],
        },
        handler: async ({ message }, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <BotMessage message={message} />,
          };
        },
      },
    ],
  });
}
