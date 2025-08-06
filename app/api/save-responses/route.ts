import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Create a unique filename based on timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const filename = `responses-${timestamp}.json`

    // In a real application, you would save this to a database
    // For this example, we'll simulate saving to a JSON file
    // Note: In Next.js, we're simulating file system operations

    // Create a data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Write the JSON file
    const filePath = path.join(dataDir, filename)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({
      success: true,
      message: "Responses saved successfully",
      filename,
    })
  } catch (error) {
    console.error("Error saving responses:", error)
    return NextResponse.json({ success: false, message: "Failed to save responses" }, { status: 500 })
  }
}
