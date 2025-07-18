import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">💧 Water Intake Tracker</h1>
        <p className="text-xl text-gray-600 mb-8">Track your daily hydration and stay healthy!</p>
        
        <div className="space-x-4">
          <Link 
            href="/log" 
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Log Water Intake
          </Link>
          <Link 
            href="/summary" 
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            View Summary
          </Link>
        </div>
      </div>
    </div>
  );
}
