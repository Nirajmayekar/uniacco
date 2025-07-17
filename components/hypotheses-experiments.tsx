"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Target, TrendingUp, DollarSign, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function HypothesesExperiments() {
  const hypotheses = [
    {
      id: 1,
      title: "Date Selection Interface Complexity",
      description:
        "Users are abandoning at the date selection step due to poor mobile calendar interface and lack of price transparency during date selection.",
      evidence: [
        "42.1% drop-off rate from View Property to Select Dates",
        "Mobile users show 52% drop-off vs 35% on desktop",
        "Average time on date selection page: 45 seconds (unusually high)",
      ],
      assumptions: [
        "Calendar interface is not mobile-optimized",
        "Users want to see pricing before selecting dates",
        "Date availability is not clearly indicated",
        "Touch targets are too small on mobile devices",
      ],
      impact: "High",
      confidence: "85%",
    },
    {
      id: 2,
      title: "Payment Process Friction",
      description:
        "Complex payment flow with too many required fields and limited payment options is causing abandonment at the final step.",
      evidence: [
        "41.3% drop-off rate from Review Booking to Payment",
        "Average time on payment page: 3.2 minutes",
        "High correlation between payment abandonment and form field count",
      ],
      assumptions: [
        "Too many required fields create friction",
        "Limited payment methods reduce completion",
        "Hidden fees appear at payment stage",
        "Guest checkout option is missing",
      ],
      impact: "Critical",
      confidence: "90%",
    },
    {
      id: 3,
      title: "Mobile Experience Degradation",
      description:
        "Mobile users experience significantly lower conversion rates due to poor mobile optimization across the entire funnel.",
      evidence: [
        "Mobile conversion rate: 8.7% vs Desktop: 15.2%",
        "Mobile users complete fewer steps on average (2.6 vs 3.8)",
        "Higher bounce rates on mobile across all funnel steps",
      ],
      assumptions: [
        "Mobile interface is not responsive",
        "Loading speeds are slower on mobile",
        "Touch interactions are poorly designed",
        "Mobile users have different intent/context",
      ],
      impact: "High",
      confidence: "80%",
    },
  ]

  const experiments = [
    {
      id: 1,
      title: "Simplified Date Selection Interface",
      hypothesis: "Date Selection Interface Complexity",
      description:
        "Redesign the date selection interface with mobile-first approach, larger touch targets, clear availability indicators, and upfront pricing.",
      changes: [
        "Implement mobile-optimized calendar with larger touch targets",
        "Show price estimates during date selection",
        "Add clear availability indicators (available/unavailable/limited)",
        "Implement date range suggestions based on popular choices",
        "Add quick date selection shortcuts (weekend, week, etc.)",
      ],
      target: "15% improvement in View Property → Select Dates conversion",
      duration: "4 weeks",
      sampleSize: "50% of traffic (7,710 users)",
      successMetrics: [
        "Primary: Conversion rate from View Property to Select Dates",
        "Secondary: Time spent on date selection page",
        "Secondary: Mobile vs Desktop conversion gap reduction",
      ],
      estimatedImpact: {
        additionalConversions: 973,
        revenueIncrease: 48650,
        confidenceLevel: "85%",
      },
    },
    {
      id: 2,
      title: "Streamlined Payment Process",
      description:
        "Simplify payment flow with guest checkout, single-page form, multiple payment methods, and transparent pricing.",
      hypothesis: "Payment Process Friction",
      changes: [
        "Implement guest checkout option (no account required)",
        "Reduce form fields to essential information only",
        "Add multiple payment methods (PayPal, Apple Pay, Google Pay)",
        "Show all fees upfront in booking review",
        "Implement single-page payment form",
        "Add progress indicators and trust signals",
      ],
      target: "25% improvement in Review Booking → Payment completion",
      duration: "6 weeks",
      sampleSize: "50% of users reaching payment step (~2,100 users)",
      successMetrics: [
        "Primary: Payment completion rate",
        "Secondary: Time to complete payment",
        "Secondary: Payment method adoption rates",
      ],
      estimatedImpact: {
        additionalConversions: 431,
        revenueIncrease: 21550,
        confidenceLevel: "90%",
      },
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Experiments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Hypotheses</p>
                <p className="text-2xl font-bold">{hypotheses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Experiments</p>
                <p className="text-2xl font-bold">{experiments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Est. Conversion Lift</p>
                <p className="text-2xl font-bold">18%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Est. Revenue Impact</p>
                <p className="text-2xl font-bold">$70K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hypotheses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hypotheses">Hypotheses</TabsTrigger>
          <TabsTrigger value="experiments">Experiments</TabsTrigger>
        </TabsList>

        <TabsContent value="hypotheses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Drop-off Hypotheses
              </CardTitle>
              <CardDescription>
                Data-driven hypotheses for major drop-off points with supporting evidence and assumptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {hypotheses.map((hypothesis) => (
                  <div key={hypothesis.id} className="border rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{hypothesis.title}</h3>
                        <p className="text-gray-600 mb-4">{hypothesis.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getImpactColor(hypothesis.impact)}>{hypothesis.impact} Impact</Badge>
                        <Badge variant="outline">{hypothesis.confidence} Confidence</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Supporting Evidence
                        </h4>
                        <ul className="space-y-2">
                          {hypothesis.evidence.map((evidence, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                              {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          Key Assumptions
                        </h4>
                        <ul className="space-y-2">
                          {hypothesis.assumptions.map((assumption, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                              {assumption}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiments" className="space-y-6">
          {experiments.map((experiment) => (
            <Card key={experiment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Experiment {experiment.id}: {experiment.title}
                    </CardTitle>
                    <CardDescription className="mt-2">Testing hypothesis: {experiment.hypothesis}</CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {experiment.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700">{experiment.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Proposed Changes</h4>
                    <ul className="space-y-2">
                      {experiment.changes.map((change, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Success Metrics</h4>
                    <ul className="space-y-2">
                      {experiment.successMetrics.map((metric, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Experiment Parameters</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Target Improvement</p>
                      <p className="font-semibold text-green-600">{experiment.target}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sample Size</p>
                      <p className="font-semibold">{experiment.sampleSize}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Est. Additional Conversions</p>
                      <p className="font-semibold">{experiment.estimatedImpact.additionalConversions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Est. Revenue Increase</p>
                      <p className="font-semibold text-green-600">
                        ${experiment.estimatedImpact.revenueIncrease.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Confidence Level:</span>
                    <Badge variant="secondary">{experiment.estimatedImpact.confidenceLevel}</Badge>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Launch Experiment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Implementation Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline</CardTitle>
              <CardDescription>Recommended sequence for experiment execution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Week 1-4: Date Selection Interface</h4>
                    <p className="text-sm text-gray-600">Highest impact potential, addresses largest drop-off point</p>
                  </div>
                  <Badge>Priority 1</Badge>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Week 5-10: Payment Process Optimization</h4>
                    <p className="text-sm text-gray-600">Critical for final conversion, high confidence in success</p>
                  </div>
                  <Badge>Priority 2</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
