import { useState } from "react";
import {
  Mail,
  Lock,
  LogIn,
  ShieldCheck,
  ArrowLeft,
  UserPlus,
} from "lucide-react";

import { loginUser } from "../services/auth";

export default function Login({
  onBack,
  onSignup,
  onAdminLogin,
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onSuccess?.(data.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">

        {/* BACK */}
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to AppDeveloper
        </button>

        {/* CARD */}
        <div className="border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}
          <div className="border-b border-slate-200 p-6 sm:p-8">
            <div className="mb-5 grid size-12 place-items-center bg-blue-600 text-white">
              <LogIn size={22} />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
              Developer Account
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Welcome back.
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to manage your applications and publish your work.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 sm:p-8"
          >
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                Email Address
              </label>

              <div className="flex h-12 items-center border border-slate-300 bg-slate-50 px-3 focus-within:border-blue-500 focus-within:bg-white">
                <Mail size={17} className="mr-3 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@example.com"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                Password
              </label>

              <div className="flex h-12 items-center border border-slate-300 bg-slate-50 px-3 focus-within:border-blue-500 focus-within:bg-white">
                <Lock size={17} className="mr-3 text-slate-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  required
                />
              </div>
            </div>

            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 bg-blue-600 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={17} />

              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* FOOTER */}
          <div className="border-t border-slate-200 p-6 sm:p-8">

            <p className="text-center text-sm text-slate-500">
              Don't have a developer account?
            </p>

            <button
              type="button"
              onClick={onSignup}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 border border-slate-300 text-sm font-black text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
            >
              <UserPlus size={16} />
              Create Developer Account
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Admin
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              onClick={onAdminLogin}
              className="flex h-11 w-full items-center justify-center gap-2 border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600 transition hover:border-blue-300 hover:bg-white hover:text-blue-600"
            >
              <ShieldCheck size={17} />
              Admin Login
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          AppDeveloper · Developer Application Platform
        </p>
      </div>
    </main>
  );
}