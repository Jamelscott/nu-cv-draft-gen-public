import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobText, contextText } = await request.json();

    if (!resumeText || !jobText) {
      return NextResponse.json(
        { error: "Resume text and job text are required" },
        { status: 400 }
      );
    }

    const prompt = `You are a professional cover letter writer. Based on the following information, write a compelling cover letter:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobText}

${contextText ? `ADDITIONAL CONTEXT:
${contextText}

` : ""}Please write a professional cover letter that:
1. Highlights relevant experience from the resume that matches the job requirements
2. Shows enthusiasm for the role and company
3. Demonstrates understanding of the job requirements
4. Uses professional language and formatting
5. Is concise but comprehensive (200-300 words)
6. Includes a strong opening and closing
7. Do not use double dashes (ex. --) anywhere.
8. fill the application in with todays date ${new Date()}.
9. omit the subject line.
10. in the header, only include the following in this order: 1. date, 2. Your full name, address, phone number, email. 3. Employer's contact information (if unknown,  use a placeholder and the user will manually input this data)
11. do not use ', as advertised' in the first sentence. you can simply cut off the first sentence before saying that.
Format the cover letter with proper spacing and structure.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const coverLetter = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!coverLetter) {
      throw new Error("No content generated");
    }

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Error generating cover letter:", error);

    // Handle specific Gemini API errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("429") || errorMessage.includes("Too Many Requests") || errorMessage.includes("quota")) {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later or upgrade your Gemini API plan." },
        { status: 429 }
      );
    }

    if (errorMessage.includes("400") || errorMessage.includes("Bad Request")) {
      return NextResponse.json(
        { error: "Invalid request. Please check your input data." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate cover letter. Please try again." },
      { status: 500 }
    );
  }
}
