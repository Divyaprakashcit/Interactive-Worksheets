import { NextResponse } from "next/server"
import { PDFDocument, rgb, StandardFonts, PDFFont } from "pdf-lib"

// Define a type for the worksheet data for better type safety
interface WorksheetData {
  [key: string]: { [key: string]: any }
}

// A robust text wrapping function
function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const testLine = currentLine.length > 0 ? `${currentLine} ${word}` : word
    const width = font.widthOfTextAtSize(testLine, fontSize)

    if (width < maxWidth) {
      currentLine = testLine
    } else {
      if (currentLine.length > 0) {
        lines.push(currentLine)
      }
      currentLine = word
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine)
  }
  return lines
}

// A function to format complex answers (objects/arrays) into readable text
function formatComplexAnswer(answer: any): string {
  if (typeof answer === "string") return answer
  if (typeof answer === "boolean") return answer ? "Yes" : "No"
  if (Array.isArray(answer)) return answer.join(", ")
  if (typeof answer === "object" && answer !== null) {
    return (
      Object.entries(answer)
        .filter(([, value]) => value) // Only show selected/true options
        .map(([key]) =>
          key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
        ) // Format key
        .join(", ") || "No items selected"
    )
  }
  return String(answer)
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data: WorksheetData = await request.json()

    const pdfDoc = await PDFDocument.create()
    let page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const margin = 50
    const contentWidth = width - 2 * margin
    let y = height - margin

    const ensurePageSpace = (requiredSpace: number) => {
      if (y - requiredSpace < margin) {
        page = pdfDoc.addPage()
        y = height - margin
      }
    }

    // --- PDF Header ---
    ensurePageSpace(30)
    page.drawText("Stress Management Reynlab Report", {
      x: margin,
      y,
      font: boldFont,
      size: 18,
    })
    y -= 25

    ensurePageSpace(20)
    page.drawText(`Generated on: ${new Date().toLocaleString()}`,
      {
        x: margin,
        y,
        font,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      }
    )
    y -= 30

    // --- Process and draw worksheet data ---
    for (const [sectionKey, sectionValue] of Object.entries(data)) {
      if (Object.values(sectionValue).every((v) => !v)) continue // Skip empty sections

      ensurePageSpace(40)

      // Section Title
      const sectionTitle = sectionKey
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())

      page.drawText(sectionTitle, {
        x: margin,
        y,
        font: boldFont,
        size: 14,
      })
      y -= 25

      // Section Content
      for (const [questionKey, answerValue] of Object.entries(sectionValue)) {
        if (!answerValue || (typeof answerValue === "string" && !answerValue.trim()))
          continue

        const questionText =
          questionKey
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()) + ":"

        const answerText = formatComplexAnswer(answerValue)

        const questionLines = wrapText(questionText, boldFont, 11, contentWidth)
        const answerLines = wrapText(answerText, font, 11, contentWidth - 15) // Indent answers

        const requiredSpace = (questionLines.length + answerLines.length) * 15 + 10
        ensurePageSpace(requiredSpace)

        // Draw Question
        for (const line of questionLines) {
          page.drawText(line, { x: margin, y, font: boldFont, size: 11 })
          y -= 15
        }

        // Draw Answer
        for (const line of answerLines) {
          page.drawText(line, { x: margin + 15, y, font, size: 11 })
          y -= 15
        }

        y -= 10 // Extra space between Q&A pairs
      }
      y -= 15 // Add extra space between sections
    }

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="WorkplaceEQ_Report.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json(
      { success: false, message: "Failed to generate PDF", error: errorMessage },
      { status: 500 }
    )
  }
}
