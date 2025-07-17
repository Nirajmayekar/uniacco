"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { AlertTriangle, TrendingDown, Users, Target } from "lucide-react"

export default function DropOffAnalysis() {
  // Mock drop-off data - replace with real analysis results
  const dropOffData = [
    {
      step: "View Property → Select Dates",
      dropOffRate: 42.1,
      usersLost: 6486,
      severity: "critical",
      potentialRevenue: 324300,
    },
    {
      step: "Select Dates → Add Guests",
      dropOffRate: 30.1,
      usersLost: 2687,
      severity: "high",
      potentialRevenue: 134350,
    },
    {
      step: "Add Guests → Review Booking",
      dropOffRate: 33.1,
      usersLost: 2064,
      severity: "high",
      potentialRevenue: 103200,
    },
    {
      step: "Review Booking → Payment",
      dropOffRate: 41.3,
      usersLost: 1727,
      severity: "critical",
      potentialRevenue: 86350,
    },
    {
      step: "Payment → Booking Confirmed",
      dropOffRate: 22.8,
      usersLost: 559,
      severity: "medium",
      potentialRevenue: 27950,
    },
  ]

  const funnelProgressData = [
    { step: "View Property", users: 15420, cumulativeDropOff: 0 },
    { step: "Select Dates", users: 8934, cumulativeDropOff: 42.1 },
    { step: "Add Guests", users: 6247, cumulativeDropOff: 59.5 },
    { step: "Review Booking", users: 4183, cumulativeDropOff: 72.9 },
    { step: "Payment", users: 2456, cumulativeDropOff: 84.1 },
    { step: "Booking Confirmed", users: 1897, cumulativeDropOff: 87.7 },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const totalPotentialRevenue = dropOffData.reduce((sum, item) => sum + item.potentialRevenue, 0)

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Critical Drop-offs Identified:</strong> Two major drop-off points are causing significant revenue
          loss. Immediate action recommended for View Property → Select Dates (42.1% drop-off) and Review Booking →
          Payment (41.3% drop-off).
        </AlertDescription>
      </Alert>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Highest Drop-off</p>
                <p className="text-2xl font-bold text-red-600">42.1%</p>
                <p className="text-xs text-gray-500">View → Select Dates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Total Users Lost</p>
                <p className="text-2xl font-bold text-orange-600">13,523</p>
                <p className="text-xs text-gray-500">Across all steps</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Potential Revenue</p>
                <p className="text-2xl font-bold text-green-600">${(totalPotentialRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500">If drop-offs reduced</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Critical Points</p>
                <p className="text-2xl font-bold text-red-600">2</p>
                <p className="text-xs text-gray-500">Require immediate action</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Progression Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Funnel Progression & Cumulative Drop-offs</CardTitle>
          <CardDescription>User retention and cumulative drop-off rates throughout the funnel</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: {
                label: "Users Remaining",
                color: "hsl(var(--chart-1))",
              },
              dropOff: {
                label: "Cumulative Drop-off %",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={funnelProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" angle={-45} textAnchor="end" height={100} fontSize={12} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  fill="var(--color-users)"
                  fillOpacity={0.3}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulativeDropOff"
                  stroke="var(--color-dropOff)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-dropOff)", strokeWidth: 2, r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Drop-off Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Drop-off Analysis</CardTitle>
          <CardDescription>Step-by-step breakdown of user drop-offs and potential impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dropOffData.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{item.step}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getSeverityColor(item.severity)}>{item.severity.toUpperCase()}</Badge>
                      <span className="text-sm text-gray-600">{item.usersLost.toLocaleString()} users lost</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{item.dropOffRate}%</p>
                    <p className="text-sm text-gray-600">Drop-off Rate</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Users Lost</p>
                    <p className="text-lg font-semibold">{item.usersLost.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Potential Revenue</p>
                    <p className="text-lg font-semibold">${item.potentialRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Priority Level</p>
                    <p className="text-lg font-semibold capitalize">{item.severity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
