import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Nu a fost primită nicio imagine." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Identify this BMW part from the label in the image. 
    Extract the following information and return it ONLY as a valid JSON object:
    {
      "name": "Part name",
      "bmw_model": "Compatible BMW model",
      "category": "Part category",
      "oem_code": "The numeric OEM part number",
      "description": "Short description",
      "compatible_with": ["model1", "model2"]
    }
    If you cannot find the info, make a best guess based on the part's appearance.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const partData = JSON.parse(cleanJson);

    return NextResponse.json(partData);
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "Eroare la procesarea imaginii." }, { status: 500 });
  }
}