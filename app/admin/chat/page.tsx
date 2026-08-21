'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import AdminChat from '@/components/admin/chat/AdminChat'

export default function AdminChatPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    } else if (!loading && user && !isAdmin) {
      router.push('/')
    }
  }, [loading, user, isAdmin, router])

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="pt-16 px-4 md:px-8 pb-8 max-w-[1400px] mx-auto">
      <AdminChat />
    </div>
  )
}
