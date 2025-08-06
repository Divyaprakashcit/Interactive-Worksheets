"use client"

import { useState, useEffect } from "react"
import { useWorksheetContext } from "@/app/context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initialFormData = {
  physicalSymptoms: {
    headaches: "", backPain: "", indigestion: "", tightNeckShoulders: "", stomachaches: "",
    racingHeart: "", sweatyPalms: "", shallowBreathing: "", dizziness: "", restlessness: "",
    easilyFatigued: "", ringingInEars: "", muscleTension: "", constipation: "", diarrhea: "",
  },
  physicalTop3: ["", "", ""],
  behavioralSymptoms: {
    excessiveSmoking: "", drivingTooFast: "", bossiness: "", grindingTeeth: "", eatingTooLittleOrMuch: "",
    overuseAlcohol: "", criticalAttitude: "", inabilityFinishTasks: "", shortTemper: "", nailBiting: "",
    procrastinating: "", fidgeting: "", sleepingTooMuchOrLittle: "",
  },
  behavioralTop3: ["", "", ""],
  emotionalSymptoms: {
    botheredByUnimportant: "", criesEasily: "", nervousnessAnxiety: "", overwhelmingPressure: "",
    boredom: "", anger: "", edginess: "", loneliness: "", irritable: "", unhappinessDepression: "",
    feelingBurnedOut: "", moodiness: "", feelingPowerless: "", feelingHelpless: "",
  },
  emotionalTop3: ["", "", ""],
  cognitiveSymptoms: {
    troubleThinkingClearly: "", inabilityMakeDecisions: "", difficultyConcentration: "",
    constantWorry: "", forgetfulness: "", lossOfHumor: "", lackOfCreativity: "",
    beingSelfCritical: "", expectingTooMuch: "", beingPessimistic: "",
  },
  cognitiveTop3: ["", "", ""],
}

export default function StressSymptomChecklistPage() {
  const { worksheetData, updateWorksheetData } = useWorksheetContext()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const savedData = worksheetData.stressSymptomChecklist
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData)
    }
  }, [worksheetData.stressSymptomChecklist])

  const handleInputChange = (category: keyof typeof initialFormData, symptom: string, value: string) => {
    setFormData((prev) => {
      const newCategoryData = { ...(prev[category] as object), [symptom]: value }
      const newData = { ...prev, [category]: newCategoryData }
      updateWorksheetData("stressSymptomChecklist", newData)
      return newData
    })
  }

  const handleTop3Change = (category: string, index: number, value: string) => {
    setFormData((prev) => {
      const top3Key = `${category}Top3` as keyof typeof initialFormData
      const newTop3 = [...(prev[top3Key] as string[])]
      newTop3[index] = value
      const newData = { ...prev, [top3Key]: newTop3 }
      updateWorksheetData("stressSymptomChecklist", newData)
      return newData
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">STRESS SYMPTOM CHECKLIST</h2>
        <p className="mt-2 text-gray-600">
          Rate symptoms from 1 (slight discomfort) to 5 (extreme discomfort) experienced in the past two weeks.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Physical Symptoms</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries({
              headaches: "Headaches", backPain: "Back Pain", indigestion: "Indigestion",
              tightNeckShoulders: "Tight Neck, Shoulders", stomachaches: "Stomachaches", racingHeart: "Racing Heart",
              sweatyPalms: "Sweaty Palms", shallowBreathing: "Shallow Breathing", dizziness: "Dizziness",
              restlessness: "Restlessness", easilyFatigued: "Easily Fatigued", ringingInEars: "Ringing in the Ears",
              muscleTension: "Muscle Tension", constipation: "Constipation", diarrhea: "Diarrhea",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <Input
                  type="number" min="1" max="5" className="w-16"
                  value={formData.physicalSymptoms[key as keyof typeof formData.physicalSymptoms] || ''}
                  onChange={(e) => handleInputChange("physicalSymptoms", key, e.target.value)}
                />
                <Label>{label}</Label>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Top 3 Physical Symptoms:</h3>
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <Label className="w-8">{index + 1}.</Label>
                <Input
                  value={formData.physicalTop3[index] || ''}
                  onChange={(e) => handleTop3Change("physical", index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Behavioral Symptoms</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries({
              excessiveSmoking: "Excessive Smoking", drivingTooFast: "Driving Too Fast", bossiness: "Bossiness",
              grindingTeeth: "Grinding of Teeth", eatingTooLittleOrMuch: "Eating Too Little or Too Much",
              overuseAlcohol: "Overuse of Alcohol", criticalAttitude: "Critical Attitude",
              inabilityFinishTasks: "Inability to Finish Tasks", shortTemper: "Short-Temper",
              nailBiting: "Nail Biting", procrastinating: "Procrastinating", fidgeting: "Fidgeting",
              sleepingTooMuchOrLittle: "Sleeping Too Much or Too Little",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <Input
                  type="number" min="1" max="5" className="w-16"
                  value={formData.behavioralSymptoms[key as keyof typeof formData.behavioralSymptoms] || ''}
                  onChange={(e) => handleInputChange("behavioralSymptoms", key, e.target.value)}
                />
                <Label>{label}</Label>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Top 3 Behavioral Symptoms:</h3>
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <Label className="w-8">{index + 1}.</Label>
                <Input
                  value={formData.behavioralTop3[index] || ''}
                  onChange={(e) => handleTop3Change("behavioral", index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Emotional Symptoms</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries({
              botheredByUnimportant: "Bothered by Unimportant Things", criesEasily: "Cries Easily",
              nervousnessAnxiety: "Nervousness/Anxiety", overwhelmingPressure: "Overwhelming Pressure",
              boredom: "Boredom", anger: "Anger", edginess: "Edginess", loneliness: "Loneliness",
              irritable: "Irritable", unhappinessDepression: "Unhappiness/Depression",
              feelingBurnedOut: "Feeling Burned Out", moodiness: "Moodiness",
              feelingPowerless: "Feeling Powerless", feelingHelpless: "Feeling Helpless",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <Input
                  type="number" min="1" max="5" className="w-16"
                  value={formData.emotionalSymptoms[key as keyof typeof formData.emotionalSymptoms] || ''}
                  onChange={(e) => handleInputChange("emotionalSymptoms", key, e.target.value)}
                />
                <Label>{label}</Label>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Top 3 Emotional Symptoms:</h3>
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <Label className="w-8">{index + 1}.</Label>
                <Input
                  value={formData.emotionalTop3[index] || ''}
                  onChange={(e) => handleTop3Change("emotional", index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Cognitive Symptoms</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries({
              troubleThinkingClearly: "Trouble Thinking Clearly", inabilityMakeDecisions: "Inability to Make Decisions",
              difficultyConcentration: "Difficulty Concentrating", constantWorry: "Constant Worry",
              forgetfulness: "Forgetfulness", lossOfHumor: "Loss of Humor",
              lackOfCreativity: "Lack of Creativity", beingSelfCritical: "Being Self-Critical",
              expectingTooMuch: "Expecting Too Much From Self", beingPessimistic: "Being Pessimistic",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <Input
                  type="number" min="1" max="5" className="w-16"
                  value={formData.cognitiveSymptoms[key as keyof typeof formData.cognitiveSymptoms] || ''}
                  onChange={(e) => handleInputChange("cognitiveSymptoms", key, e.target.value)}
                />
                <Label>{label}</Label>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Top 3 Cognitive Symptoms:</h3>
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <Label className="w-8">{index + 1}.</Label>
                <Input
                  value={formData.cognitiveTop3[index] || ''}
                  onChange={(e) => handleTop3Change("cognitive", index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}