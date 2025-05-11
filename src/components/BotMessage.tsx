
import { cn } from "@/lib/utils";
import { Message } from "@/types/telegramTypes";

interface BotMessageProps {
  message: Message;
}

const BotMessage = ({ message }: BotMessageProps) => {
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-lg p-3",
        message.sender === "bot"
          ? "bg-white text-gray-800 shadow-sm self-start"
          : "bg-blue-600 text-white self-end ml-auto"
      )}
    >
      <div className="whitespace-pre-line">{message.text}</div>
      <div
        className={cn(
          "text-xs mt-1",
          message.sender === "bot" ? "text-gray-500" : "text-blue-200"
        )}
      >
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default BotMessage;
