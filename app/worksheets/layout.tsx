import { WorksheetProvider } from "../context"
import { SidebarNav } from "@/components/sidebar-nav"

export default function WorksheetLayout({ children }: { children: React.ReactNode }) {
  const sidebarNavItems = [
    { title: "Stress Symptom Checklist", href: "/worksheets/stress-symptom-checklist" },
    { title: "Daily Stressors", href: "/worksheets/daily-stressors" },
    { title: "Stress Management Plan", href: "/worksheets/stress-management-plan" },
    { title: "Stressful Life Events", href: "/worksheets/stressful-life-events" },
    { title: "Resilient Mindset", href: "/worksheets/resilient-mindset" },
    { title: "Changing Your Mindset", href: "/worksheets/changing-your-mindset" },
    { title: "Perspective Tool", href: "/worksheets/perspective-tool" },
    { title: "Healthy Self-Talk", href: "/worksheets/healthy-self-talk" },
    { title: "Stress Management Techniques", href: "/worksheets/stress-management-techniques" },
    { title: "How Much Stress Weighs", href: "/worksheets/how-much-stress-weighs" },
    { title: "How Much Stress Weighs (Funny)", href: "/worksheets/how-much-stress-weighs-funny" },
  ]

  return (
    <WorksheetProvider>
      <div className="space-y-6 p-4 md:p-6 lg:p-10 pb-16 block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
    </WorksheetProvider>
  )
}