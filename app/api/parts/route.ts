import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("parts")
    .select("*")
    .order("bmw_model", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const payload = await request.json();

  const { data, error } = await supabaseAdmin
    .from("parts")
    .insert(payload)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.[0] ?? null, { status: 201 });
}
