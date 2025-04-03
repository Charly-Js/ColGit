import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json()

    if (!code || typeof code !== "string" || !language || typeof language !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that debugs ${language} code. Analyze the code, identify any issues, and provide suggestions for fixes.`,
        },
        {
          role: "user",
          content: `Debug this ${language} code:

${code}`,
        },
      ],
    })

    const result = completion.choices[0]?.message?.content

    if (!result) {
      return NextResponse.json({ error: "No debug result received from OpenAI" }, { status: 500 })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error in debug API:", error)
    return NextResponse.json(
      { error: "An error occurred while debugging: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}

