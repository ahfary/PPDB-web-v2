// app/api/login/route.ts
import { NextResponse } from "next/server";
import { users } from "@/app/lib/firebase/user";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    console.log("RAW BODY:", body);

    const { username, password } = JSON.parse(body);

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("role", user.role, { httpOnly: true, path: "/" });
    return res;
  } catch (err) {
    console.error("JSON parse error:", err);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
