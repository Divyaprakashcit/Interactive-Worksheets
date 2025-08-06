import { WorksheetProvider } from "../context"
import WorksheetTemplate from "../worksheets/template"

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorksheetProvider>
      <WorksheetTemplate>{children}</WorksheetTemplate>
    </WorksheetProvider>
  )
}
