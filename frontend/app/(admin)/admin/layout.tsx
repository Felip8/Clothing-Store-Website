"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth/View/contexts/AuthContext";
import { tokenUtil } from "@/lib/tokenUtil";
import { AdminSidebar } from "@/modules/admin/View/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push('/account');
      return;
    }

    const payload = tokenUtil.decodeToken();
    if (!payload || payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/account');
      return;
    }

    if (!tokenUtil.isAdmin()) {
      router.push('/unauthorized');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-lg font-['Alexandria']">Verificando autenticação...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
