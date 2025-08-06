"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface ResilientMindsetProps {
  data: any
  updateData: (data: any) => void
}

export default function ResilientMindset({ data, updateData }: ResilientMindsetProps) {
  const [formData, setFormData] = useState({
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

  })

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setFormData(data)
    }
  }, [data])

  const handleCheckboxChange = (category: string, value: boolean) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        hinderingThinking: {
          ...prev.hinderingThinking,
          [category]: value,
        },
      }
      updateData(newData)
      return newData
    })
  }



  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">THE RESILIENT MINDSET</h2>
        <p className="mt-2 text-gray-600">
          In order to become or remain resilient, it's important to understand our own thoughts, feelings, and
          behaviours.
        </p>
        <p className="mt-2 text-gray-600">
          Do they contribute to our resilience or make it more difficult for us to practice it? Once we understand how
          our thoughts, feelings, and actions impact us, we are more able to make positive changes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thinking That Hinders a Resilient Mindset</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Check the ones that you believe apply to your thinking. Think about what you can do differently to change
            the behaviour or thinking pattern.
          </p>

          <div className="space-y-4">
            {[
              {
                id: "filtering",
                label:
                  "Filtering: Do you take the negative details and magnify them while filtering out all positive aspects of a situation?",
              },
              {
                id: "polarisedThinking",
                label:
                  "Polarised Thinking: Do you have a tendency to look at things as black or white, good or bad? For example, do you tend to think you have to be perfect or you're a failure? That there is no middle ground?",
              },
              {
                id: "overgeneralisation",
                label:
                  "Overgeneralisation: Do you come to a conclusion based on a single incident? If something bad happens, do you expect it to happen over and over again?",
              },
              {
                id: "mindReading",
                label:
                  "Mind reading: Do you tend to make assumptions about what people are feeling and why they act the way they do? Do you tend to interpret how people feel about you?",
              },
              {
                id: "catastrophising",
                label:
                  "Catastrophising: Do you expect the worst? Do you tend to anticipate disaster? Do you notice or hear about a problem and immediately start to think about the 'what ifs'?",
              },
              {
                id: "personalisation",
                label:
                  "Personalisation: Do you have a tendency to think that everything people do or say is some kind of reaction to you? And do you tend to compare yourself to others, trying to determine who's smarter, better looking, earns more, etc.?",
              },
              {
                id: "controlFallacies",
                label:
                  "Control Fallacies: Do you tend to feel you are controlled by external circumstances? If so, you are helpless, a victim of fate. On the other hand, do you tend to feel immense internal control? If so, you feel responsible for the pain and happiness of everyone around you. Both are control fallacies. What's realistic?",
              },
              {
                id: "fallacyOfFairness",
                label:
                  "Fallacy of Fairness: Do you feel resentful because you think you know what is fair and right but other people don't agree with you?",
              },
              {
                id: "blaming",
                label:
                  "Blaming: Do you hold other people responsible for your pain and struggles, or take the other tack and blame yourself for every problem or reversal? Neither of these thought patterns support a resilient mindset.",
              },
              {
                id: "shoulds",
                label:
                  "Shoulds: Do you have a list of rules about how you and other people should act? Do people who break the rules anger you? And do you feel guilty when you violate the rules?",
              },
              {
                id: "fallacyOfChange",
                label:
                  "Fallacy of Change: Do you expect other people to change to suit you if you help them enough? Is it possible you feel that people need to change because your happiness seems to depend on them?",
              },
              {
                id: "beingRight",
                label:
                  "Being Right: Do you continually try to prove that you are right? Is being wrong unthinkable? Do you tend to go to any length to demonstrate you rightness?",
              },
              {
                id: "heavensRewardFallacy",
                label:
                  "Heaven's Reward Fallacy: Do you expect all your sacrifice and self-denial to pay off, as if there was someone keeping score? Do you feel bitter when the reward doesn't come?",
              },
            ].map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <Checkbox
                  id={item.id}
                  checked={formData.hinderingThinking[item.id as keyof typeof formData.hinderingThinking]}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                />
                <Label htmlFor={item.id} className="text-sm">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


    </div>
  )
}
