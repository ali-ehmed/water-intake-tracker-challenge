"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { WaterSummary } from "@/types/water-summary";
import empty from "@/public/empty.gif";
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
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { TooltipProps } from "recharts";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import Image from "next/image";

function CustomTooltip(props: TooltipProps<ValueType, NameType>) {
  const { active } = props;
  const label = (props as { label?: string | number }).label;
  const payload = (props as any).payload as any[] | undefined;
  if (active && payload && payload.length) {
    const { totalIntake, percentageOfGoal } = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow-md">
        <p className="font-semibold">{label}</p>
        <p>Total Intake: {totalIntake} ml</p>
        <p>Goal: {percentageOfGoal}%</p>
      </div>
    );
  }
  return null;
}

export default function SummaryPage() {
  const [data, setData] = useState<WaterSummary[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setHasMounted(true), []);

  const fetchSummary = async () => {
    if (!userId.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.get<WaterSummary[]>(`/water-summary/${userId}`);
      setData(res.data);
    } catch {
      setError("Unable to fetch water summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const meetsGoalCount = data.filter((d) => d.totalIntake >= 2000).length;
  const wellDone = meetsGoalCount >= 5;

  return (
    <Card className="max-w-4xl mx-auto mt-10 p-4 shadow-2xl">
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchSummary();
          }}
        >
          <Label htmlFor="userId">User ID</Label>
          <div className="flex gap-2 mb-4">
            <Input
              id="userId"
              placeholder="Enter user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              inputMode="numeric"
              maxLength={10}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Fetch Summary"}
            </Button>
          </div>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {hasMounted && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                label={{ value: "ml", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="totalIntake"
                fill="lightblue"
                animationEasing="ease-out"
                isAnimationActive
                animationDuration={800}
              />
              <ReferenceLine
                y={2000}
                label={{
                  value: "Goal (2000ml)",
                  position: "top",
                  fill: "red",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
                stroke="red"
                strokeDasharray="3 3"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <Image src={empty} alt="empty" />
            <h4 className="font-bold">No Data Found</h4>
          </div>
        )}

        {wellDone && (
          <p className="text-green-600 font-semibold text-lg mt-4">
            🎉 Well done! You've met your goal for {meetsGoalCount} days!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
