import React from "react";
import ChartApp from "../../components/Chart";

export default function Dashboard() {
  return (
    <div className="w-[100vw] h-[80vh] p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to your Payment Dashboard</h1>
      <p className="text-lg text-gray-500 font-serif mb-8">
        Gain insights into your payment activities and track your revenue effortlessly.
      </p>
      <div className="flex flex-col lg:flex-row justify-between w-full h-full items-start">
        <div className="w-full lg:w-2/3 lg:mr-4 h-full">
          <ChartApp />
        </div>
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          {/* Payment summary or other relevant information */}
          <div className="bg-slate-200 p-6 rounded-lg h-full shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700">Total Revenue</p>
              <p className="text-green-600 font-semibold">₹1,00,000</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700">Total Transactions</p>
              <p className="text-blue-600 font-semibold">500</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700">Average Transaction Value</p>
              <p className="text-purple-600 font-semibold">₹1,000</p>
            </div>
            {/* Add more summary information as needed */}
          </div>
          {/* Other widgets or summaries can be added here */}
        </div>
      </div>
    </div>
  );
}
