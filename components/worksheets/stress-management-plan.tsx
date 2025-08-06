"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StressManagementPlanProps {
  data: any
  updateData: (data: any) => void
}

export default function StressManagementPlan({ data, updateData }: StressManagementPlanProps) {
  const [formData, setFormData] = useState({
    stressSymptoms: "",
    stressTriggers: "",
    copingStrategies: "",
    rememberingStrategies: "",
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
        <h2 className="text-2xl font-bold">ACTION PLAN & COMMITMENT TO STRESS MANAGEMENT & REDUCTION</h2>
        <p className="mt-2 text-gray-600">
          Fill in the following spaces to create your own plan of action for your return to work. With awareness comes
          responsibility. By becoming more aware you can make better decisions for yourself, your health, your family
          and your co-workers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>The stress symptoms I most need to notice and pay attention to are:</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.stressSymptoms}
            onChange={(e) => handleInputChange("stressSymptoms", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My stress triggers include the following (situations & people):</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.stressTriggers}
            onChange={(e) => handleInputChange("stressTriggers", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            A better way to deal with each of these will be to (list the stress management techniques you will use
            here):
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.copingStrategies}
            onChange={(e) => handleInputChange("copingStrategies", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            How will you remember to engage in stress management in the moment, at the onset of feeling stressed?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.rememberingStrategies}
            onChange={(e) => handleInputChange("rememberingStrategies", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
