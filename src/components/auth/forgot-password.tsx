"use client";

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Store email for password reset
    if (typeof window !== "undefined") {
      localStorage.setItem("resetEmail", email);
    }
    setSubmitted(true);
    // Redirect to reset password page after 2 seconds
    setTimeout(() => {
      router.push("/reset-password");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-lp-surface text-lp-on-background antialiased flex selection:bg-lp-primary-container selection:text-lp-on-primary-container">
      <div className="flex w-full min-h-screen flex-col lg:flex-row">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-lp-surface-container-low relative overflow-hidden flex-col items-center justify-center p-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lp-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="relative z-10 w-full max-w-xl rounded-xl shadow-[0_20px_40px_-15px_rgba(53,37,205,0.15)] border border-lp-outline-variant/30 bg-lp-surface-container-lowest/80 backdrop-blur-sm overflow-hidden">
            <img
              alt="Dashboard Preview"
              className="w-full h-full object-cover opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWzwdNTUTdRoBEmm01PaS76pgjU_BOQje65VCbE7DyfZkS8Bkk5MAA1fvDVOyzE1qCBP4nAQR5OGGjWnj1oyFq-DWCaLS7uO3xrKoLx0gxzaTTEjnvOlxAsYXP9KpUpV8ZWnhEOw_0ajxyBeq1kbsbwbV0gwSC7lNKBDSeXV6d57OcP2Vm_RNTKusboQqYI42hmolRRyVhiDM-iJRNruPwJyWP2JpCj4Dk3dQIqtmSdoAZ0N5mOWEiS1pQ_EsJbrWQMzwuDFlG-vv3"
            />
          </div>
          <div className="relative z-10 mt-4 text-center max-w-md">
            <h2 className="font-h2 text-h2 text-lp-on-surface mb-3">Reset Your Password</h2>
            <p className="font-body-md text-body-md text-lp-on-surface-variant">
              Don't worry, we'll help you get back into your account securely.
            </p>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="w-full lg:w-1/2 flex items-top justify-center p-8 sm:p-10 bg-lp-surface">
          <div className="w-full max-w-[420px] md:mt-12 mt-1">
            {/* Back Button */}
            <Link href="/login" className="inline-flex items-center gap-2 mb-6 text-lp-on-surface-variant hover:text-lp-primary transition-colors">
              <ArrowBackOutlinedIcon fontSize="small" />
              <span className="font-label-md text-label-md">Back to login</span>
            </Link>

            <div className="mb-8">
              {/* <div className="w-12 h-12 bg-lp-primary rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <BusinessOutlinedIcon className="text-white" />
              </div> */}
              <h1 className="font-h1 text-4xl text-lp-on-surface mb-3">Forgot password?</h1>
              <p className="font-body-md text-body-md text-lp-on-surface-variant">
                No worries. Enter your email address and we'll send you a reset link.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="email" className="block font-label-md text-label-md text-lp-on-surface mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 bg-lp-surface border border-lp-outline-variant rounded-xl font-body-md text-body-md text-lp-on-surface placeholder:text-lp-outline focus:outline-none focus:ring-2 focus:ring-lp-primary/20 focus:border-lp-primary transition-all shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-5 bg-lp-primary hover:bg-lp-primary-container text-lp-on-primary rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Send Reset Instructions
                </button>
              </form>
            ) : (
              <div className="text-center p-6 bg-lp-surface-container-low rounded-xl border border-lp-outline-variant">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-h3 text-h3 text-lp-on-surface mb-2">Check your email</h3>
                <p className="font-body-md text-body-md text-lp-on-surface-variant mb-4">
                  We've sent password reset instructions to{" "}
                  <span className="font-semibold text-lp-primary">{email}</span>
                </p>
                <p className="font-caption text-caption text-lp-on-surface-variant">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-lp-primary hover:text-lp-primary-container transition-colors"
                  >
                    try again
                  </button>
                </p>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="font-body-md text-body-md text-lp-on-surface-variant">
                Remember your password?{" "}
                <Link href="/login" className="font-label-md text-label-md text-lp-primary hover:text-lp-primary-container transition-colors">
                  Back to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}