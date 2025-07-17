"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Smartphone, Globe, TrendingUp } from "lucide-react"

export default function DemographicSnapshot() {
  // Mock demographic data - replace with real data
  const deviceData = [
    { name: "Desktop", value: 8547, percentage: 55.4, color: "#3B82F6" },
    { name: "Mobile", value: 5234, percentage: 33.9, color: "#10B981" },
    { name: "Tablet", value: 1639, percentage: 10.6, color: "#F59E0B" },
  ]

  const countryData = [
    { name: "Region_1", users: 3421, percentage: 22.2 },
    { name: "Region_2", users: 2876, percentage: 18.7 },
    { name: "Region_3", users: 2234, percentage: 14.5 },
    { name: "Region_4", users: 1987, percentage: 12.9 },
    { name: "Region_5", users: 1654, percentage: 10.7 },
    { name: "Others", users: 3248, percentage: 21.1 },
  ]

  const trafficSourceData = [
    { name: "Organic", users: 6234, percentage: 40.4, conversion: 14.2 },
    { name: "Paid Search", users: 3876, percentage: 25.1, conversion: 11.8 },
    { name: "Social", users: 2543, percentage: 16.5, conversion: 9.3 },
    { name: "Referral", users: 1876, percentage: 12.2, conversion: 15.7 },
    { name: "Direct", users: 891, percentage: 5.8, conversion: 18.9 },
  ]

  return (
    <div className="space-y-6">
      {/* Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Device Distribution
            </CardTitle>
            <CardDescription>User distribution across different device types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                desktop: { label: "Desktop", color: "#3B82F6" },
                mobile: { label: "Mobile", color: "#10B981" },
                tablet: { label: "Tablet", color: "#F59E0B" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {deviceData.map((device) => (
                <div key={device.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                    <span className="text-sm">{device.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {device.value.toLocaleString()} ({device.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Geographic Distribution
            </CardTitle>
            <CardDescription>Top regions by user count</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Users",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Traffic Source Analysis
          </CardTitle>
          <CardDescription>User acquisition channels and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">User Volume by Source</h4>
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficSourceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="users" fill="var(--color-users)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div>
              <h4 className="font-medium mb-4">Conversion Rate by Source</h4>
              <div className="space-y-3">
                {trafficSourceData.map((source) => (
                  <div key={source.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{source.name}</span>
                      <span className="text-sm text-gray-600">{source.conversion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(source.conversion / 20) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{source.users.toLocaleString()} users</span>
                      <span>{source.percentage}% of total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
