"use client";

import { SummaryResponseDTO } from "@/types/summary";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SummaryChart({ data }: { data: SummaryResponseDTO[] }) {
  return (
    <div className="w-full max-w-full overflow-x-auto bg-white rounded-2xl pb-10 p-4 sm:p-6 shadow-md border border-gray-100">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Water Intake Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[0, 2000]} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => `${value} ml`}
            labelFormatter={(label: string) =>
              `Date: ${new Date(label).toLocaleDateString()}`
            }
          />
          <Bar dataKey="totalIntake" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
}
