import { createFileRoute, redirect } from '@tanstack/react-router'
import { useUser, useClerk } from '@clerk/tanstack-react-start'
import { clerkClient } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import { useState, useRef, useEffect } from 'react'
import { Camera, Mail, Link2, User as UserIcon, Loader2, Github, Shield } from 'lucide-react'

type Role = 'admin' | 'mod' | 'author' | 'user'

type UserRow = {
  id: string
  name: string
  email: string
  imageUrl: string
  role: Role
}

// ── Server functions ──────────────────────────────────────────────────────────

const requireAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth()
  if (!userId) throw redirect({ to: '/sign-in' })
  return { userId }
})

const fetchAllUsers = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const client = await clerkClient()
  const me = await client.users.getUser(userId)
  if ((me.publicMetadata as any)?.role !== 'admin') {
    throw new Error('Unauthorized')
  }
  const { data } = await client.users.getUserList({ limit: 200, orderBy: '-created_at' })
  return data.map((u): UserRow => ({
    id: u.id,
    name: u.firstName || u.emailAddresses[0]?.emailAddress || 'Unknown',
    email: u.emailAddresses[0]?.emailAddress || '',
    imageUrl: u.imageUrl,
    role: ((u.publicMetadata as any)?.role as Role) ?? 'user',
  }))
})

const updateUserRole = createServerFn({ method: 'POST' })
  .inputValidator((d: { targetUserId: string; role: Role }) => d)
  .handler(async ({ data }) => {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')
    const client = await clerkClient()
    const me = await client.users.getUser(userId)
    if ((me.publicMetadata as any)?.role !== 'admin') {
      throw new Error('Unauthorized')
    }
    await client.users.updateUserMetadata(data.targetUserId, {
      publicMetadata: { role: data.role },
    })
  })

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/account')({
  beforeLoad: async () => await requireAuth(),
  component: AccountPage,
})

// ── Page ──────────────────────────────────────────────────────────────────────

