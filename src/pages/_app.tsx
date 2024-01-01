import "@/styles/globals.css"
import type {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRouter } from "next/router"
import MainLayout from "@/components/layouts/Main"
import { Provider } from "react-redux"
import { store } from "@/app/store"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

type Page =
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | Iterable<ReactNode>
  | ReactPortal
  | PromiseLikeOfReactNode
  | null
  | undefined

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  let renderWithLayout
  switch (true) {
    case router.pathname.startsWith("/auth"):
      renderWithLayout = Component.getLayout || ((page: Page) => page)
      break
    default:
      renderWithLayout =
        Component.getLayout ?? ((page: Page) => <MainLayout>{page}</MainLayout>)
      break
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <main className={`${inter.className}`}>
          {renderWithLayout(<Component {...pageProps} />)}
          <Toaster />
        </main>
      </Provider>
    </QueryClientProvider>
  )
}
