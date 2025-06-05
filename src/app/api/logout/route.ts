import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.set('role', '', { path: '/', maxAge: 0 }) // hapus cookie
  return res
}
