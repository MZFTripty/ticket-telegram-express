
import BotMessage from "@/components/BotMessage";
import BotTypingIndicator from "@/components/BotTypingIndicator";
import BotInput from "@/components/BotInput";
import { useTelegramBot } from "@/hooks/useTelegramBot";

const TelegramBotDemo = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    botState,
    isTyping,
    handleSendMessage,
    handleStart
  } = useTelegramBot();

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden bg-gray-100">
      {/* Bot header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xl mr-3">
          E
        </div>
        <div>
          <div className="font-medium">E-Ticketing Bot</div>
          <div className="text-xs text-blue-200">Online</div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <BotMessage key={index} message={message} />
        ))}
        {isTyping && <BotTypingIndicator />}
      </div>

      {/* Input area */}
      <BotInput
        botState={botState}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        handleStart={handleStart}
      />
    </div>
  );
};

export default TelegramBotDemo;
