import { useState } from "react";
import {
  UserRound,
  Mail,
  Lock,
  UserPlus,
  ArrowLeft,
  LogIn,
} from "lucide-react";

import { registerUser } from "../services/auth";

export default function Signup({
  onBack,
  onLogin,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        name,
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

        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to AppDeveloper
        </button>

        <div className="border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}
          <div className="border-b border-slate-200 p-6 sm:p-8">
            <div className="mb-5 grid size-12 place-items-center bg-blue-600 text-white">
              <UserPlus size={22} />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
              Developer Registration
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Build your profile.
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Create an account and start sharing your Android applications.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 sm:p-8"
          >
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* NAME */}
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                Full Name
              </label>

              <div className="flex h-12 items-center border border-slate-300 bg-slate-50 px-3 focus-within:border-blue-500 focus-within:bg-white">
                <UserRound size={17} className="mr-3 text-slate-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  required
                />
              </div>
            </div>

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
                  placeholder="Minimum 6 characters"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  required
                />
              </div>
            </div>

            {/* CONFIRM */}
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                Confirm Password
              </label>

              <div className="flex h-12 items-center border border-slate-300 bg-slate-50 px-3 focus-within:border-blue-500 focus-within:bg-white">
                <Lock size={17} className="mr-3 text-slate-400" />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Repeat your password"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 bg-blue-600 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus size={17} />

              {loading
                ? "Creating account..."
                : "Create Developer Account"}
            </button>
          </form>

          <div className="border-t border-slate-200 p-6 text-center sm:p-8">
            <p className="text-sm text-slate-500">
              Already have an account?
            </p>

            <button
              type="button"
              onClick={onLogin}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 border border-slate-300 text-sm font-black text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
            >
              <LogIn size={16} />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}