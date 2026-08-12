import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Water Intake Tracker</title>
      </Head>

      {/* NEW: Top-level wrapper for the entire homepage content */}
      <div className="homepage-wrapper">

        {/* Global Header Navigation - now using generic 'main-nav' classes */}
        <nav className="main-nav">
          {/* "Water Intake Tracker" as Logo/Home Link */}
          <Link href="/" legacyBehavior>
            <a className="main-nav-brand">
              💧 Water Intake Tracker
            </a>
          </Link>

          {/* Right-aligned Navigation Links */}
          <div className="main-nav-links">
          <Link href="/" className="active">Home</Link>
          <Link href="/log">Log Intake</Link>
          <Link href="/summary">Summary</Link>
          </div>
        </nav>

        {/* Main Content Area - Homepage Card Centered */}
        <main className="page-center-content">
          {/* !!! REPLACE THIS DIV WITH YOUR ACTUAL HOMEPAGE CONTENT !!! */}
          {/* Ensure your homepage content uses the 'home-' prefixed classes for styling */}
          <div className="home-card">
            <span className="home-logo-icon">💧</span>
            <h1 className="home-title">Welcome to Water Intake Tracker!</h1>
            <p className="home-tagline">Hydrate. Track. Thrive.</p>
            <p className="home-description">
              Log your daily water intake and track your hydration progress with beautiful charts.
            </p>
            <div className="home-button-group">
              <Link href="/log" legacyBehavior>
                <a className="home-btn home-btn-primary">
                  Log Intake
                </a>
              </Link>
              <Link href="/summary" legacyBehavior>
                <a className="home-btn home-btn-secondary">
                  View Summary
                </a>
              </Link>
            </div>
          </div>
          {/* !!! END OF REPLACEABLE HOMEPAGE CONTENT !!! */}
        </main>

        {/* Global Footer */}
        <div className="app-footer">N</div>
      </div> {/* End of homepage-wrapper */}
    </>
  );
}