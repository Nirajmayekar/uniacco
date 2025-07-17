"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Users,
  Smartphone,
  DollarSign,
  Clock,
  BarChart3,
} from "lucide-react"

export default function KeyInsights() {
  const keyFindings = [
    {
      type: "critical",
      icon: AlertTriangle,
      title: "Massive Drop-off at Date Selection",
      description:
        "42.1% of users abandon the funnel when selecting dates, representing the largest single point of user loss.",
      impact: "6,486 users lost",
      recommendation: "Immediate mobile calendar optimization and price transparency implementation",
    },
    {
      type: "critical",
      icon: TrendingDown,
      title: "Payment Process Friction",
      description: "41.3% drop-off at payment stage indicates significant friction in the checkout process.",
      impact: "1,727 users lost",
      recommendation: "Implement guest checkout and streamline payment form",
    },
    {
      type: "high",
      icon: Smartphone,
      title: "Mobile Experience Gap",
      description: "Mobile users convert at 8.7% vs 15.2% on desktop, indicating poor mobile optimization.",
      impact: "43% lower conversion",
      recommendation: "Mobile-first redesign of critical funnel steps",
    },
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "High-Value Traffic Sources",
      description: "Direct and referral traffic show highest conversion rates (18.9% and 15.7% respectively).",
      impact: "Premium user segments",
      recommendation: "Increase investment in referral programs and brand building",
    },
  ]

  const segmentInsights = [
    {
      segment: "Device Performance",
      insights: [
        "Desktop users complete 46% more steps on average",
        "Mobile drop-off is highest at date selection (52% vs 35% desktop)",
        "Tablet users show middle-ground performance but still underperform desktop",
      ],
    },
    {
      segment: "Geographic Patterns",
      insights: [
        "Region_3 shows highest conversion rate (14.5%) and AOV ($267)",
        "Region_4 has lowest conversion (10.8%) despite significant user volume",
        "Geographic performance varies by 35% between best and worst regions",
      ],
    },
    {
      segment: "Traffic Quality",
      insights: [
        "Organic traffic provides best volume-to-conversion balance",
        "Social traffic has lowest conversion (9.3%) but high volume",
        "Direct traffic shows highest intent with 18.9% conversion rate",
      ],
    },
  ]

  const actionableRecommendations = [
    {
      priority: "Immediate (Week 1-2)",
      actions: [
        "Launch A/B test for simplified date selection interface",
        "Implement mobile-optimized calendar with larger touch targets",
        "Add price transparency during date selection process",
      ],
    },
    {
      priority: "Short-term (Week 3-8)",
      actions: [
        "Deploy streamlined payment process with guest checkout",
        "Add multiple payment methods (PayPal, Apple Pay, Google Pay)",
        "Implement comprehensive mobile experience audit and fixes",
      ],
    },
    {
      priority: "Medium-term (Month 2-3)",
      actions: [
        "Develop region-specific optimization strategies",
        "Create referral program to leverage high-converting traffic",
        "Implement advanced personalization based on device and source",
      ],
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-red-600 bg-red-100"
      case "high":
        return "text-orange-600 bg-orange-100"
      case "opportunity":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    if (priority.includes("Immediate")) return "border-red-200 bg-red-50"
    if (priority.includes("Short-term")) return "border-orange-200 bg-orange-50"
    return "border-blue-200 bg-blue-50"
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Alert className="border-blue-200 bg-blue-50">
        <BarChart3 className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Executive Summary:</strong> Analysis reveals two critical drop-off points causing 87.7% user loss.
          Implementing proposed experiments could increase overall conversion from 12.3% to 15-18%, representing $70K+
          in additional monthly revenue.
        </AlertDescription>
      </Alert>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Key Findings & Critical Issues</CardTitle>
          <CardDescription>Most impactful insights from the funnel analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keyFindings.map((finding, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getTypeColor(finding.type)}`}>
                    <finding.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{finding.title}</h4>
                    <p className="text-gray-600 mt-1">{finding.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {finding.impact}
                      </Badge>
                      <span className="text-sm text-gray-500">→ {finding.recommendation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Segment Insights */}
      <Card>
        <CardHeader>
          <CardTitle>User Segment Analysis</CardTitle>
          <CardDescription>Behavioral patterns across different user segments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {segmentInsights.map((segment, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-lg">{segment.segment}</h4>
                <ul className="space-y-2">
                  {segment.insights.map((insight, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Impact Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Current Monthly Revenue</p>
                <p className="text-2xl font-bold">$379K</p>
                <p className="text-xs text-gray-500">Based on 1,897 conversions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Potential Revenue Lift</p>
                <p className="text-2xl font-bold text-green-600">+$70K</p>
                <p className="text-xs text-gray-500">With proposed experiments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">ROI on Optimization</p>
                <p className="text-2xl font-bold text-purple-600">1,400%</p>
                <p className="text-xs text-gray-500">Estimated 6-month return</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Action Plan</CardTitle>
          <CardDescription>Prioritized roadmap for funnel optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actionableRecommendations.map((phase, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(phase.priority)}`}>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {phase.priority}
                </h4>
                <ul className="space-y-2">
                  {phase.actions.map((action, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Success Metrics to Track</CardTitle>
          <CardDescription>KPIs to monitor experiment success and ongoing optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">Primary Metrics</h5>
              <ul className="text-sm space-y-1">
                <li>• Overall conversion rate</li>
                <li>• Step-by-step conversion rates</li>
                <li>• Revenue per visitor</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">User Experience</h5>
              <ul className="text-sm space-y-1">
                <li>• Time spent per step</li>
                <li>• Mobile vs desktop gap</li>
                <li>• User satisfaction scores</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">Segment Performance</h5>
              <ul className="text-sm space-y-1">
                <li>• Device-specific conversion</li>
                <li>• Geographic performance</li>
                <li>• Traffic source quality</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">Business Impact</h5>
              <ul className="text-sm space-y-1">
                <li>• Monthly recurring revenue</li>
                <li>• Customer acquisition cost</li>
                <li>• Lifetime value trends</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="flex justify-center pt-6">
        <Button size="lg" className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Start Implementation
        </Button>
      </div>
    </div>
  )
}
