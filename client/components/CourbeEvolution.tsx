// "use client";
import React from "react";
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { IoStatsChartOutline } from "react-icons/io5";

export default function CourbeEvolution() {
  const data = [
    {
      name: "Jan",
      Returning: 275,
      New: 41,
    },
    {
      name: "Fév",
      Returning: 620,
      New: 96,
    },
    {
      name: "Mar",
      Returning: 202,
      New: 192,
    },
    {
      name: "Avr",
      Returning: 500,
      New: 50,
    },
    {
      name: "Mai",
      Returning: 355,
      New: 400,
    },
    {
      name: "Juin",
      Returning: 875,
      New: 200,
    },
    {
      name: "Juil",
      Returning: 875,
      New: 200,
    },
    {
      name: "Aoû",
      Returning: 875,
      New: 200,
    },
    {
      name: "Sep",
      Returning: 875,
      New: 200,
    },
    {
      name: "Oct",
      Returning: 875,
      New: 200,
    },
    {
      name: "Nov",
      Returning: 875,
      New: 200,
    },
    {
      name: "Déc",
      Returning: 875,
      New: 200,
    },
  ];

  return (
    <div className="col-span-8 overflow-hidden w-full rounded shadow border border-stone-300 bg-white">
      <div className="px-6 py-6">
        <h3 className="flex items-center gap-3 font-medium">
          <IoStatsChartOutline size={24} /> Evolution
        </h3>
      </div>
      <div className="h-64 px-4 relative top-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="New"
              stroke="#18181b"
              fill="#18181b"
            />
            <Line
              type="monotone"
              dataKey="Returning"
              stroke="#5b21b6"
              fill="#5b21b6"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// "use client"

// import { TrendingUp } from "lucide-react"
// import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// export const description = "A line chart with dots"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

// export function Component() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Line Chart - Dots</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Line
//               dataKey="desktop"
//               type="natural"
//               stroke="var(--color-desktop)"
//               strokeWidth={2}
//               dot={{
//                 fill: "var(--color-desktop)",
//               }}
//               activeDot={{
//                 r: 6,
//               }}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
