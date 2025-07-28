"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../../axios";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

type SummaryItem = {
  date: string; 
  totalIntake: number; 
  day?: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<SummaryItem[]>([]);
  const userId = Cookies.get("userId");
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({ date: "", intakeMl: "" });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await axiosInstance.get(`/water-summary/${userId}`);
        const json = response.data;

        const formatted = json.map((item: SummaryItem) => ({
          ...item,
          day: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
          }),
        }));

        setData(formatted);
      } catch (e: any) {
        const message = e.response?.data?.message || "Something went wrong";
        setError(message);
      }
    }

    if (userId) {
      fetchSummary();
    }
  }, [userId]);

  const handleAddLog = async () => {
    setFormError("");
    if (!form.date || !form.intakeMl) {
      setFormError("All fields are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.post("/water-log", {
        userId,
        date: form.date,
        intakeMl: Number(form.intakeMl),
      });
      setShowDialog(false);
      setForm({ date: "", intakeMl: "" });
      window.location.reload(); 
    } catch (e: any) {
      setFormError(e.response?.data?.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6">Water Intake Summary</h2>
      <div className="flex justify-end">
        <button className="mb-4 px-4 py-2 bg-green-500 cursor-pointer text-white rounded hover:bg-green-900" onClick={() => setShowDialog(true)}>
          Add Water Log
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {data.length === 0 ? (
        <p>There are no logs added yet</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis unit="ml" />
              <Tooltip />
              <ReferenceLine y={2000} stroke="#00B207" strokeDasharray="4 4" label="Goal (2000ml)" />
              <Bar dataKey="totalIntake" fill="#00B207" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-2">Daily Details</h3>
            <table className="w-full text-left border border-gray-200 rounded overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 font-medium">Date</th>
                  <th className="p-2 font-medium">Day</th>
                  <th className="p-2 font-medium">Total Intake</th>
                  <th className="p-2 font-medium">Goal Met</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.date} className="border-t border-gray-100">
                    <td className="p-2">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="p-2">{item.day}</td>
                    <td className="p-2">{item.totalIntake} ml</td>
                    <td className="p-2">{item.totalIntake >= 2000 ? <span className="text-green-600 font-medium">✅ Yes</span> : <span className="text-red-500 font-medium">❌ No</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add Water Log</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Water Intake (ml)</label>
              <input type="number" value={form.intakeMl} onChange={(e) => setForm((prev) => ({ ...prev, intakeMl: e.target.value }))} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 500" />
            </div>

            {formError && <p className="text-red-500 mb-2">{formError}</p>}

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded bg-red-600 text-white cursor-pointer hover:bg-gray-400" onClick={() => setShowDialog(false)} disabled={isSubmitting}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-800" onClick={handleAddLog} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
