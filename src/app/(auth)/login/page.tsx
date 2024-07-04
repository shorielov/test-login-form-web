'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { LoginForm } from "./components/LoginForm/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  return (
    <div className='w-[315px] bg-stars bg-no-repeat bg-top bg-auto'>
      <h1 className='pt-20 pb-10 text-center text-2xl font-bold text-[#4A4E71]'>
        Sign up
      </h1>
      <LoginForm />
    </div>
  )
}
