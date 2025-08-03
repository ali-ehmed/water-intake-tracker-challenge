"use server";

import axios from "@/lib/axios";

export async function logWaterIntake(prevState: any, formData: FormData) {
  const userId = formData.get("userId")?.toString() || "";
  const date = formData.get("date")?.toString() || ("" as string);
  const intakeMl = parseInt(formData.get("intakeMl") as string, 10);

  try {
    await axios.post("water-log", {
      userId,
      date,
      intakeMl,
    });

    return {
      success: true,
      message: "Water intake logged successfully!",
    };
  } catch (err: any) {
    console.log("err: ", err);
    return {
      success: false,
      message: err.response?.data?.message || "Failed to log water intake",
    };
  }
}
