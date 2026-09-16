import { useState } from "react";

import {
  ShieldCheck,
  ArrowLeft,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000";

export default function AdminLogin({
  onBack,
  onSuccess,
}) {
  // ==========================================
  // STATE
  // ==========================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // ======================================
      // SEND LOGIN REQUEST TO BACKEND
      // ======================================

      const response = await fetch(
        `${API_URL}/api/auth/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      // ======================================
      // READ RESPONSE
      // ======================================

      const data = await response.json();

      // ======================================
      // LOGIN FAILED
      // ======================================

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Admin login failed."
        );
      }

      // ======================================
      // EXTRA FRONTEND SECURITY CHECK
      // ======================================

      if (data.user?.role !== "admin") {
        throw new Error(
          "Access denied. Admin account required."
        );
      }

      // ======================================
      // SAVE ADMIN SESSION
      // ======================================

      localStorage.setItem(
        "adminToken",
        data.token
      );

      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.user)
      );

      console.log(
        "ADMIN LOGIN SUCCESS:",
        data.user
      );

      // ======================================
      // OPEN ADMIN PANEL
      // ======================================

      onSuccess?.(data.user);

    } catch (error) {
      console.error(
        "ADMIN LOGIN ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to login as admin."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-10 sm:py-16">

      <div className="mx-auto max-w-md">

        {/* ==================================
            BACK
        ================================== */}

        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={16} />

          Back to Developer Login
        </button>

        {/* ==================================
            LOGIN CARD
        ================================== */}

        <div className="border border-slate-200 bg-white shadow-sm">

          {/* ==================================
              HEADER
          ================================== */}

          <div className="border-b border-slate-200 p-6 sm:p-8">

            <div className="mb-5 grid size-12 place-items-center bg-blue-600 text-white">
              <ShieldCheck size={23} />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-950">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage AppDeveloper.
            </p>

          </div>

          {/* ==================================
              FORM
          ================================== */}

          <form
            className="space-y-5 p-6 sm:p-8"
            onSubmit={handleSubmit}
          >

            {/* ERROR */}

            {error && (
              <div className="flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">

                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {error}
                </span>

              </div>
            )}

            {/* EMAIL */}

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                Admin Email
              </label>

              <div className="flex h-12 items-center border border-slate-300 bg-slate-50 px-3 transition focus-within:border-blue-500 focus-within:bg-white">

                <Mail
                  size={17}
                  className="mr-3 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@appdeveloper.com"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  autoComplete="email"
                  required
                />

              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                Admin Password
              </label>

              <div className="flex h-12 items-center border border-slate-300 bg-slate-50 px-3 transition focus-within:border-blue-500 focus-within:bg-white">

                <Lock
                  size={17}
                  className="mr-3 text-slate-400"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter admin password"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  autoComplete="current-password"
                  required
                />

              </div>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 bg-blue-600 text-sm font-black text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <LogIn
                    size={17}
                    className="animate-pulse"
                  />

                  Signing in...
                </>
              ) : (
                <>
                  <ShieldCheck size={17} />

                  Admin Sign In
                </>
              )}

            </button>

          </form>

        </div>

        {/* ==================================
            FOOTER
        ================================== */}

        <p className="mt-6 text-center text-xs text-slate-400">
          AppDeveloper · Administration Portal
        </p>

      </div>

    </main>
  );
}