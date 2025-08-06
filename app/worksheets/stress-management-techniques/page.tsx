"use client"

import { useState, useEffect } from "react"
import { useWorksheetContext } from "@/app/context"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initialFormData = {
  technique1: "",
  technique2: "",
  technique3: "",
}

export default function StressManagementTechniquesPage() {
  const { worksheetData, updateWorksheetData } = useWorksheetContext()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const savedData = worksheetData.stressManagementTechniques
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData)
    }
  }, [worksheetData.stressManagementTechniques])

  const handleInputChange = (field: keyof typeof initialFormData, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }
      updateWorksheetData("stressManagementTechniques", newData)
      return newData
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Stress Management and Stress Reduction Techniques</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Stress Reduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Breathing exercises</li>
            <li>Progressive relaxation</li>
            <li>Visualisation - (visualise yourself on the beach or some other enjoyable place)</li>
            <li>Listen to music and / or relaxation tapes (you can buy them or record your own)</li>
            <li>Refute irrational ideas (is what you just told yourself really true?)</li>
            <li>Various spiritual or religious practices (prayer, reflection, meditation, contemplation)</li>
            <li>Practice gratitude (and try to forgive)</li>
            <li>Avoid people and situation(s) that causes stress (to the extent possible). Pare down your to-do list</li>
            <li>Call a good friend or find other ways to connect with others (share your feelings)</li>
            <li>Engage in realistic goal setting and time management. Practice assertiveness and boundary setting (learn to say No). Stop trying to control the uncontrollable.</li>
            <li>Keep your sense of humour</li>
            <li>Practice good nutrition - eating a healthy diet makes us better prepared to cope with stress. Get enough sleep.</li>
            <li>Sweat the stress out through exercise (take a run or walk, stretch, do yoga, lift weights)</li>
            <li>Make time for fun and relaxation. Take a hot bath, get a massage, play with a pet, work in your garden, curl up with a good book, write in your journal, spend time in nature. Nurturing yourself is a necessity, not a luxury - only you can take care of yourself - no one else can do this for you.</li>
            <li>Other ideas?</li>
          </ul>
          <p className="pt-4">
            Effective stress management involves a variety of techniques that can help you cope with life's pressures in a healthier way. Below, please answer the questions to build your own stress management plan.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 1: What is one stress reduction technique you will commit to practicing regularly?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.technique1}
            onChange={(e) => handleInputChange("technique1", e.target.value)}
            placeholder="e.g., Deep breathing exercises for 5 minutes daily..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 2: What is a second technique you can use when you feel overwhelmed?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.technique2}
            onChange={(e) => handleInputChange("technique2", e.target.value)}
            placeholder="e.g., Taking a short walk to clear my head..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 3: What is a third technique for managing long-term stress?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.technique3}
            onChange={(e) => handleInputChange("technique3", e.target.value)}
            placeholder="e.g., Engaging in a hobby like painting or gardening..."
          />
        </CardContent>
      </Card>
    </div>
  )
}