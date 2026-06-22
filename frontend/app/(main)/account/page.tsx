"use client";

import { useState } from "react";
import { useAuth } from "@/modules/auth/View/contexts/AuthContext";
import { AccountDetails } from "@/modules/auth/View/components/AccountDetails";
import { SignUpForm } from "@/modules/auth/View/components/SignUpForm";
import { SignInForm } from "@/modules/auth/View/components/SignInForm";

export default function AccountPage() {
    const [showRegister, setShowRegister] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex flex-col bg-gray-100 min-h-screen items-center justify-center">
            {isAuthenticated ? (
                <AccountDetails />
            ) : (
                showRegister ? (
                    <SignUpForm onSwitchToSignIn={() => setShowRegister(false)} />
                ) : (
                    <SignInForm onSwitchToSignUp={() => setShowRegister(true)} />
                )
            )}
        </div>
    );
}
