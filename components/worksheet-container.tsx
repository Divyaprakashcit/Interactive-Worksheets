"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import StressSymptomChecklist from "./worksheets/stress-symptom-checklist"
import DailyStressors from "./worksheets/daily-stressors"
import StressManagementPlan from "./worksheets/stress-management-plan"
import StressfulLifeEvents from "./worksheets/stressful-life-events"
import ResilientMindset from "./worksheets/resilient-mindset"
import PerspectiveTool from "./worksheets/perspective-tool"
import HealthySelfTalk from "./worksheets/healthy-self-talk"
import StressManagementTechniques from "./worksheets/stress-management-techniques"
import HowMuchStressWeighs from "./worksheets/how-much-stress-weighs"
import HowMuchStressWeighsFunny from "./worksheets/how-much-stress-weighs-funny"
import ChangingYourMindset from "./worksheets/changing-your-mindset"

export default function WorksheetContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [worksheetData, setWorksheetData] = useState({
    stressSymptomChecklist: {},
    dailyStressors: {},
    stressManagementPlan: {},
    stressfulLifeEvents: {},
    resilientMindset: {},
    perspectiveTool: {},
    healthySelfTalk: {},
    stressManagementTechniques: {},
    howMuchStressWeighs: {},
    howMuchStressWeighsFunny: {},
    changingYourMindset: {},
  })

  const updateWorksheetData = (section: string, data: any) => {
    setWorksheetData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/save-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(worksheetData),
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your responses have been saved successfully.",
        })
      } else {
        throw new Error("Failed to save responses")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your responses.",
        variant: "destructive",
      })
      console.error("Error saving responses:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateReport = async () => {
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(worksheetData),
      })

      if (response.ok) {
        // Get the PDF blob from the response
        const blob = await response.blob()

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob)

        // Create a link element
        const link = document.createElement("a")
        link.href = url
        link.download = "Stress Management Worksheet.pdf"

        // Append to the document body
        document.body.appendChild(link)

        // Trigger the download
        link.click()

        // Clean up and remove the link
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast({
          title: "Success!",
          description: "Your PDF report has been generated and downloaded.",
        })
      } else {
        throw new Error("Failed to generate PDF")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem generating your PDF report.",
        variant: "destructive",
      })
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Tabs defaultValue="stress-symptom-checklist">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
          <TabsTrigger value="stress-symptom-checklist">Stress Symptom Checklist</TabsTrigger>
          <TabsTrigger value="daily-stressors">Daily Stressors</TabsTrigger>
          <TabsTrigger value="stress-management-plan">Stress Management Plan</TabsTrigger>
          <TabsTrigger value="stressful-life-events">Stressful Life Events</TabsTrigger>
          <TabsTrigger value="resilient-mindset">Resilient Mindset</TabsTrigger>
          <TabsTrigger value="perspective-tool">Perspective Tool</TabsTrigger>
          <TabsTrigger value="healthy-self-talk">Healthy Self-Talk</TabsTrigger>
          <TabsTrigger value="stress-management-techniques">Stress Management Techniques</TabsTrigger>
          <TabsTrigger value="how-much-stress-weighs">How Much Stress Weighs</TabsTrigger>
          <TabsTrigger value="how-much-stress-weighs-funny">How Much Stress Weighs (Funny)</TabsTrigger>
          <TabsTrigger value="changing-your-mindset">Changing Your Mindset</TabsTrigger>
        </TabsList>

        <TabsContent value="stress-symptom-checklist">
          <StressSymptomChecklist
            data={worksheetData.stressSymptomChecklist}
            updateData={(data) => updateWorksheetData("stressSymptomChecklist", data)}
          />
        </TabsContent>

        <TabsContent value="daily-stressors">
          <DailyStressors
            data={worksheetData.dailyStressors}
            updateData={(data) => updateWorksheetData("dailyStressors", data)}
          />
        </TabsContent>

        <TabsContent value="stress-management-plan">
          <StressManagementPlan
            data={worksheetData.stressManagementPlan}
            updateData={(data) => updateWorksheetData("stressManagementPlan", data)}
          />
        </TabsContent>

        <TabsContent value="stressful-life-events">
          <StressfulLifeEvents
            data={worksheetData.stressfulLifeEvents}
            updateData={(data) => updateWorksheetData("stressfulLifeEvents", data)}
          />
        </TabsContent>

        <TabsContent value="resilient-mindset">
          <ResilientMindset
            data={worksheetData.resilientMindset}
            updateData={(data) => updateWorksheetData("resilientMindset", data)}
          />
        </TabsContent>

        <TabsContent value="perspective-tool">
          <PerspectiveTool
            data={worksheetData.perspectiveTool}
            updateData={(data) => updateWorksheetData("perspectiveTool", data)}
          />
        </TabsContent>

        <TabsContent value="healthy-self-talk">
          <HealthySelfTalk
            data={worksheetData.healthySelfTalk}
            updateData={(data) => updateWorksheetData("healthySelfTalk", data)}
          />
        </TabsContent>

        <TabsContent value="stress-management-techniques">
          <StressManagementTechniques
            data={worksheetData.stressManagementTechniques}
            updateData={(data) => updateWorksheetData("stressManagementTechniques", data)}
          />
        </TabsContent>

        <TabsContent value="how-much-stress-weighs">
          <HowMuchStressWeighs
            data={worksheetData.howMuchStressWeighs}
            updateData={(data) => updateWorksheetData("howMuchStressWeighs", data)}
          />
        </TabsContent>

        <TabsContent value="how-much-stress-weighs-funny">
          <HowMuchStressWeighsFunny
            data={worksheetData.howMuchStressWeighsFunny}
            updateData={(data) => updateWorksheetData("howMuchStressWeighsFunny", data)}
          />
        </TabsContent>

        <TabsContent value="changing-your-mindset">
          <ChangingYourMindset
            data={worksheetData.changingYourMindset}
            updateData={(data) => updateWorksheetData("changingYourMindset", data)}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
          {isSubmitting ? "Saving..." : "Save Responses"}
        </Button>
        <Button
          onClick={handleGenerateReport}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Generate PDF Report
        </Button>
      </div>
    </div>
  )
}
