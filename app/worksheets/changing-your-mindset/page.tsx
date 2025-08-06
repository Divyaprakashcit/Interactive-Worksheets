"use client"

import { useState, useEffect } from "react"
import { useWorksheetContext } from "@/app/context"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initialFormData = {
  changingMindset: {
    worryingAboutUncontrollable: "",
    failingToSeeChoices: "",
    procrastination: "",
    expectingPerfection: "",
    resistingChange: "",
    competitiveThinking: "",
    focusingOnFaults: "",
    failingToSetLimits: "",
    poorSelfCare: "",
    expectingResolution: "",
  },
  immediateChange: "",
}

export default function ChangingYourMindsetPage() {
  const { worksheetData, updateWorksheetData } = useWorksheetContext()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const savedData = worksheetData.changingYourMindset
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData)
    }
  }, [worksheetData.changingYourMindset])

  const handleTextareaChange = (field: keyof typeof initialFormData.changingMindset, value: string) => {
    setFormData((prev) => {
      const newChangingMindset = { ...prev.changingMindset, [field]: value }
      const newData = { ...prev, changingMindset: newChangingMindset }
      updateWorksheetData("changingYourMindset", newData)
      return newData
    })
  }

  const handleImmediateChangeInput = (value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, immediateChange: value }
      updateWorksheetData("changingYourMindset", newData)
      return newData
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changing Your Mindset</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Write examples of your behaviour in these situations and how you can change it.</p>
        <div className="space-y-6">
          {[
            { id: "worryingAboutUncontrollable", label: "Worrying about situations you can't control" },
            { id: "failingToSeeChoices", label: "Failing to see choices, or having funnel vision" },
            { id: "procrastination", label: "Being a professional procrastinator" },
            { id: "expectingPerfection", label: "Expecting perfection of yourself and/or others" },
            { id: "resistingChange", label: "Resisting change through inflexibility and rigidity" },
            { id: "competitiveThinking", label: "Turning all situations into competitions" },
            { id: "focusingOnFaults", label: "Focusing on faults rather than strengths" },
            { id: "failingToSetLimits", label: "Failing to set limits or say No" },
            { id: "poorSelfCare", label: "Taking poor care of yourself" },
            { id: "expectingResolution", label: "Expecting all problems should be neatly resolved" },
          ].map((item) => (
            <div key={item.id} className="space-y-2">
              <Label htmlFor={item.id} className="font-medium">{item.label}</Label>
              <Textarea
                id={item.id}
                value={formData.changingMindset[item.id as keyof typeof initialFormData.changingMindset]}
                onChange={(e) => handleTextareaChange(item.id as keyof typeof initialFormData.changingMindset, e.target.value)}
                placeholder="Enter your response here..."
                className="min-h-[100px]"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-2">
          <Label htmlFor="immediateChange" className="font-medium">What's the one behaviour you think you can start working on changing right away? How will you do that?</Label>
          <Textarea
            id="immediateChange"
            value={formData.immediateChange}
            onChange={(e) => handleImmediateChangeInput(e.target.value)}
            placeholder="Enter your response here..."
            className="min-h-[150px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}