import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { getTransactions } from "../api/transaction";
import { useAuthStore } from "../store/authStore";

const COLORS = ["#ed7f19", "#eae3e3", "#eddf19", "#84e0ee", "#FF6B6B"];

export default function CategoryDonutChart() {
  const { accessToken } = useAuthStore();
  const [typeFilter, setTypeFilter] = useState("expense");
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getTransactions(accessToken);
      const agg = {};
      res.data.forEach((t) => {
        if (t.type !== typeFilter) return;
        const name = t.category.name;
        agg[name] = (agg[name] || 0) + t.amount;
      });
      setData(Object.entries(agg).map(([name, value]) => ({ name, value })));
    })();
  }, [accessToken, typeFilter]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-white text-lg font-medium mb-2">
          Category Distribution Chart
        </div>
        <div className="relative inline-block text-left">
          <div className="mb-4 flex justify-end">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border p-1 bg-[#2E3137] rounded"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <PieChart width={350} height={250}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="flex flex-wrap justify-center mt-4 text-sm text-gray-300 gap-x-6 gap-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
}
