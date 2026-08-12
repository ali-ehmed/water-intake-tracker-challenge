import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LogPage() {
  const [date, setDate] = useState("");
  const [intakeMl, setIntakeMl] = useState<number | "">("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("idle");

    if (!date) {
      return setError("Date is required");
    }

    if (intakeMl === "" || intakeMl < 0) {
      return setError("Water intake must be 0 or more");
    }

    try {
      const res = await fetch("http://localhost:3001/water-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "test-user",
          date,
          intakeMl,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setStatus("success");
      setDate(""); // clear date
      setIntakeMl(""); // clear intake
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#00563B] py-12 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-sky-700">
            + Log Water Intake
          </h1>
          <Link
            href="/summary"
            className="text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg text-sm font-medium shadow"
          >
            ← View Weekly Summary
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="logDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              id="logDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label
              htmlFor="intake"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Water Intake (ml)
            </label>
            <input
              id="intake"
              type="number"
              value={intakeMl}
              onChange={(e) =>
                setIntakeMl(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="e.g. 1800"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {status === "success" && (
            <p className="text-green-600 text-sm animate-fade-in">
              ✅ Logged successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm">
              ❌ Something went wrong. Try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg font-medium shadow cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
