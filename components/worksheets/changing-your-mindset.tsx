"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChangingYourMindsetProps {
  data: any
  updateData: (data: any) => void
}

export default function ChangingYourMindset({ data, updateData }: ChangingYourMindsetProps) {
  const [formData, setFormData] = useState({
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
  })

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setFormData(data)
    }
  }, [data])

  const handleTextareaChange = (category: string, value: string) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        changingMindset: {
          ...prev.changingMindset,
          [category]: value,
        },
      }
      updateData(newData)
      return newData
    })
  }

  const handleImmediateChangeInput = (value: string) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        immediateChange: value,
      }
      updateData(newData)
      return newData
    })
  }

  return (
    <div className="space-y-8">
       <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Changing Your Mindset</h2>
        <p className="mt-2 text-gray-600">
          Understand your behaviours and how you can change them to support a more resilient mindset.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Changing Your Mindset</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Write examples of your behaviour in these situations and how you can change it to support a more resilient
            mindset.
          </p>

          <div className="space-y-6">
            {[
              { id: "worryingAboutUncontrollable", label: "Worrying about situations you can't control" },
              { id: "failingToSeeChoices", label: "Failing to see choices, or having funnel vision" },
              { id: "procrastination", label: "Being a professional procrastinator" },
              { id: "expectingPerfection", label: "Expecting perfection of yourself and/or others" },
              { id: "resistingChange", label: "Resisting change through inflexibility and rigidity" },
              {
                id: "competitiveThinking",
                label: "Turning all situations into competitions where someone has to win and someone has to lose",
              },
              { id: "focusingOnFaults", label: "Focusing on faults rather than strengths, or being self-critical" },
              { id: "failingToSetLimits", label: "Failing to set limits or say No" },
              {
                id: "poorSelfCare",
                label:
                  "Taking poor care of yourself (not getting enough sleep or poor eating habits, stopping exercise, drinking/smoking more when stressed.)",
              },
              { id: "expectingResolution", label: "Expecting all problems should be neatly resolved" },
            ].map((item) => (
              <div key={item.id} className="space-y-2">
                <Label htmlFor={item.id} className="font-medium">
                  {item.label}
                </Label>
                <Textarea
                  id={item.id}
                  value={formData.changingMindset[item.id as keyof typeof formData.changingMindset]}
                  onChange={(e) => handleTextareaChange(item.id, e.target.value)}
                  placeholder="Enter your response here..."
                  className="min-h-[100px]"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-2">
            <Label htmlFor="immediateChange" className="font-medium">
              What's the one behaviour you think you can start working on changing right away? How will you do that?
            </Label>
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
    </div>
  )
}
