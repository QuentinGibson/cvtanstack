import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  ClerkProvider,
  useAuth,
} from '@clerk/tanstack-react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexReactClient } from 'convex/react'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import * as React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import StarBackground from '../components/StarBackground'
import appCss from '../styles.css?url'

// Server function — fetches the Clerk token during SSR
const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId, getToken } = await auth()
  const token = await getToken()
  return { userId, token }
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  convexClient: ConvexReactClient
  convexQueryClient: ConvexQueryClient
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { title: 'Cvbuilder' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: 'https://use.typekit.net/yva3pve.css' },
    ],
  }),

  // Inject the Clerk token into Convex's SSR HTTP client so
  // server-side queries are authenticated
  beforeLoad: async (ctx) => {
    const { userId, token } = await fetchClerkAuth()
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
    }
    return { userId, token }
  },

  notFoundComponent: () => (
    <div className="py-[150px] text-center">
      <h1 className="text-[60px] font-rajdhani text-text-main mb-[20px]">404</h1>
      <p className="text-[20px] font-orbitron text-gray-500 mb-[40px]">The page you are looking for does not exist.</p>
    </div>
  ),

  shellComponent: RootDocument,
  component: RootComponent,
})

function RootComponent() {
  const context = useRouteContext({ from: Route.id })
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={context.convexClient} useAuth={useAuth}>
        <Outlet />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <div className="relative z-10">
          <StarBackground />
          <Header />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </div>
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
