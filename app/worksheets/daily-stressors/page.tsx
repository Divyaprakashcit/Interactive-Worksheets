"use client"

import { useState, useEffect } from "react"
import { useWorksheetContext } from "@/app/context"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initialFormData = {
  stressTriggers: "",
  stressfulPeople: "",
  currentCopingMethods: "",
  physicalClues: "",
  behavioralChanges: "",
  emotionalResponses: "",
  firstNoticeableSymptoms: "",
}

export default function DailyStressorsPage() {
  const { worksheetData, updateWorksheetData } = useWorksheetContext()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const savedData = worksheetData.dailyStressors
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData)
    }
  }, [worksheetData.dailyStressors])

  const handleInputChange = (field: keyof typeof initialFormData, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }
      updateWorksheetData("dailyStressors", newData)
      return newData
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">DAILY STRESSORS WORKSHEET</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. What are your stress triggers? What situations occur, on a regular basis, which cause you to feel stressed?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={formData.stressTriggers}
            onChange={(e) => handleInputChange("stressTriggers", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. With which people are you likely to find yourself feeling stressed or tense?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={formData.stressfulPeople}
            onChange={(e) => handleInputChange("stressfulPeople", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. How do you currently deal with stress?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={formData.currentCopingMethods}
            onChange={(e) => handleInputChange("currentCopingMethods", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. What physical clues let you know you are feeling stressed?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={formData.physicalClues}
            onChange={(e) => handleInputChange("physicalClues", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Do you experience any behavioural changes when you are feeling stressed? If so, identify those here.</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={formData.behavioralChanges}
            onChange={(e) => handleInputChange("behavioralChanges", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. What do you feel emotionally in response to stress?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={formData.emotionalResponses}
            onChange={(e) => handleInputChange("emotionalResponses", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Complete the Stress Symptom Checklist. Which symptoms of stress are you most likely to notice first?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={formData.firstNoticeableSymptoms}
            onChange={(e) => handleInputChange("firstNoticeableSymptoms", e.target.value)}
            placeholder="Enter your response here..."
          />
        </CardContent>
      </Card>
    </div>
  )
}