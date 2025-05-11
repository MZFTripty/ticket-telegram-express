
import { Separator } from "@/components/ui/separator";

const BotIntroduction = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">About E-Ticketing Bot</h2>
        <p className="mt-2 text-gray-600">
          E-Ticketing is a Telegram bot designed to simplify the process of ordering products online.
          It enables customers to inquire about products, view details, make payments, and complete purchases
          all within the Telegram messaging app.
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-semibold text-gray-800">How It Works</h3>
        <ol className="mt-4 space-y-4 list-decimal list-inside text-gray-600">
          <li className="pl-2">
            <span className="font-medium text-blue-600">Start the Bot</span>
            <p className="mt-1 pl-6">
              Search for "E-Ticketing" on Telegram and press Start to begin the conversation.
            </p>
          </li>
          <li className="pl-2">
            <span className="font-medium text-blue-600">Enter Product ID</span>
            <p className="mt-1 pl-6">
              Type the ID of the product you're interested in (e.g., P001).
            </p>
          </li>
          <li className="pl-2">
            <span className="font-medium text-blue-600">Review Product Details</span>
            <p className="mt-1 pl-6">
              The bot will display information about the product, including name, description, price, 
              and payment instructions.
            </p>
          </li>
          <li className="pl-2">
            <span className="font-medium text-blue-600">Provide Delivery Address</span>
            <p className="mt-1 pl-6">
              Enter your full address where you'd like the product to be delivered.
            </p>
          </li>
          <li className="pl-2">
            <span className="font-medium text-blue-600">Complete Payment</span>
            <p className="mt-1 pl-6">
              Send payment to the provided Bkash or Nagad number and wait for confirmation.
            </p>
          </li>
          <li className="pl-2">
            <span className="font-medium text-blue-600">Receive Your Order</span>
            <p className="mt-1 pl-6">
              Our team will process your order and arrange delivery to your specified address.
            </p>
          </li>
        </ol>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-semibold text-gray-800">Technical Architecture</h3>
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <ul className="space-y-2 text-gray-600">
            <li><span className="font-medium">Platform:</span> Telegram Bot</li>
            <li><span className="font-medium">Backend:</span> Node.js with Express</li>
            <li><span className="font-medium">Bot Framework:</span> Telegraf.js</li>
            <li><span className="font-medium">Database:</span> JSON storage (can be upgraded to MongoDB/MySQL)</li>
          </ul>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-semibold text-gray-800">Future Enhancements</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="font-medium text-blue-800">Admin Dashboard</p>
            <p className="text-sm text-blue-600 mt-1">Web interface for order management</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="font-medium text-blue-800">Payment Verification</p>
            <p className="text-sm text-blue-600 mt-1">Automated payment tracking and validation</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="font-medium text-blue-800">Order Tracking</p>
            <p className="text-sm text-blue-600 mt-1">Real-time delivery status updates</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="font-medium text-blue-800">Multilingual Support</p>
            <p className="text-sm text-blue-600 mt-1">Bot interactions in multiple languages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotIntroduction;
