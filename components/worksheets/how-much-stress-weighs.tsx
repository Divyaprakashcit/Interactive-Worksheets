"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HowMuchStressWeighsProps {
  data: any
  updateData: (data: any) => void
}

export default function HowMuchStressWeighs({ data, updateData }: HowMuchStressWeighsProps) {
  const [formData, setFormData] = useState({
    stressMetaphor: "",
    physicalWeight: "",
    emotionalWeight: "",
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
        <h2 className="text-2xl font-bold">How Much Does Stress Weigh?</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>A Story About Stress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>A lecturer, when explaining stress management to an audience, raised a glass of water and asked, “How heavy is this glass of water?” Answers called out ranged from 20g to 500g.</p>
          <p>The lecturer replied, “The absolute weight doesn’t matter. It depends on how long you try to hold it. If I hold it for a minute, that’s not a problem. If I hold it for an hour, I’ll have an ache in my right arm. If I hold it for a day, you’ll have to call an ambulance.”</p>
          <p>“In each case, it’s the same weight, but the longer I hold it, the heavier it becomes.”</p>
          <p>He continued, “and that’s the way it is with stress. If we carry our burdens all the time, sooner or later, as the burden becomes increasingly heavy, we won’t be able to carry on.”</p>
          <p>“As with the glass of water, you have to put it down for a while and rest before holding it again. When we’re refreshed, we can carry on with the burden.”</p>
          <p>“So, before you return home tonight, put the burden of work down. Don’t carry it home. Give yourself some time to relax. You can always pick up your burdens again tomorrow.”</p>
          <p className="pt-4">
            The following questions are designed to help you explore and understand the 'weight' of your own stress.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 1: What are the 'burdens' you are carrying right now?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.stressMetaphor}
            onChange={(e) => handleInputChange("stressMetaphor", e.target.value)}
            placeholder="List the stressors or worries you are holding onto..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 2: How does carrying these burdens affect you physically and emotionally?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.physicalWeight}
            onChange={(e) => handleInputChange("physicalWeight", e.target.value)}
            placeholder="e.g., I feel tired, my shoulders ache, I'm more irritable..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 3: What is one way you can 'put down the glass' this week?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.emotionalWeight}
            onChange={(e) => handleInputChange("emotionalWeight", e.target.value)}
            placeholder="Describe a specific action you can take to rest and recharge..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
