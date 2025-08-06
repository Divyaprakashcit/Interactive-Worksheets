"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PerspectiveToolProps {
  data: any
  updateData: (data: any) => void
}

export default function PerspectiveTool({ data, updateData }: PerspectiveToolProps) {
  const [formData, setFormData] = useState({
    worstCase: "",
    worstCaseProbability: "",
    preventWorstCase: "",
    bestCase: "",
    makeBestCaseHappen: "",
    mostLikelyCase: "",
    handleMostLikelyCase: "",
  })

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setFormData(data)
    }
  }, [data])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [field]: value,
      }
      updateData(newData)
      return newData
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">PUTTING IT IN PERSPECTIVE - TOOL</h2>
        <p className="mt-2 text-gray-600">
          This tool allows you to create more accurate thinking regarding an event or situation resulting in greater
          personal resilience. The first step is to write down your beliefs regarding the event or situation:
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. What is the worst thing that can happen?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-600 text-sm">
            It is important to remember the items that you can really be sure about. The rest is guesswork.
          </p>
          <Textarea
            className="min-h-[120px]"
            value={formData.worstCase}
            onChange={(e) => handleInputChange("worstCase", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Assess the probability of the worst case – how likely is it to happen?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={formData.worstCaseProbability}
            onChange={(e) => handleInputChange("worstCaseProbability", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. What is one thing I can do to help stop the worst thing from happening?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-600 text-sm">
            It's important to break free of the chain of future-threat beliefs. It is in your best interest to establish
            what's most likely to happen and take steps to prepare for it. Think outside the box.
          </p>
          <Textarea
            className="min-h-[120px]"
            value={formData.preventWorstCase}
            onChange={(e) => handleInputChange("preventWorstCase", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Alternatively, and in addition, what is the best thing that can happen?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-600 text-sm">
            What does it take to climb out of a future-threat rut? It's critically important to create best-case
            scenarios. This will help you move beyond the worst-case scenario.
          </p>
          <Textarea
            className="min-h-[120px]"
            value={formData.bestCase}
            onChange={(e) => handleInputChange("bestCase", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            5. Be creative and wildly optimistic - what is one thing I can do to make the best thing happen?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-600 text-sm">
            Once you have the worst and best case scenarios in place as a frame it is easier for you to locate the most
            likely outcomes.
          </p>
          <Textarea
            className="min-h-[120px]"
            value={formData.makeBestCaseHappen}
            onChange={(e) => handleInputChange("makeBestCaseHappen", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. What is the most likely thing that will happen?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-600 text-sm">
            Write down your solution strategies; devise two or three ways that you can fix the real problems that stem
            from your adversity.
          </p>
          <Textarea
            className="min-h-[120px]"
            value={formData.mostLikelyCase}
            onChange={(e) => handleInputChange("mostLikelyCase", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. What can I do to handle the most likely thing if it happens?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-600 text-sm">
            What steps can you take to handle the most likely outcome? Work on zeroing in on the most likely outcome,
            the solution may be more obvious.
          </p>
          <Textarea
            className="min-h-[120px]"
            value={formData.handleMostLikelyCase}
            onChange={(e) => handleInputChange("handleMostLikelyCase", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
