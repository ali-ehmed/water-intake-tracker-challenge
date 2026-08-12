import { SummaryResponseDTO } from "@/types/summary";

export default function SummaryCard({ summary }: { summary: SummaryResponseDTO }) {
  return (
    <div className="bg-gradient-to-tr from-blue-50 to-white hover:shadow-lg transition duration-300 border border-blue-100 p-4 rounded-2xl space-y-2 w-full sm:w-[300px] md:w-[350px] lg:w-[400px]">
      <p className="text-sm text-gray-500">{new Date(summary.date).toLocaleDateString()}</p>
      <p className="text-xl sm:text-2xl font-bold text-gray-800">{summary.totalIntake} ml</p>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${summary.percentageOfGoal}%` }}
        ></div>
      </div>
      <p className="text-sm text-blue-600 font-medium">{summary.percentageOfGoal}% of goal</p>
    </div>

  );
}
