"use client"

import { useState, useEffect } from "react"
import { useWorksheetContext } from "@/app/context"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const initialFormData = {
  hinderingThinking: {
    filtering: false,
    polarisedThinking: false,
    overgeneralisation: false,
    mindReading: false,
    catastrophising: false,
    personalisation: false,
    controlFallacies: false,
    fallacyOfFairness: false,
    blaming: false,
    shoulds: false,
    fallacyOfChange: false,
    beingRight: false,
    heavensRewardFallacy: false,
  },
}

export default function ResilientMindsetPage() {
  const { worksheetData, updateWorksheetData } = useWorksheetContext()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const savedData = worksheetData.resilientMindset
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData)
    }
  }, [worksheetData.resilientMindset])

  const handleCheckboxChange = (category: keyof typeof initialFormData.hinderingThinking, value: boolean) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        hinderingThinking: {
          ...prev.hinderingThinking,
          [category]: value,
        },
      }
      updateWorksheetData("resilientMindset", newData)
      return newData
    })
  }



  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">THE RESILIENT MINDSET</h2>
        <p className="mt-2 text-gray-600">
          In order to become or remain resilient, it's important to understand our own thoughts, feelings, and behaviours.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thinking That Hinders a Resilient Mindset</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Check the ones that you believe apply to your thinking.</p>
          <div className="space-y-4">
            {[
              { id: "filtering", label: "Filtering: Do you take the negative details and magnify them while filtering out all positive aspects of a situation?" },
              { id: "polarisedThinking", label: "Polarised Thinking: Do you have a tendency to look at things as black or white, good or bad?" },
              { id: "overgeneralisation", label: "Overgeneralisation: Do you come to a conclusion based on a single incident?" },
              { id: "mindReading", label: "Mind reading: Do you tend to make assumptions about what people are feeling?" },
              { id: "catastrophising", label: "Catastrophising: Do you expect the worst?" },
              { id: "personalisation", label: "Personalisation: Do you have a tendency to think that everything people do or say is some kind of reaction to you?" },
              { id: "controlFallacies", label: "Control Fallacies: Do you tend to feel you are controlled by external circumstances or that you are responsible for everyone?" },
              { id: "fallacyOfFairness", label: "Fallacy of Fairness: Do you feel resentful because you think you know what is fair and right but other people don't agree?" },
              { id: "blaming", label: "Blaming: Do you hold other people responsible for your pain or blame yourself for every problem?" },
              { id: "shoulds", label: "Shoulds: Do you have a list of rules about how you and other people should act?" },
              { id: "fallacyOfChange", label: "Fallacy of Change: Do you expect other people to change to suit you?" },
              { id: "beingRight", label: "Being Right: Do you continually try to prove that you are right?" },
              { id: "heavensRewardFallacy", label: "Heaven's Reward Fallacy: Do you expect all your sacrifice and self-denial to pay off?" },
            ].map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <Checkbox
                  id={item.id}
                  checked={formData.hinderingThinking[item.id as keyof typeof initialFormData.hinderingThinking]}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id as keyof typeof initialFormData.hinderingThinking, checked as boolean)}
                />
                <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


    </div>
  )
}