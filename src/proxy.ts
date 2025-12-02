import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const DEFAULT_LOCALE = 'zh-CN'
const LOCALES = ['en', 'zh-CN']

export function proxy(req: NextRequest) {
    const { nextUrl: url, headers } = req
    const pathname = url.pathname

    // ignore public files and api routes
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return
    }

    // If path already contains a locale (e.g. /en/...), do nothing
    const pathnameIsMissingLocale = LOCALES.every(
        (locale) => !pathname.startsWith(`/${locale}`)
    )

    if (pathname === '/') {
        // Do a browser-detection redirect to defaultLocale or detected locale
        // (change detection logic as you prefer)
        const acceptLang = headers.get('accept-language')
        if (acceptLang) {
            const preferred = acceptLang
                .split(',')
                .map((s) => s.split(';')[0].trim())[0]
            const matched = LOCALES.find((l) =>
                preferred.startsWith(l.split('-')[0])
            )
            const locale = matched ?? DEFAULT_LOCALE
            return NextResponse.redirect(new URL(`/${locale}/`, req.url))
        }
        return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}/`, req.url))
    }

    if (pathnameIsMissingLocale) {
        // rewrite to default locale if missing (optional; you can instead redirect)
        const urlCopy = url.clone()
        urlCopy.pathname = `/${DEFAULT_LOCALE}${pathname}`
        return NextResponse.rewrite(urlCopy)
    }

    return
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
