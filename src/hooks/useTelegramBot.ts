
import { useState } from "react";
import { products } from "@/data/products";
import { ActiveOrder, BotState, Message } from "@/types/telegramTypes";

export const useTelegramBot = () => {
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

  return {
    messages,
    inputValue,
    setInputValue,
    botState,
    isTyping,
    handleSendMessage,
    handleStart
  };
};
