"use client";

import { SummaryResponseDTO } from "@/types/summary";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

export default function SummaryChart({ data }: { data: SummaryResponseDTO[] }) {
  const wellDone = useMemo(() => {
    const daysMetGoal = data.filter(day => day.percentageOfGoal >= 100).length;
    return daysMetGoal >= 5;
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full overflow-x-auto bg-white rounded-2xl pb-10 p-4 sm:p-6 shadow-md border border-gray-100"
    >
      {wellDone && (
        <div className="text-green-600 bg-green-100 p-3 rounded-lg mb-4 font-semibold">
          🎉 Well done! You met your goal on 5 or more days!
        </div>
      )}

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
          <Bar
            dataKey="totalIntake"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            barSize={40}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
