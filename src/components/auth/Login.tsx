"use client";

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("portalLoggedIn", "true");
    }
    router.push("/pricing");
  };

  return (
    <div className="min-h-screen bg-background text-on-background antialiased flex selection:bg-primary-container selection:text-on-primary-container">
      <div className="flex w-full min-h-screen flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-surface-container-low relative overflow-hidden flex-col items-center justify-center p-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="relative z-10 w-full max-w-xl rounded-xl shadow-[0_20px_40px_-15px_rgba(53,37,205,0.15)] border border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-sm overflow-hidden">
            <img
              alt="Dashboard Preview"
              className="w-full h-auto object-cover opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWzwdNTUTdRoBEmm01PaS76pgjU_BOQje65VCbE7DyfZkS8Bkk5MAA1fvDVOyzE1qCBP4nAQR5OGGjWnj1oyFq-DWCaLS7uO3xrKoLx0gxzaTTEjnvOlxAsYXP9KpUpV8ZWnhEOw_0ajxyBeq1kbsbwbV0gwSC7lNKBDSeXV6d57OcP2Vm_RNTKusboQqYI42hmolRRyVhiDM-iJRNruPwJyWP2JpCj4Dk3dQIqtmSdoAZ0N5mOWEiS1pQ_EsJbrWQMzwuDFlG-vv3"
            />
          </div>
          <div className="relative z-10 mt-4 text-center max-w-md">
            <h2 className="font-h2 text-h2 text-on-surface mb-3">Efficient Workspace</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Streamline your daily operations with our human-centric, high-performance platform designed for enterprise clarity.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-5 bg-surface-container-lowest">
          <div className="w-full max-w-[420px]">
            <div className="mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <BusinessOutlinedIcon />
              </div>
              <h1 className="font-h1 text-4xl text-on-surface mb-3">Welcome back</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sign in to your Enterprise HRMS account.
              </p>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-surface-container-lowest border-2 border-gray-300 rounded-xl hover:bg-surface-container-low transition-colors duration-200"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="font-label-md text-label-md text-on-surface">Sign in with Google</span>
              </button>

              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface-container-lowest border-2 border-gray-300 rounded-xl hover:bg-surface-container-low transition-colors duration-200"
                type="button"
              >
                <KeyOutlinedIcon className="text-[#6B7280]" />
                <span className="font-label-md text-label-md text-on-surface">Continue with SSO</span>
              </button>
            </div>

            <div className="relative flex items-center mb-4">
              <div className="flex-grow border-t border-2 border-gray-300/50"></div>
              <span className="flex-shrink-0 mx-4 font-caption text-caption text-on-surface-variant">Or sign in with email</span>
              <div className="flex-grow border-t border-2 border-gray-300/50"></div>
            </div>

            <form
              action="#"
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor="email" className="block font-label-md text-label-md text-on-surface mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block font-label-md text-label-md text-on-surface">
                    Password
                  </label>
                  <Link className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="/forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-3 px-5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-10 flex flex-col gap-3 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Don&apos;t have an account?{' '}
                <Link className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="/register">
                  Create Account
                </Link>
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Looking for your team?{' '}
                <Link className="font-label-md text-label-md text-secondary hover:text-secondary-container transition-colors" href="#">
                  Find workspace
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
