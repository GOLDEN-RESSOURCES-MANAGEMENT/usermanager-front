"use client";
import { Input } from "@/components/Field";
import Icon from "@/components/Icon";
import { getData } from "@/libs/fetchData";
import { fetchSuccess } from "@/libs/helper";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default function Page() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const getStat = async () => {
      const { status, data, error } = await getData({
        endpoint: "/statistics",
      });
      if (fetchSuccess(status)) {
        console.log(data);
        setData(data.data);
      }
    };
    getStat();
    console.log("Hello");
  }, []);
  return (
    <div className="space-y-8">
      <div className="">
        <div className="text-4xl font-semibold">Tableau de bord</div>
        <div className="">Bienvue sur le super gestionnaire d'utilisateur</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Card
          title="Utilisateurs total"
          stat={data?.total_users}
          icon={
            <Icon size="md">
              <FaUser />
            </Icon>
          }
        />
        <Card
          title="Nouveaux utilisateurs"
          stat={data?.new_users}
          icon={
            <Icon size="md">
              <FaUser />
            </Icon>
          }
        />
        <Card
          title="Utilisateurs Actifs"
          stat={data?.active_users}
          icon={
            <Icon size="md">
              {" "}
              <FaUser />
            </Icon>
          }
        />
        <Card
          title="Taux de croissance"
          stat="100"
          icon={
            <Icon size="md">
              {" "}
              <FaUser />
            </Icon>
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <LastUser data={data} />
        </div>
        <div className=" bg-white w-full">
          <Example daaaa={data} />
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, stat, icon }) => {
  return (
    <div className=" rounded-xl p-3 space-y-4 bg-white shadow">
      <div className="w-full flex items-center justify-between">
        <div className="">{title}</div>
        <div className="">{icon}</div>
      </div>
      <div className="text-2xl">{stat}</div>
    </div>
  );
};

const LastUser = ({ data }) => {
  return (
    <div className="shadow rounded-xl bg-white p-3">
      <div className="text-2xl font-semibold mb-4">Dernier utilisateur</div>
      {data?.last_users
        ? data.last_users.map((item, index) => (
            <div key={index}>
              <div className="flex w-full justify-between items-center py-2">
                <div className="">
                  <div>{item.name}</div>
                  <div>{item.email}</div>
                </div>
                <div className="">
                  <span
                    className={clsx(
                      item.active
                        ? "text-green-900 bg-green-200"
                        : "text-red-900 bg-red-200",
                      "text-gray-900 bg-gray-200",
                      "text-center  rounded-xl px-3 py-1 text-sm"
                    )}
                  >
                    {item.active ? "active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Example = ({ daaaa }) => {
  const chartData = daaaa?.users_by_month?.map((item) => {
    return {
      name: `${item.month}/${item.year}`, // ex: "09/2024"
      uv: item.count, // tu peux l'appeler uv comme ton modèle
      pv: item.count, // si tu veux comparer deux séries, change ici
      amt: item.count,
    };
  });
  return (
    <div className="shadow rounded-xl bg-white h-full w-full p-3">
      <ResponsiveContainer
        width="100%"
        className={"h-full w-full"}
        height="100%"
      >
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
