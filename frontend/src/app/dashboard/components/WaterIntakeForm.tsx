"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { mutate } from "swr";
import { useLogWaterIntake } from "@/lib/api";

export default function WaterIntakeForm() {
  const [amount, setAmount] = useState("");
  const { trigger, isMutating } = useLogWaterIntake();

  const userId = "user1"; // replace this with actual user if needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(+amount) || +amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await trigger({
        userId,
        date: format(new Date(), "yyyy-MM-dd"),
        intakeMl: +amount,
      });

      toast.success("Water logged successfully");
      setAmount("");

      // Revalidate summary data
      mutate(`http://localhost:3001/water-log/summary/${userId}`);
    } catch (error) {
      toast.error("Failed to log water");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-xl w-[400px]"
    >
      <label className="block text-sm font-medium text-gray-700">
        Enter water intake (ml)
      </label>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., 250"
        disabled={isMutating}
      />
      <Button type="submit" disabled={isMutating}>
        {isMutating ? "Logging..." : "Log Intake"}
      </Button>
    </form>
  );
}
