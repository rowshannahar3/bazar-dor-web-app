import type { Metadata } from "next";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = { title: "সাইন আপ | বাজার দর" };

export default function SignUpPage() {
  return <SignUpForm />;
}