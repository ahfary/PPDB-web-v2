// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const role = request.cookies.get('role')?.value

  // Bypass untuk file statis dan API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  } 

  // Middleware khusus untuk dashboard admin
  if (pathname.startsWith('/dashboard/admin')) {
    // Kalau tidak ada cookie role atau role bukan admin, redirect
    if (!role || role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/admin/:path*'],
}
