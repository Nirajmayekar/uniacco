"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { Smartphone, Globe, TrendingUp } from "lucide-react"

export default function SegmentAnalysis() {
  // Mock segment performance data
  const devicePerformance = [
    {
      device: "Desktop",
      users: 8547,
      conversionRate: 15.2,
      avgSteps: 3.8,
      avgDuration: 28.5,
      dropOffPoints: ["Payment (38%)", "Select Dates (35%)"],
    },
    {
      device: "Mobile",
      users: 5234,
      conversionRate: 8.7,
      avgSteps: 2.6,
      avgDuration: 18.2,
      dropOffPoints: ["Select Dates (52%)", "Add Guests (41%)"],
    },
    {
      device: "Tablet",
      users: 1639,
      conversionRate: 11.3,
      avgSteps: 3.1,
      avgDuration: 22.1,
      dropOffPoints: ["Payment (43%)", "Review Booking (36%)"],
    },
  ]

  const sourcePerformance = [
    {
      source: "Organic",
      users: 6234,
      conversionRate: 14.2,
      avgSteps: 3.5,
      cac: 0,
      ltv: 285,
    },
    {
      source: "Paid Search",
      users: 3876,
      conversionRate: 11.8,
      avgSteps: 3.2,
      cac: 45,
      ltv: 265,
    },
    {
      source: "Social",
      users: 2543,
      conversionRate: 9.3,
      avgSteps: 2.8,
      cac: 32,
      ltv: 220,
    },
    {
      source: "Referral",
      users: 1876,
      conversionRate: 15.7,
      avgSteps: 3.9,
      cac: 15,
      ltv: 310,
    },
    {
      source: "Direct",
      users: 891,
      conversionRate: 18.9,
      avgSteps: 4.1,
      cac: 0,
      ltv: 340,
    },
  ]

  const geoPerformance = [
    { region: "Region_1", users: 3421, conversionRate: 13.8, avgOrderValue: 245 },
    { region: "Region_2", users: 2876, conversionRate: 11.2, avgOrderValue: 198 },
    { region: "Region_3", users: 2234, conversionRate: 14.5, avgOrderValue: 267 },
    { region: "Region_4", users: 1987, conversionRate: 10.8, avgOrderValue: 189 },
    { region: "Region_5", users: 1654, conversionRate: 12.1, avgOrderValue: 223 },
  ]

  const funnelByDevice = [
    { step: "View Property", Desktop: 100, Mobile: 100, Tablet: 100 },
    { step: "Select Dates", Desktop: 65, Mobile: 48, Tablet: 58 },
    { step: "Add Guests", Desktop: 45, Mobile: 28, Tablet: 37 },
    { step: "Review Booking", Desktop: 32, Mobile: 18, Tablet: 24 },
    { step: "Payment", Desktop: 20, Mobile: 11, Tablet: 15 },
    { step: "Confirmed", Desktop: 15.2, Mobile: 8.7, Tablet: 11.3 },
  ]

  return (
    <div className="space-y-6">
      {/* Segment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Best Device</p>
                <p className="text-xl font-bold">Desktop</p>
                <p className="text-sm text-green-600">15.2% conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Best Source</p>
                <p className="text-xl font-bold">Direct</p>
                <p className="text-sm text-green-600">18.9% conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Best Region</p>
                <p className="text-xl font-bold">Region_3</p>
                <p className="text-sm text-green-600">14.5% conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Segment Analysis */}
      <Tabs defaultValue="device" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="device">Device Analysis</TabsTrigger>
          <TabsTrigger value="source">Traffic Source</TabsTrigger>
          <TabsTrigger value="geo">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="device" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Performance Comparison</CardTitle>
                <CardDescription>Conversion rates and user behavior by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    conversionRate: {
                      label: "Conversion Rate",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={devicePerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="device" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="conversionRate" fill="var(--color-conversionRate)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funnel Performance by Device</CardTitle>
                <CardDescription>Step-by-step conversion rates across devices</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    Desktop: { label: "Desktop", color: "#3B82F6" },
                    Mobile: { label: "Mobile", color: "#10B981" },
                    Tablet: { label: "Tablet", color: "#F59E0B" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={funnelByDevice}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="step" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="Desktop" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Mobile" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="Tablet" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device Segment Insights</CardTitle>
              <CardDescription>Detailed analysis of user behavior by device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devicePerformance.map((device) => (
                  <div key={device.device} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-lg">{device.device}</h4>
                      <Badge variant={device.conversionRate > 12 ? "default" : "secondary"}>
                        {device.conversionRate}% conversion
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Users</p>
                        <p className="font-semibold">{device.users.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Avg Steps</p>
                        <p className="font-semibold">{device.avgSteps}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Avg Duration</p>
                        <p className="font-semibold">{device.avgDuration}m</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Top Drop-offs</p>
                        <p className="font-semibold text-xs">{device.dropOffPoints[0]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="source" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Source Performance</CardTitle>
                <CardDescription>Conversion rates by acquisition channel</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    conversionRate: {
                      label: "Conversion Rate",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sourcePerformance} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="source" type="category" width={80} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="conversionRate" fill="var(--color-conversionRate)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
                <CardDescription>Customer acquisition cost vs lifetime value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sourcePerformance.map((source) => (
                    <div key={source.source} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{source.source}</p>
                        <p className="text-sm text-gray-600">{source.users.toLocaleString()} users</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          ROI:{" "}
                          {source.cac > 0 ? `${(((source.ltv - source.cac) / source.cac) * 100).toFixed(0)}%` : "∞"}
                        </p>
                        <p className="text-sm text-gray-600">
                          CAC: ${source.cac} | LTV: ${source.ltv}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Performance Analysis</CardTitle>
              <CardDescription>Regional conversion rates and average order values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer
                  config={{
                    conversionRate: {
                      label: "Conversion Rate",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={geoPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="conversionRate" fill="var(--color-conversionRate)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <div className="space-y-4">
                  <h4 className="font-medium">Regional Performance Summary</h4>
                  {geoPerformance.map((region) => (
                    <div key={region.region} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{region.region}</h5>
                        <Badge variant={region.conversionRate > 13 ? "default" : "secondary"}>
                          {region.conversionRate}% conversion
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Users</p>
                          <p className="font-semibold">{region.users.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Conversion</p>
                          <p className="font-semibold">{region.conversionRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">AOV</p>
                          <p className="font-semibold">${region.avgOrderValue}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
