"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingDown, Users, ArrowRight } from "lucide-react"

export default function FunnelOverview() {
  // Mock funnel data - replace with real data from your analysis
  const funnelData = [
    { step: "View Property", users: 15420, stepConversion: 100, overallConversion: 100, dropOff: 0 },
    { step: "Select Dates", users: 8934, stepConversion: 57.9, overallConversion: 57.9, dropOff: 42.1 },
    { step: "Add Guests", users: 6247, stepConversion: 69.9, overallConversion: 40.5, dropOff: 30.1 },
    { step: "Review Booking", users: 4183, stepConversion: 66.9, overallConversion: 27.1, dropOff: 33.1 },
    { step: "Payment", users: 2456, stepConversion: 58.7, overallConversion: 15.9, dropOff: 41.3 },
    { step: "Booking Confirmed", users: 1897, stepConversion: 77.2, overallConversion: 12.3, dropOff: 22.8 },
  ]

  const funnelChartData = funnelData.map((item, index) => ({
    name: item.step.replace(" ", "\n"),
    value: item.users,
    fill: `hsl(${220 - index * 20}, 70%, ${60 + index * 5}%)`,
  }))

  const userJourneyStats = {
    totalUsers: 15420,
    completedJourney: 1897,
    avgStepsPerUser: 3.2,
    avgJourneyDuration: 24.5,
  }

  return (
    <div className="space-y-6">
      {/* Funnel Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Booking Funnel Description
          </CardTitle>
          <CardDescription>Complete user journey from property viewing to booking confirmation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm">
              {funnelData.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <Badge variant="outline" className="px-3 py-1">
                    {step.step}
                  </Badge>
                  {index < funnelData.length - 1 && <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{userJourneyStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {userJourneyStats.completedJourney.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Completed Journey</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{userJourneyStats.avgStepsPerUser}</p>
                <p className="text-sm text-gray-600">Avg Steps/User</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{userJourneyStats.avgJourneyDuration}m</p>
                <p className="text-sm text-gray-600">Avg Duration</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funnel Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funnel Visualization</CardTitle>
            <CardDescription>User count at each step of the booking process</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Users",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" angle={-45} textAnchor="end" height={100} fontSize={12} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step-by-Step Conversion</CardTitle>
            <CardDescription>Detailed conversion and drop-off rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((step, index) => (
                <div key={step.step} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{step.step}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{step.users.toLocaleString()} users</Badge>
                      {step.dropOff > 0 && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <TrendingDown className="h-3 w-3" />
                          {step.dropOff.toFixed(1)}% drop-off
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={step.overallConversion} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Overall: {step.overallConversion.toFixed(1)}%</span>
                    <span>Step: {step.stepConversion.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
