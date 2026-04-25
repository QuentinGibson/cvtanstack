import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import Footer from '../components/Footer'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { title: 'Cvbuilder' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  notFoundComponent: () => (
    <div className="py-[150px] text-center">
      <h1 className="text-[60px] font-crimson text-text-main mb-[20px]">404</h1>
      <p className="text-[20px] font-montserrat text-gray-500 mb-[40px]">The page you are looking for does not exist.</p>
    </div>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <div>
          <Header />
          <main>
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
