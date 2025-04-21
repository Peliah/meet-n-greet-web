"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoInput } from "@/components/ui/neo-input";
import { NeoButton } from "@/components/ui/neo-button";
import { PageTransition } from "@/components/navigation/page-transition";
import { useAuthStore } from "@/hooks/use-auth-store";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        // For demo purposes, redirect based on email
        if (email === "admin@example.com") {
          router.push("/admin");
        } else {
          router.push("/events");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-block mb-6">
          <NeoButton variant="secondary">
            <ArrowLeft size={18} className="mr-2" />
            Back to home
          </NeoButton>
        </Link>

        <div className="max-w-md mx-auto">
          <NeoCard className="mb-8">
            <h1 className="text-3xl font-extrabold mb-6">LOGIN</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <NeoInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <NeoInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                  {error}
                </div>
              )}
              
              <NeoButton type="submit" fullWidth disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign In"}
              </NeoButton>
            </form>
            
            <div className="mt-6">
              <p className="text-center text-gray-600">
                For demo purposes, you can log in with:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="bg-gray-100 p-2">
                  <strong>Admin:</strong> admin@example.com (any password)
                </li>
                <li className="bg-gray-100 p-2">
                  <strong>Client:</strong> client@example.com (any password)
                </li>
              </ul>
            </div>
          </NeoCard>
        </div>
      </div>
    </PageTransition>
  );
}