import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 shadow-lg">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-extrabold text-white tracking-tight drop-shadow-lg flex items-center gap-2 hover:text-cyan-200 transition-colors duration-200">
            <span role="img" aria-label="Water drop">💧</span> Water Intake Tracker
          </a>
        </Link>
        <div className="flex gap-12">
          <Link href="/" className="px-3 py-1 text-white font-semibold hover:text-cyan-200 transition-colors duration-200 rounded-md">
            Home
          </Link>
          <Link href="/log" className="px-3 py-1 text-white font-semibold hover:text-cyan-200 transition-colors duration-200 rounded-md">
            Log Intake
          </Link>
          <Link href="/summary" className="px-3 py-1 text-white font-semibold hover:text-cyan-200 transition-colors duration-200 rounded-md">
            Summary
          </Link>
        </div>
      </nav>
    </header>
  );
}