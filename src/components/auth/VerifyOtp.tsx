"use client";

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function VerifyOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("registrationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      // Verify OTP logic here
      console.log("Verifying OTP:", otpValue);
      // Clear registration data after successful verification
      localStorage.removeItem("registrationEmail");
      localStorage.removeItem("registrationData");
      router.push("/login?verified=true");
    } else {
      alert("Please enter the complete 6-digit code");
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      // Resend OTP logic here
      console.log("Resending OTP to:", email);
      setTimeLeft(300);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      
      // Start timer again
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background text-on-background antialiased flex selection:bg-primary-container selection:text-on-primary-container">
      <div className="flex w-full min-h-screen flex-col lg:flex-row">
        {/* Left Side - Hero Section */}
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
          <div className="relative z-10 mt-10 text-center max-w-md">
            <h2 className="font-h2 text-h2 text-on-surface mb-3">Verify Your Identity</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Secure your account with two-factor authentication for enhanced protection.
            </p>
          </div>
        </div>

        {/* Right Side - OTP Verification Form */}
        <div className="w-full lg:w-1/2 flex items-stretch justify-center p-8 sm:p-10 bg-surface-container-lowest">
          <div className="w-full max-w-[480px] md:mt-12 mt-1">
            {/* Back Button */}
            <Link href="/register" className="inline-flex items-center gap-2 mb-6 text-on-surface-variant hover:text-primary transition-colors">
              <ArrowBackOutlinedIcon fontSize="small" />
              <span className="font-label-md text-label-md">Back to registration</span>
            </Link>

            <div className="mb-8">
              {/* <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <BusinessOutlinedIcon className="text-white" />
              </div> */}
              <h1 className="font-h1 text-4xl text-on-surface mb-3">Verify your email</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We've sent a verification code to{" "}
                <span className="font-semibold text-primary">{email || "your email"}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* OTP Input Fields */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-4 text-center">
                  Enter 6-digit verification code
                </label>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-14 text-center text-2xl font-semibold bg-surface border-2 border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              {/* Timer and Resend */}
              <div className="text-center">
                {!canResend ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Code expires in{" "}
                    <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
                  >
                    Resend verification code
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200"
              >
                Verify Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Wrong email address?{" "}
                <Link href="/register" className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors">
                  Edit email
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}