"use client"

import { useWorksheetContext } from "../context"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function WorksheetTemplate({ children }: { children: React.ReactNode }) {
  const { worksheetData, isSubmitting, setIsSubmitting } = useWorksheetContext()

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
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "Stress Management Worksheet.pdf"
        document.body.appendChild(link)
        link.click()
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
      {children}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Responses"}
        </Button>
        <Button onClick={handleGenerateReport}>Generate Report</Button>
      </div>
    </div>
  )
}