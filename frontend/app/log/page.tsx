"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { logWaterIntake } from "./actions";

export default function LogPage() {
  const [formState, formAction] = useActionState(logWaterIntake, {
    success: false,
    message: "",
  });

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="userId">User ID</Label>
            <Input
              type="number"
              max={"2000"}
              id="userId"
              name="userId"
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              max={
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .split("T")[0]
              }
              name="date"
              required
            />
          </div>

          <div>
            <Label htmlFor="intakeMl">Water Intake (ml)</Label>
            <Input type="number" id="intakeMl" name="intakeMl" required />
          </div>

          <Button type="submit">Submit</Button>

          {formState?.message && (
            <p
              className={formState.success ? "text-green-500" : "text-red-500"}
            >
              {formState.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
