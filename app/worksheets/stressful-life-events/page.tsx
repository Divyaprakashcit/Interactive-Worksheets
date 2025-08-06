"use client"

import { useState, useEffect } from "react"
import { useWorksheetContext } from "@/app/context"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const initialFormData = {
  events: {
    deathOfSpouse: false,
    divorce: false,
    maritalSeparation: false,
    jailTerm: false,
    deathOfFamilyMember: false,
    majorIllness: false,
    marriage: false,
    fired: false,
    maritalReconciliation: false,
    retirement: false,
    healthChangeFamilyMember: false,
    pregnancy: false,
    sexualDifficulty: false,
    newFamilyMember: false,
    businessReadjustment: false,
    financialChange: false,
    deathOfFriend: false,
    careerChange: false,
    changeInArguments: false,
    largeMortgage: false,
    foreclosure: false,
    changeInResponsibilities: false,
    childLeavingHome: false,
    troubleWithInlaws: false,
    outstandingAchievement: false,
    spouseStartsStopsWork: false,
    schoolStart: false,
    changeInLivingConditions: false,
    revisionOfHabits: false,
    troubleWithBoss: false,
    changeInWorkHours: false,
    changeInResidence: false,
    changeInSchools: false,
    changeInRecreation: false,
    changeInChurchActivities: false,
    changeInSocialActivities: false,
    smallMortgage: false,
    changeInSleepingHabits: false,
    changeInFamilyGatherings: false,
    changeInEatingHabits: false,
    vacation: false,
    holiday: false,
    minorLawViolation: false,
  },
  scores: {
    deathOfSpouse: 100,
    divorce: 73,
    maritalSeparation: 65,
    jailTerm: 63,
    deathOfFamilyMember: 63,
    majorIllness: 63,
    marriage: 50,
    fired: 47,
    maritalReconciliation: 45,
    retirement: 45,
    healthChangeFamilyMember: 44,
    pregnancy: 40,
    sexualDifficulty: 40,
    newFamilyMember: 39,
    businessReadjustment: 39,
    financialChange: 38,
    deathOfFriend: 37,
    careerChange: 36,
    changeInArguments: 35,
    largeMortgage: 31,
    foreclosure: 30,
    changeInResponsibilities: 29,
    childLeavingHome: 29,
    troubleWithInlaws: 29,
    outstandingAchievement: 28,
    spouseStartsStopsWork: 26,
    schoolStart: 26,
    changeInLivingConditions: 25,
    revisionOfHabits: 24,
    troubleWithBoss: 23,
    changeInWorkHours: 20,
    changeInResidence: 20,
    changeInSchools: 20,
    changeInRecreation: 19,
    changeInChurchActivities: 19,
    changeInSocialActivities: 18,
    smallMortgage: 17,
    changeInSleepingHabits: 16,
    changeInFamilyGatherings: 15,
    changeInEatingHabits: 15,
    vacation: 13,
    holiday: 12,
    minorLawViolation: 11,
  },
  totalScore: 0,
}

export default function StressfulLifeEventsPage() {
  const { worksheetData, updateWorksheetData } = useWorksheetContext()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const savedData = worksheetData.stressfulLifeEvents
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData)
    }
  }, [worksheetData.stressfulLifeEvents])

  const handleCheckboxChange = (event: string, checked: boolean) => {
    setFormData((prev) => {
      const newEvents = {
        ...prev.events,
        [event]: checked,
      }

      let total = 0
      Object.keys(newEvents).forEach((key) => {
        if (newEvents[key as keyof typeof newEvents]) {
          total += prev.scores[key as keyof typeof prev.scores]
        }
      })

      const newData = {
        ...prev,
        events: newEvents,
        totalScore: total,
      }

      updateWorksheetData("stressfulLifeEvents", newData)
      return newData
    })
  }

  const getScoreCategory = (score: number) => {
    if (score <= 150) {
      return "Below 150 - 30% chance of illness or accident in 2 years"
    } else if (score <= 300) {
      return "Between 150 - 300 - 51% chance of illness or accident"
    } else {
      return "Over 300 - 80% chance of illness or accident"
    }
  }

  const eventLabels = {
    deathOfSpouse: "Death of a Child or Spouse",
    divorce: "Divorce",
    maritalSeparation: "Marital Separation",
    jailTerm: "Detention in jail or institution",
    deathOfFamilyMember: "Death of a close family member",
    majorIllness: "Major personal injury or illness",
    marriage: "Marriage",
    fired: "Being fired at work",
    maritalReconciliation: "Marital Reconciliation",
    retirement: "Retirement",
    healthChangeFamilyMember: "Major change in health or behaviour of a family member",
    pregnancy: "Pregnancy",
    sexualDifficulty: "Sexual Difficulty",
    newFamilyMember: "Gaining a new family member through birth, adoption or remarriage",
    businessReadjustment: "Major business readjustments",
    financialChange: "Major change in financial state",
    deathOfFriend: "Death of a close friend",
    careerChange: "Change to a different line of work",
    changeInArguments: "Major increase in fights with spouse",
    largeMortgage: "Taking on a mortgage",
    foreclosure: "Foreclosure on a mortgage or loan",
    changeInResponsibilities: "Major change in responsibility or work",
    childLeavingHome: "Son or daughter leaving home",
    troubleWithInlaws: "In-law troubles",
    outstandingAchievement: "Outstanding personal achievement",
    spouseStartsStopsWork: "Spouse begins to cease work outside of home",
    schoolStart: "Go back to school",
    changeInLivingConditions: "Major change in living condition (rebuilding, remodeling)",
    revisionOfHabits: "Revision of personal habits",
    troubleWithBoss: "Troubles with superior, boss",
    changeInWorkHours: "Major change in working hours, conditions",
    changeInResidence: "Change in residence",
    changeInSchools: "Change to a new school",
    changeInRecreation: "Major change in usual type and/or amount or recreation",
    changeInChurchActivities: "Major change in church activities",
    changeInSocialActivities: "Major change in social activities",
    smallMortgage: "Purchasing new car, or other big purchase",
    changeInSleepingHabits: "Major change in sleeping habits",
    changeInFamilyGatherings: "Major change in number of family get-togethers",
    changeInEatingHabits: "Major change in eating habits",
    vacation: "Vacation",
    holiday: "Christmas or holiday observance",
    minorLawViolation: "Minor violations of the law",
  }

  return (
    
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Stressful Life Events Checklist</CardTitle>
          <CardDescription>Check all events that have occurred in your life in the past 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(eventLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={key}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.events[key as keyof typeof formData.events]}
                  onChange={(e) => handleCheckboxChange(key, e.target.checked)}
                />
                <Label htmlFor={key} className="flex-1">
                  {label}{" "}
                  <span className="text-gray-500 ml-1">({formData.scores[key as keyof typeof formData.scores]})</span>
                </Label>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Your Total Score:</h3>
              <span className="text-2xl font-bold">{formData.totalScore}</span>
            </div>
            <p className="mt-2 font-medium text-blue-800">{getScoreCategory(formData.totalScore)}</p>
            <p className="mt-4 text-sm text-gray-600">
              These predictions are not absolute. Health changes are the result of many different factors, including how significant those life events are to you, your personal capacity to cope with stress and life changes, and the available support through family, work and friends.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              However, taking this quiz can give you some insight to potential risk to your health and well-being so you can take measures to take care of yourself.
            </p>
          </div>
        </CardContent>
      </Card>
    
  )
}