
const BotTypingIndicator = () => {
  return (
    <div className="bg-white text-gray-800 rounded-lg p-3 max-w-[80%] self-start shadow-sm">
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

export default BotTypingIndicator;
