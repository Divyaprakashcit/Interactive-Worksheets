"use client"

import { useState, useEffect } from "react"
import { useWorksheetContext } from "@/app/context"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initialFormData = {
  stressCreature: "",
  creatureAntics: "",
  funnyCoping: "",
}

export default function HowMuchStressWeighsFunnyPage() {
  const { worksheetData, updateWorksheetData } = useWorksheetContext()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const savedData = worksheetData.howMuchStressWeighsFunny
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData)
    }
  }, [worksheetData.howMuchStressWeighsFunny])

  const handleInputChange = (field: keyof typeof initialFormData, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }
      updateWorksheetData("howMuchStressWeighsFunny", newData)
      return newData
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">How Much Does Stress Weigh? (The Funny Version)</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>A Lighter Perspective on Stress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>A lecturer, when explaining stress management to an audience, raised a glass of water and asked, “How heavy is this glass of water?” Answers called out ranged from 20g to 500g. The lecturer replied, “The absolute weight doesn’t matter. It depends on how long you try to hold it.”</p>
          <p>“If I hold it for a minute, that’s not a problem. If I hold it for an hour, I’ll have an ache in my right arm. If I hold it for a day, you’ll have to call an ambulance.”</p>
          <p>He continued, “And that’s the way it is with stress... So, before you return home tonight, put the burden of work down. Don’t carry it home. You can always pick up your burdens again tomorrow. Life is short. Enjoy it!”</p>
          <p className="pt-4 font-semibold">And then he shared some ways of dealing with the burdens of life:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Accept that some days you’re the pigeon, and some days you’re the statue.</li>
            <li>Always keep your words soft and sweet, just in case you have to eat them.</li>
            <li>Drive carefully. It’s not only cars that can be recalled by their maker.</li>
            <li>If you can’t be kind, at least have the decency to be vague.</li>
            <li>If you lend someone $20 and never see that person again, it was probably worth it.</li>
            <li>Nobody cares if you can’t dance well. Just get up and dance.</li>
            <li>Since it’s the early worm that gets eaten by the bird, sleep late.</li>
            <li>When everything’s coming your way, you’re in the wrong lane.</li>
            <li>You may be only one person in the world, but you may also be the world to one person.</li>
            <li>Some mistakes are too much fun to make only once.</li>
            <li>We could learn a lot from crayons. Some are sharp, some are pretty and some are dull. Some have weird names, and all are different, but they all live in the same box.</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 1: Which piece of funny advice resonates with you the most and why?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.stressCreature}
            onChange={(e) => handleInputChange("stressCreature", e.target.value)}
            placeholder="e.g., 'Some days you're the pigeon...' because..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 2: Describe a time you were the 'pigeon' and a time you were the 'statue'.</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.creatureAntics}
            onChange={(e) => handleInputChange("creatureAntics", e.target.value)}
            placeholder="Share a short story about a good day and a not-so-good day..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 3: What's one 'mistake' you could make that would be 'too much fun to make only once'?</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[150px]"
            value={formData.funnyCoping}
            onChange={(e) => handleInputChange("funnyCoping", e.target.value)}
            placeholder="Think of a fun, harmless act of rebellion or spontaneity..."
          />
        </CardContent>
      </Card>
    </div>
  )
}