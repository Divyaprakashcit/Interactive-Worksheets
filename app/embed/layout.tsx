import { WorksheetProvider } from "../context"

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorksheetProvider>
      <div className="bg-white p-4 md:p-6 lg:p-10">{children}</div>
    </WorksheetProvider>
  )
}
