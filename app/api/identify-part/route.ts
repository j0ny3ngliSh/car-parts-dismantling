import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-1.5-flash";

type IdentifyPartRequest = {
  code: string;
};

type IdentifyPartResponse = {
  name: string;
  bmw_model: string;
  category: string;
  oem_code: string;
  description: string;
  compatible_with: string[];
};

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY environment variable." },
      { status: 500 }
    );
  }

  let body: IdentifyPartRequest;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body?.code || typeof body.code !== "string") {
    return NextResponse.json({ error: "Missing or invalid 'code' field." }, { status: 400 });
  }

  const code = body.code.trim();
  const prompt = `Ești un expert în piese BMW. Identifică piesa după codul [cod]. Returnează un obiect JSON cu: name, bmw_model, category, oem_code, description, compatible_with (array). Dacă nu ești sigur, fă cea mai bună presupunere bazată pe formatul codurilor BMW. Returnează DOAR codul JSON, fără formatare markdown. Cod scanat: ${code}`;

  try {
    const ai = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = ai.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 300,
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response?.text?.();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Gemini response missing text." }, { status: 500 });
    }

    let parsed: IdentifyPartResponse;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      return NextResponse.json(
        {
          error: "Failed to parse Gemini response as JSON.",
          raw: text,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to call Gemini.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
