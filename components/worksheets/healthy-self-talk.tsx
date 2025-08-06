"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HealthySelfTalkProps {
  data: any
  updateData: (data: any) => void
}

export default function HealthySelfTalk({ data, updateData }: HealthySelfTalkProps) {
  const [formData, setFormData] = useState({
    reflections: "",
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
        <h2 className="text-2xl font-bold">STEPS TO EMOTIONALLY HEALTHY SELF-TALK</h2>
      </div>

      <div className="prose max-w-none">
        <p>
          Throughout each day, there are events that trigger thoughts and emotions in all of us. Some are pleasant and
          some generate negative thoughts and emotions.
        </p>

        <p>
          For example, occasionally we'll hear ourselves think - "What an idiot!" as someone cuts in front of us on the
          highway with no warning.
        </p>

        <p>
          And often we'll let the incident, and the attendant thoughts and emotions go as we apply the brake and allow
          room for the aggressive driver to be on his way.
        </p>

        <p>
          There are many other times, however, when these internal conversations play an important part in defining and
          shaping our emotional state, and our emotional experience of life.
        </p>

        <h3 className="text-xl font-bold mt-6">Steps to emotionally-healthy self-talk:</h3>

        <h4 className="text-lg font-bold mt-4">Step 1: Tune in to your spontaneous thoughts, emotions and reactions</h4>

        <p>They are useful and instructive, although we need to carefully examine what's happening.</p>

        <p>Spontaneous thoughts usually share these characteristics:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            They can be irrational (i.e., "I'd like nothing more than to walk in his office and hand in my resignation"
            or worse, "I'd like to kill this guy." Our spontaneous thoughts are uncensored, and the intensity of our
            thoughts reflect the intensity of our emotions. Obviously, we would never seriously consider killing anyone,
            or even quit our jobs on the spot, but these thoughts just pop out in response to the rush emotional
            reaction, and we need to stop and consider whether there's any logic to them.
          </li>
          <li>
            They are usually overly general and we often believe them (i.e. "He never listens to me" or "He's always so
            disrespectful". After a while, these thoughts come into our heads so often we simply accept as truth that
            "He never listens", when in fact, he might listen under certain circumstances.
          </li>
          <li>They are often cryptic, and expressed as a kind of "shorthand", as in "jerk" or "idiot".</li>
          <li>
            They tend to trigger other automatic thoughts. What starts as, "What a jerk" leads to "I hate my job". This
            not only perpetuates and exacerbates your feelings of anger, but it makes it more difficult to shut off
            those thoughts. Your thoughts cascade forth like dominoes.
          </li>
          <li>
            Spontaneous thoughts can lead to distorted thinking, leading to other irrational thoughts. "This guy's a
            jerk. I hate working for him. I hate working here", may lead to the following: "I'm going to quit. What if
            they fire me first? What if I can't find another job? The family needs income. We'll have to sell the house.
            The kids won't go to college. We'll lose everything." See how unproductive this can be?
          </li>
        </ul>

        <h4 className="text-lg font-bold mt-4">Step 2: Develop Constructive Inner Dialogue</h4>

        <p>
          Up until now, we've been discussing spontaneous thoughts. Now let's turn to constructive inner dialogue. Inner
          dialogue is not spontaneous; it's deliberate and productive. By observing and then turning off the spontaneous
          thoughts as soon as possible, and by learning how to have effective constructive inner dialogue, you can help
          use the effects of distressful situations in your life.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Reflections on Healthy Self-Talk</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            After reading about emotionally healthy self-talk, reflect on your own internal dialogue. How can you apply
            these steps to improve your self-talk? What specific strategies will you use?
          </p>
          <Textarea
            className="min-h-[250px]"
            value={formData.reflections}
            onChange={(e) => handleInputChange("reflections", e.target.value)}
            placeholder="Enter your reflections here..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
