'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import AdminChat from '@/components/admin/chat/AdminChat'

export default function AdminChatPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/')
    else if (!loading && user && !isAdmin) router.push('/')
  }, [loading, user, isAdmin, router])

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Full-screen, only AI (no footer/padding) - the admin/chat layout removes the shell
  return (
    <div className="h-screen w-full overflow-hidden bg-white">
      <AdminChat />
    </div>
  )
}
