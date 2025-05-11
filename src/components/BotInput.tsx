
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BotState } from "@/types/telegramTypes";

interface BotInputProps {
  botState: BotState;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleStart: () => void;
}

const BotInput = ({ 
  botState, 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleStart 
}: BotInputProps) => {
  return (
    <div className="bg-white p-3 border-t flex gap-2">
      {botState === "welcome" ? (
        <Button 
          onClick={handleStart} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          🔰 Start Order
        </Button>
      ) : (
        <>
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </>
      )}
    </div>
  );
};

export default BotInput;
