
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

type BotState = 
  | "welcome"
  | "askProductId"
  | "showProduct"
  | "askAddress"
  | "orderConfirmation";

interface Message {
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

interface ActiveOrder {
  productId?: string;
  product?: typeof products[0];
  address?: string;
}

const TelegramBotDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Welcome to E-Ticketing!\nOrder your favorite products easily via Telegram.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [botState, setBotState] = useState<BotState>("welcome");
  const [activeOrder, setActiveOrder] = useState<ActiveOrder>({});
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (text: string, sender: "bot" | "user") => {
    setMessages((prev) => [
      ...prev,
      { text, sender, timestamp: new Date() },
    ]);
  };

  const simulateBotTyping = () => {
    setIsTyping(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, 1000);
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, "user");
    setInputValue("");

    await simulateBotTyping();

    switch (botState) {
      case "welcome":
        // This shouldn't normally happen but is here for safety
        addMessage("🛍️ Please enter the Product ID to see details:\n(Example: P001)", "bot");
        setBotState("askProductId");
        break;

      case "askProductId":
        const product = products.find((p) => 
          p.id.toLowerCase() === userMessage.toLowerCase()
        );

        if (!product) {
          addMessage("⚠️ Invalid Product ID. Please try again.", "bot");
        } else {
          setActiveOrder({ productId: product.id, product });
          const productMessage = `✅ Product Found:\n\n📦 Name: ${product.name}\n🆔 ID: ${product.id}\n💰 Price: ${product.price} BDT\n📄 Description: ${product.description}\n\n📲 Pay using:\n- 🟣 Bkash: 01XXXXXXXXX\n- 🔵 Nagad: 01YYYYYYYYY`;
          addMessage(productMessage, "bot");
          await simulateBotTyping();
          addMessage("📬 Please enter your delivery address to confirm the order:", "bot");
          setBotState("askAddress");
        }
        break;

      case "askAddress":
        if (userMessage.length < 10) {
          addMessage("⚠️ Your address seems incomplete. Please include area and district.", "bot");
        } else {
          setActiveOrder((prev) => ({ ...prev, address: userMessage }));
          const product = activeOrder.product!;
          const confirmationMessage = `✅ Your order has been placed successfully!\n\n📦 Product: ${product.name} (${product.id})\n💰 Amount: ${product.price} BDT\n🏠 Delivery Address: ${userMessage}\n📲 Payment Number: 01XXXXXXXXX (Bkash/Nagad)\n\n🕐 Please complete payment and wait for confirmation.\n📞 We will contact you soon. Thank you!`;
          addMessage(confirmationMessage, "bot");
          await simulateBotTyping();
          addMessage("Would you like to order something else? Type 'Yes' to start again.", "bot");
          setBotState("orderConfirmation");
        }
        break;

      case "orderConfirmation":
        if (userMessage.toLowerCase() === "yes") {
          addMessage("🛍️ Please enter the Product ID to see details:\n(Example: P001)", "bot");
          setActiveOrder({});
          setBotState("askProductId");
        } else {
          addMessage("Thank you for using E-Ticketing! We hope to see you again soon.", "bot");
        }
        break;

      default:
        break;
    }
  };

  const handleStart = async () => {
    await simulateBotTyping();
    addMessage("🛍️ Please enter the Product ID to see details:\n(Example: P001)", "bot");
    setBotState("askProductId");
  };

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
          <div
            key={index}
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
        ))}
        {isTyping && (
          <div className="bg-white text-gray-800 rounded-lg p-3 max-w-[80%] self-start shadow-sm">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
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
    </div>
  );
};

export default TelegramBotDemo;
