import { complete } from "@/actions/conversation";

import FormArea from "@/components/FormArea";
import "@/components/functions";

import ConversationManager from "@chatbotkit/react/components/ConversationManager";

export default function Page(): JSX.Element {
  return (
    <main className="h-screen bg-white p-4">
      <ConversationManager endpoint={complete as any}>
        <FormArea />
      </ConversationManager>
    </main>
  );
}