function AccountPage() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const isAdmin = (user?.publicMetadata as any)?.role === 'admin'
  const [activeTab, setActiveTab] = useState<'profile' | 'connections' | 'users'>('profile')

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    )
  }

  const tabs = [
    { id: 'profile' as const, label: 'General', icon: <UserIcon className="w-4 h-4" /> },
    { id: 'connections' as const, label: 'Connections', icon: <Link2 className="w-4 h-4" /> },
    ...(isAdmin ? [{ id: 'users' as const, label: 'Users', icon: <Shield className="w-4 h-4" /> }] : []),
  ]

  return (
    <section className="py-[120px] px-[15px] min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-[40px] flex items-end justify-between">
          <div>
            <span className="logo text-brand block mb-[8px]">quent.</span>
            <h1 className="text-[42px] font-rajdhani text-text-main leading-tight mb-[8px]">
              Account
            </h1>
            <div className="w-[50px] h-[2px] bg-brand" />
          </div>
          <button
            onClick={() => signOut()}
            className="text-[12px] font-orbitron uppercase tracking-widest text-gray-500 hover:text-brand transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-[40px]">
          {/* Sidebar */}
          <div className="w-full md:w-[240px] shrink-0 space-y-[8px]">
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-[12px] px-[16px] py-[12px] rounded-[4px] text-[12px] font-orbitron uppercase tracking-widest transition-all ${
                  activeTab === id
                    ? 'bg-brand/10 text-brand border border-brand/20'
                    : 'text-gray-400 hover:bg-dark-bg border border-transparent hover:border-border-light'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-dark-bg/50 border border-border-light rounded-[4px] p-[24px] md:p-[40px]">
            {activeTab === 'profile' && <ProfileSettings user={user} />}
            {activeTab === 'connections' && <ConnectionsSettings user={user} />}
            {activeTab === 'users' && isAdmin && <UsersSettings />}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Profile tab ───────────────────────────────────────────────────────────────

function ProfileSettings({ user }: { user: any }) {
  const [username, setUsername] = useState(user.firstName || '')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    setIsSaving(true)
    setError('')
    try {
      await user.update({ firstName: username })
    } catch (err: any) {
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Failed to save'
      setError(msg)
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        await user.setProfileImage({ file })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="space-y-[40px]">
      <div>
        <h2 className="text-[24px] font-rajdhani text-text-main mb-[8px]">Profile Details</h2>
        <p className="text-[12px] font-orbitron text-gray-500 uppercase tracking-widest">
          Manage your public identity
        </p>
      </div>

      <div className="flex items-center gap-[24px]">
        <div className="relative group">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-[100px] h-[100px] rounded-full border-2 border-brand/40 object-cover"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="w-6 h-6 text-white mb-1" />
            <span className="text-[10px] text-white font-orbitron uppercase">Edit</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div>
          <h3 className="text-text-main font-rajdhani text-[20px]">{user.firstName || 'User'}</h3>
          <p className="text-gray-400 font-orbitron text-[12px] mt-1">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <div className="space-y-[8px]">
        <label className="text-[11px] font-orbitron text-gray-400 uppercase tracking-widest block">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. johndoe"
          className="w-full bg-transparent border border-border-light rounded-[4px] px-[16px] py-[12px] text-text-main font-orbitron text-[13px] focus:border-brand focus:outline-none transition-colors placeholder:text-gray-600"
        />
        {error && <p className="text-[11px] font-orbitron text-red-500">{error}</p>}
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-brand text-dark-bg px-[24px] py-[12px] rounded-[4px] font-orbitron text-[12px] uppercase tracking-widest hover:bg-text-main transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

// ── Connections tab ───────────────────────────────────────────────────────────

function ConnectionsSettings({ user }: { user: any }) {
  return (
    <div className="space-y-[40px]">
      <div>
        <h2 className="text-[24px] font-rajdhani text-text-main mb-[8px]">Account Connections</h2>
        <p className="text-[12px] font-orbitron text-gray-500 uppercase tracking-widest">
          Manage your emails and linked accounts
        </p>
      </div>

      <div>
        <h3 className="text-[14px] font-orbitron text-text-main uppercase tracking-widest mb-[16px] border-b border-border-light pb-[8px]">
          Email Addresses
        </h3>
        <div className="space-y-[12px]">
          {user.emailAddresses.map((email: any) => (
            <div key={email.id} className="flex items-center justify-between p-[16px] border border-border-light rounded-[4px] bg-dark-bg/30">
              <div className="flex items-center gap-[12px]">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-text-main font-orbitron text-[13px]">{email.emailAddress}</p>
                  <div className="flex gap-[8px] mt-1">
                    {user.primaryEmailAddressId === email.id && (
                      <span className="text-[10px] bg-brand/10 text-brand px-2 py-0.5 rounded font-orbitron uppercase">Primary</span>
                    )}
                    {email.verification?.status === 'verified' ? (
                      <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded font-orbitron uppercase">Verified</span>
                    ) : (
                      <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded font-orbitron uppercase">Unverified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[14px] font-orbitron text-text-main uppercase tracking-widest mb-[16px] border-b border-border-light pb-[8px] mt-[40px]">
          Connected Accounts
        </h3>
        <div className="space-y-[12px]">
          {user.externalAccounts.map((account: any) => (
            <div key={account.id} className="flex items-center justify-between p-[16px] border border-border-light rounded-[4px] bg-dark-bg/30">
              <div className="flex items-center gap-[12px]">
                {account.provider === 'github' ? <Github className="w-5 h-5 text-text-main" /> : <Link2 className="w-5 h-5 text-gray-500" />}
                <div>
                  <p className="text-text-main font-orbitron text-[13px] capitalize">{account.provider}</p>
                  <p className="text-gray-500 font-orbitron text-[11px]">{account.emailAddress}</p>
                </div>
              </div>
              <button
                onClick={() => account.destroy()}
                className="text-[11px] font-orbitron uppercase text-red-500/80 hover:text-red-500 transition-colors"
              >
                Disconnect
              </button>
            </div>
          ))}
          {user.externalAccounts.length === 0 && (
            <p className="text-[13px] font-orbitron text-gray-500">No external accounts connected.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Users tab (admin only) ────────────────────────────────────────────────────

const ROLES: Role[] = ['admin', 'mod', 'author', 'user']

const ROLE_STYLES: Record<Role, string> = {
  admin: 'bg-red-500/10 text-red-400 border-red-500/20',
  mod: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  author: 'bg-brand/10 text-brand border-brand/20',
  user: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

function UsersSettings() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)

  useEffect(() => {
    fetchAllUsers().then(setUsers).finally(() => setIsLoading(false))
  }, [])

  const handleRoleChange = async (targetUserId: string, role: Role) => {
    setSavingId(targetUserId)
    try {
      await updateUserRole({ data: { targetUserId, role } })
      setUsers((prev) => prev.map((u) => (u.id === targetUserId ? { ...u, role } : u)))
    } catch (err) {
      console.error('Failed to update role:', err)
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="space-y-[40px]">
      <div>
        <h2 className="text-[24px] font-rajdhani text-text-main mb-[8px]">User Management</h2>
        <p className="text-[12px] font-orbitron text-gray-500 uppercase tracking-widest">
          Manage roles for all users
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-[40px]">
          <Loader2 className="w-6 h-6 text-brand animate-spin" />
        </div>
      ) : (
        <div className="space-y-[8px]">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between p-[16px] border border-border-light rounded-[4px] bg-dark-bg/30"
            >
              <div className="flex items-center gap-[12px]">
                <img
                  src={u.imageUrl}
                  alt={u.name}
                  className="w-[36px] h-[36px] rounded-full border border-border-light object-cover"
                />
                <div>
                  <p className="text-text-main font-orbitron text-[13px]">{u.name}</p>
                  <p className="text-gray-500 font-orbitron text-[11px]">{u.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-[12px]">
                <span className={`text-[10px] font-orbitron uppercase px-2 py-0.5 rounded border ${ROLE_STYLES[u.role]}`}>
                  {u.role}
                </span>
                <div className="relative">
                  {savingId === u.id ? (
                    <Loader2 className="w-4 h-4 text-brand animate-spin" />
                  ) : (
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                      className="bg-dark-bg border border-border-light rounded-[4px] px-[10px] py-[6px] text-text-main font-orbitron text-[11px] uppercase tracking-widest focus:border-brand focus:outline-none transition-colors cursor-pointer"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
