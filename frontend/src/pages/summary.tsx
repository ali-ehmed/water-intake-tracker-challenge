import SummaryChart from '@/components/SummaryChart';

export default function SummaryPage() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weekly Summary</h1>
      <SummaryChart userId="12" /> {/* hardcoded id use for testing */}
    </div>
  );
}
