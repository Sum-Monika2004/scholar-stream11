import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";

const Analytics = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 🔹 Fetch overall stats
    fetch("http://localhost:3000/admin-stats", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data));

    // 🔹 Fetch application analytics
    fetch("http://localhost:3000/application-stats", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setChartData(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Analytics</h2>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-lg">Total Users</h3>
            <p className="text-3xl font-bold text-primary">
              {stats.totalUsers || 0}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-lg">Total Scholarships</h3>
            <p className="text-3xl font-bold text-secondary">
              {stats.totalScholarships || 0}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-lg">Total Fees Collected</h3>
            <p className="text-3xl font-bold text-success">
              ${stats.totalFees || 0}
            </p>
          </div>
        </div>
      </div>

      {/* ================= Charts ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Applications by University
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="universityName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Applications by Scholarship Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
