import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Your Water Intake Tracker 💧
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Stay hydrated and track your daily water consumption. Log your intake and view your weekly progress.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Log Your Intake</h2>
            <p className="text-gray-600 mb-4">
              Record your daily water consumption in milliliters.
            </p>
            <a
              href="/log"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Log Intake
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">View Summary</h2>
            <p className="text-gray-600 mb-4">
              See your weekly progress and compare against your daily goal.
            </p>
            <a
              href="/summary"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              View Summary
            </a>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Daily Goal</h3>
          <div className="text-3xl font-bold text-blue-600">2,000 ml</div>
          <p className="text-gray-600 mt-2">Stay hydrated for optimal health!</p>
        </div>
      </div>
    </div>
  )
}
