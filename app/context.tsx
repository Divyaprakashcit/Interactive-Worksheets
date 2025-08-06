"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const worksheetKeys = [
  'stressSymptomChecklist',
  'dailyStressors',
  'stressManagementPlan',
  'stressfulLifeEvents',
  'resilientMindset',
  'perspectiveTool',
  'healthySelfTalk',
  'stressManagementTechniques',
  'howMuchStressWeighs',
  'howMuchStressWeighsFunny',
  'changingYourMindset',
];

const initialData = worksheetKeys.reduce((acc, key) => ({ ...acc, [key]: {} }), {});

interface WorksheetContextType {
  worksheetData: any;
  updateWorksheetData: (section: string, data: any) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const WorksheetContext = createContext<WorksheetContextType | undefined>(undefined);

export function WorksheetProvider({ children }: { children: ReactNode }) {
  const [worksheetData, setWorksheetData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('worksheetData');
      if (savedData) {
        setWorksheetData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage', error);
    }
  }, []);

  const updateWorksheetData = (section: string, data: any) => {
    setWorksheetData(prev => {
      const newData = { ...prev, [section]: data };
      try {
        localStorage.setItem('worksheetData', JSON.stringify(newData));
      } catch (error) {
        console.error('Failed to save data to localStorage', error);
      }
      return newData;
    });
  };

  return (
    <WorksheetContext.Provider value={{ worksheetData, updateWorksheetData, isSubmitting, setIsSubmitting }}>
      {children}
    </WorksheetContext.Provider>
  );
}

export function useWorksheetContext() {
  const context = useContext(WorksheetContext);
  if (context === undefined) {
    throw new Error('useWorksheetContext must be used within a WorksheetProvider');
  }
  return context;
}