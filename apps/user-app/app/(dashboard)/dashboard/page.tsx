export default function dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 border-2 w-full  justify-center ">
      <div className="m-10 p-6  ">
        <div className="flex justify-between items-center ">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Add Payment
          </button>
        </div>
        <p className="mt-4 text-gray-700">
          You can manage your payments, view transactions, and update settings
          from the navigation menu on the left.
        </p>
      </div>
    </div>
  );
}
