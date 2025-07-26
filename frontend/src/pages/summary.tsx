import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

type WaterSummaryItem = {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
};

export default function SummaryPage() {
  const [data, setData] = useState<WaterSummaryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/water-summary/test-user"
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const wellDone = data.filter((d) => d.totalIntake >= 2000).length >= 5;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00563B] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-sky-700">
            💧 Weekly Water Summary
          </h1>
          <Link
            href="/log"
            className="text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg text-sm font-medium shadow"
          >
            + Log Intake
          </Link>
        </div>

        {data.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-20 mb-10">
            No water intake data available.
            <br />
            Start tracking on the{" "}
            <Link href="/log" className="text-sky-600 underline">
              Log page
            </Link>
            .
          </div>
        ) : (
          <>
            {wellDone && (
              <div className="text-green-600 text-center mb-4 font-semibold text-lg">
                🎉 Well done! You met your goal on 5 or more days!
              </div>
            )}
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 3000]} />
                  <Tooltip />
                  <ReferenceLine
                    y={2000}
                    stroke="red"
                    strokeDasharray="5 5"
                    label="Goal"
                  />
                  <Bar
                    dataKey="totalIntake"
                    fill="#0ea5e9" // sky-500
                    radius={[6, 6, 0, 0]}
                    activeBar={{ fill: "#0284c7" }} // sky-600 on hover
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
