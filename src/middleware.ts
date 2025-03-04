import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const authCookie = request.cookies.get('auth-token')

    if (authCookie && request.nextUrl.pathname === '/') {
        try {
            return NextResponse.redirect(new URL('/todo', request.url))
        } catch (error) {
            console.error(error)
        }
    }

    // const user = localStorage.getItem('user')

    // console.log(user)

    // if(!user) return NextResponse.redirect(new URL('/login', request.url))
    // if(user && request.nextUrl.pathname === '/') return NextResponse.redirect(new URL('/todo', request.url))
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}