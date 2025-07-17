"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Target, AlertTriangle, BarChart3, Activity } from "lucide-react"

import FunnelOverview from "@/components/funnel-overview"
import DemographicSnapshot from "@/components/demographic-snapshot"
import DropOffAnalysis from "@/components/dropoff-analysis"
import SegmentAnalysis from "@/components/segment-analysis"
import HypothesesExperiments from "@/components/hypotheses-experiments"
import KeyInsights from "@/components/key-insights"

export default function FunnelAnalysisDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app this would come from your data analysis
  const summaryStats = {
    totalUsers: 15420,
    overallConversionRate: 12.3,
    avgStepsPerUser: 3.2,
    criticalDropOffs: 3,
    totalSessions: 18750,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Booking Funnel Analysis Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of user drop-offs in the booking funnel with actionable insights and experiment
            recommendations
          </p>
        </div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{summaryStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">{summaryStats.overallConversionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Steps/User</p>
                  <p className="text-2xl font-bold">{summaryStats.avgStepsPerUser}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Critical Drop-offs</p>
                  <p className="text-2xl font-bold">{summaryStats.criticalDropOffs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold">{summaryStats.totalSessions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Funnel Overview</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="dropoffs">Drop-off Analysis</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <FunnelOverview />
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <DemographicSnapshot />
          </TabsContent>

          <TabsContent value="dropoffs" className="space-y-6">
            <DropOffAnalysis />
          </TabsContent>

          <TabsContent value="segments" className="space-y-6">
            <SegmentAnalysis />
          </TabsContent>

          <TabsContent value="experiments" className="space-y-6">
            <HypothesesExperiments />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <KeyInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
