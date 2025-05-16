
import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const shifts = ["AM", "PM"];

const staffData = [
  { name: "Jade", nickname: "Dish Queen", role: "Dishwasher", availability: { Thursday: ["AM"], Sunday: ["AM"] } },
  { name: "Zen", nickname: "Silent Zen", role: "Dishwasher", availability: { Monday: ["AM"], Friday: ["PM"] } },
  { name: "Syd", nickname: "Eggspert", role: "Breakfast Cook", availability: { Monday: ["AM"], Friday: ["AM"] } },
  { name: "Connor", nickname: "Pool Boi", role: "Prep/Bar", availability: { Wednesday: ["AM"], Thursday: ["AM"] } },
  { name: "Danny", nickname: "Speedy D", role: "Pool/Breakfast", availability: { Tuesday: ["AM"], Saturday: ["AM"] } },
  { name: "Juan", nickname: "Chill Grill", role: "Pool/Breakfast", availability: { Tuesday: ["AM"], Saturday: ["AM"] } },
];

function generateSmartSchedule(data) {
  const schedule = {};
  data.forEach(member => {
    for (const [day, times] of Object.entries(member.availability)) {
      times.forEach(shift => {
        schedule[day] = schedule[day] || {};
        schedule[day][shift] = schedule[day][shift] || [];
        if (!schedule[day][shift].includes(member.nickname)) {
          schedule[day][shift].push(member.nickname);
        }
      });
    }
  });
  return schedule;
}

export default function FloSchedule() {
  const [autoSchedule, setAutoSchedule] = useState(null);

  const handleGenerate = () => {
    const result = generateSmartSchedule(staffData);
    setAutoSchedule(result);
  };

  return (
    <div className="min-h-screen bg-green-100 p-4">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
        Flo — Flow Like a Kitchen
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Let MEP Fill the Week
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-green-200">Role</th>
              <th className="border px-2 py-1 bg-green-200">Nickname</th>
              {days.map((day) =>
                shifts.map((shift) => (
                  <th key={day + shift} className="border px-2 py-1 bg-green-200">
                    {day} <br /> {shift}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {staffData.map((member, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-2 py-1 bg-green-50">{member.role}</td>
                <td className="border px-2 py-1 bg-green-50">{member.nickname}</td>
                {days.map((day) =>
                  shifts.map((shift) => (
                    <td
                      key={day + shift + idx}
                      className="border px-2 py-1 bg-white hover:bg-green-50"
                    >
                      {autoSchedule?.[day]?.[shift]?.includes(member.nickname) ? "✔" : "—"}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
