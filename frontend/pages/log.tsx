import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function LogPage() {
  const [date, setDate] = useState('');
  const [intake, setIntake] = useState('');

  // Function to handle form submission
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSuccess('');
  setError('');
  const intakeValue = Number(intake);

  if (!date) {
    setError('Please select a date.');
    return;
  }

  if (isNaN(intakeValue) || intakeValue <= 0) {
    setError('Please enter a valid intake amount (ml).');
    return;
  }

  try {
    const res = await fetch('http://localhost:3001/water-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: "demo-user",
        date,
        intakeMl: intakeValue, // ✅ this must match backend expectation
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to log water intake');
    }

    setSuccess('Water intake logged successfully!');
    setDate('');
    setIntake('');
  } catch (err: any) {
    setError(err.message || 'An error occurred');
  }
};

  return (
    <>
      <Head>
        <title>Log Water Intake | Water Intake Tracker</title>
      </Head>

      {/* NEW: Top-level wrapper for the entire log page content */}
      <div className="log-page-wrapper">

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
          <Link href="/">Home</Link>
          <Link href="/log" className="active">Log Intake</Link>
          <Link href="/summary">Summary</Link>
          </div>
        </nav>

        {/* Main Content Area - Form Card Centered */}
        <main className="page-center-content"> {/* This container will handle vertical and horizontal centering of the card */}
          <div className="log-form-card">
            <h1 className="log-title">Log Water Intake</h1>

            <form className="log-form" onSubmit={handleSubmit} autoComplete="off">
              {/* Date Input Field Group */}
              <div className="log-form-group"> {/* Container for label and input */}
                <label htmlFor="date" className="log-label">
                  Date
                </label>
                <div className="log-input-date-wrapper"> {/* Wrapper for relative positioning of icon */}
                  {/* Calendar Icon (SVG) */}
                  <span className="absolute-icon">
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="16" rx="3" />
                      <path d="M16 3v4M8 3v4M3 9h18" />
                    </svg>
                  </span>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="log-input"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Intake Input Field Group */}
              <div className="log-form-group"> {/* Container for label and input */}
                <label htmlFor="intake" className="log-label">
                  Intake (ml)
                </label>
                <input
                  id="intake"
                  name="intake"
                  type="number"
                  min="0"
                  step="50"
                  placeholder="e.g. 250"
                  className="log-input"
                  value={intake}
                  onChange={e => setIntake(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="log-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </main>

        {/* Global Footer */}
        <div className="app-footer">N</div>
      </div> {/* End of log-page-wrapper */}
    </>
  );
}