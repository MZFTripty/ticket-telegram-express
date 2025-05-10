
import { useEffect, useState } from "react";
import TelegramBotDemo from "@/components/TelegramBotDemo";
import BotIntroduction from "@/components/BotIntroduction";
import ProductsTable from "@/components/ProductsTable";

const Index = () => {
  const [activeTab, setActiveTab] = useState("demo");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold">E-Ticketing Telegram Bot</h1>
          <p className="mt-2 text-blue-100">
            A demonstration of a product ordering system via Telegram
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        {/* Tabs */}
        <div className="flex space-x-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("demo")}
            className={`px-4 py-2 font-medium ${
              activeTab === "demo"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Bot Demo
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 font-medium ${
              activeTab === "about"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 font-medium ${
              activeTab === "products"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Products
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === "demo" && <TelegramBotDemo />}
          {activeTab === "about" && <BotIntroduction />}
          {activeTab === "products" && <ProductsTable />}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 E-Ticketing Bot. All rights reserved.</p>
          <p className="text-gray-400 mt-2 text-sm">
            Demo version - Not connected to an actual Telegram Bot
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
