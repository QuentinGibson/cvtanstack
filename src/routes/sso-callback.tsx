import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useClerk, useSignIn, useSignUp } from '@clerk/tanstack-react-start'
import { clerkClient } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { useEffect, useRef } from 'react'

const assignDefaultRole = createServerFn({ method: 'POST' })
  .validator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: 'user' },
    })
  })

export const Route = createFileRoute('/sso-callback')({
  component: SSOCallbackPage,
})

function SSOCallbackPage() {
  const navigate = useNavigate()
  const clerk = useClerk()
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const hasRun = useRef(false)

  useEffect(() => {
    if (!clerk.loaded || hasRun.current) return
    hasRun.current = true

    ;(async () => {
      try {
        // Existing user: sign-in is already complete
        if (signIn.status === 'complete') {
          await clerk.setActive({ session: signIn.createdSessionId })
          navigate({ to: '/' })
          return
        }

        // New user: OAuth sign-in needs to transfer to a new sign-up
        if (signIn.isTransferable) {
          await signUp.create({ transfer: true })
          if (signUp.status === 'complete') {
            await assignDefaultRole({ data: signUp.createdUserId! })
            await clerk.setActive({ session: signUp.createdSessionId })
            navigate({ to: '/' })
          } else {
            navigate({ to: '/sign-up' })
          }
          return
        }

        // Existing user came through sign-up flow: transfer to sign-in
        if (signUp.isTransferable) {
          await signIn.create({ transfer: true })
          if (signIn.status === 'complete') {
            await clerk.setActive({ session: signIn.createdSessionId })
            navigate({ to: '/' })
          } else {
            navigate({ to: '/sign-in' as '/' })
          }
          return
        }

        // Sign-up completed directly
        if (signUp.status === 'complete') {
          await assignDefaultRole({ data: signUp.createdUserId! })
          await clerk.setActive({ session: signUp.createdSessionId })
          navigate({ to: '/' })
          return
        }

        // Active session already exists
        if (signIn.existingSession || signUp.existingSession) {
          navigate({ to: '/' })
          return
        }

        // Fallback
        navigate({ to: '/' })
      } catch (err) {
        console.error('SSO callback error:', err)
        navigate({ to: '/sign-in' as '/' })
      }
    })()
  }, [clerk.loaded, signIn.status, signUp.status])

  return (
    <section className="min-h-screen flex items-center justify-center py-[100px]">
      <div className="text-center">
        <span className="logo text-brand block mb-[24px] animate-pulse">quent.</span>
        <p className="text-[13px] font-orbitron uppercase tracking-widest text-gray-500">
          Signing in…
        </p>
        <div className="mt-[32px] flex justify-center">
          <div className="w-[40px] h-[40px] border-2 border-border-light border-t-brand rounded-full animate-spin" />
        </div>
      </div>
    </section>
  )
}
