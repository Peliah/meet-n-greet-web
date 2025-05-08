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
import { useSignIn } from "@clerk/nextjs";
import { checkRole } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!isLoaded) {
        return
      }
      try {
        const result = await signIn.create({
          identifier: email,
          password: password,
        });
        const success = await login(result);

        if (success) {
          // For demo purposes, redirect based on role
          if (await checkRole('admin')) {
            router.push("/admin");
          } else {
            router.push("/events");
          }
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } catch (error) {
        setError("Invalid credentials. Please try again.");
        return
      } finally {
      }
      setIsLoading(false);
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

              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Register
                </Link>
              </div>
            </form>

            {/* <div className="mt-6">
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
            </div> */}
          </NeoCard>
        </div>
      </div>
    </PageTransition>
  );
}