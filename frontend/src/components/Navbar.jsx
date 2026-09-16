import {
  Search,
  Upload,
  Home,
  Grid2X2,
  Users,
  LogIn,
  Menu,
  X,
  UserRound,
  LogOut,
  UserCircle,
} from "lucide-react";

import { useState } from "react";

export default function Navbar({
  search,
  setSearch,
  onUpload,
  onHome,
  onApps,
  onDevelopers,
  onLogin,
  onProfile,
  user,
  onLogout,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // ==========================================
  // NAVIGATION
  // ==========================================

  const goHome = () => {
    setMobileOpen(false);
    onHome?.();
  };

  const goApps = () => {
    setMobileOpen(false);
    onApps?.();
  };

  const goDevelopers = () => {
    setMobileOpen(false);
    onDevelopers?.();
  };

  const goProfile = () => {
    setMobileOpen(false);
    onProfile?.();
  };

  const upload = () => {
    setMobileOpen(false);
    onUpload?.();
  };

  const login = () => {
    setMobileOpen(false);
    onLogin?.();
  };

  const logout = () => {
    setMobileOpen(false);
    onLogout?.();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* ==========================================
            BRAND
        ========================================== */}

        <button
          type="button"
          onClick={goHome}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="grid size-10 place-items-center border border-blue-600 bg-blue-600 text-[12px] font-black text-white transition group-hover:bg-blue-700">
            App
          </span>

          <div className="hidden text-left sm:block">
            <div className="text-[17px] font-black leading-none tracking-tight text-slate-950">
              developer.
            </div>

            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-blue-600">
              Build • Share • Discover
            </div>
          </div>
        </button>

        {/* ==========================================
            DESKTOP NAV
        ========================================== */}

        <nav className="ml-5 hidden items-center gap-1 lg:flex">

          <button
            onClick={goHome}
            type="button"
            className="flex items-center gap-2 border-b-2 border-blue-600 px-3 py-2 text-sm font-bold text-slate-900"
          >
            <Home size={16} />
            Home
          </button>

          <button
            onClick={goApps}
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-500 transition hover:text-blue-600"
          >
            <Grid2X2 size={16} />
            Apps
          </button>

          <button
            onClick={goDevelopers}
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-500 transition hover:text-blue-600"
          >
            <Users size={16} />
            Developers
          </button>

        </nav>

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div className="mx-auto flex h-11 max-w-[400px] flex-1 items-center border border-slate-300 bg-slate-50 px-3.5 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

          <Search
            size={18}
            className="mr-2.5 shrink-0 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications..."
            className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs font-bold text-slate-400 hover:text-slate-900"
            >
              ✕
            </button>
          )}

        </div>

        {/* ==========================================
            DESKTOP ACTIONS
        ========================================== */}

        <div className="hidden shrink-0 items-center gap-2 sm:flex">

          {/* UPLOAD */}

          <button
            type="button"
            onClick={upload}
            className="flex items-center gap-2 border border-blue-600 bg-blue-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Upload size={17} />

            <span className="hidden md:inline">
              Upload App
            </span>
          </button>

          {/* LOGGED IN */}

          {user ? (
            <div className="flex items-center gap-2">

              {/* PROFILE BUTTON */}

              <button
                type="button"
                onClick={goProfile}
                className="group flex items-center gap-2 border border-slate-200 px-3 py-2 transition hover:border-blue-300 hover:bg-blue-50"
                title="Open Profile"
              >

                <span className="grid size-7 place-items-center bg-slate-100 text-slate-600 transition group-hover:bg-blue-100 group-hover:text-blue-600">
                  <UserRound size={15} />
                </span>

                <span className="max-w-[110px] truncate text-xs font-bold text-slate-700 group-hover:text-blue-600">
                  {user.name || user.email}
                </span>

              </button>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={logout}
                className="grid size-10 place-items-center border border-slate-200 text-slate-500 transition hover:border-red-200 hover:text-red-600"
                title="Logout"
              >
                <LogOut size={17} />
              </button>

            </div>
          ) : (

            /* LOGIN */

            <button
              type="button"
              onClick={login}
              className="flex items-center gap-2 border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
            >
              <LogIn size={17} />
              Login
            </button>

          )}

        </div>

        {/* ==========================================
            MOBILE MENU BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="grid size-10 shrink-0 place-items-center border border-slate-300 text-slate-700 sm:hidden"
        >
          {mobileOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>

      </div>

      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white p-4 sm:hidden">

          <div className="space-y-1">

            {/* HOME */}

            <button
              type="button"
              onClick={goHome}
              className="flex w-full items-center gap-3 border border-transparent px-3 py-3 text-left text-sm font-bold text-slate-700 hover:border-slate-200 hover:text-blue-600"
            >
              <Home size={17} />
              Home
            </button>

            {/* APPLICATIONS */}

            <button
              type="button"
              onClick={goApps}
              className="flex w-full items-center gap-3 border border-transparent px-3 py-3 text-left text-sm font-bold text-slate-700 hover:border-slate-200 hover:text-blue-600"
            >
              <Grid2X2 size={17} />
              Applications
            </button>

            {/* DEVELOPERS */}

            <button
              type="button"
              onClick={goDevelopers}
              className="flex w-full items-center gap-3 border border-transparent px-3 py-3 text-left text-sm font-bold text-slate-700 hover:border-slate-200 hover:text-blue-600"
            >
              <Users size={17} />
              Developers
            </button>

            {/* LOGGED USER PROFILE */}

            {user && (
              <button
                type="button"
                onClick={goProfile}
                className="flex w-full items-center gap-3 border border-blue-100 bg-blue-50 px-3 py-3 text-left text-sm font-black text-blue-700"
              >
                <UserCircle size={18} />
                My Profile

                <span className="ml-auto text-xs text-blue-400">
                  {user.name || user.email}
                </span>
              </button>
            )}

            <div className="my-3 border-t border-slate-100" />

            {/* UPLOAD */}

            <button
              type="button"
              onClick={upload}
              className="flex w-full items-center justify-center gap-2 bg-blue-600 px-4 py-3 text-sm font-black text-white"
            >
              <Upload size={17} />
              Upload Application
            </button>

            {/* USER ACTION */}

            {user ? (
              <button
                type="button"
                onClick={logout}
                className="mt-2 flex w-full items-center justify-center gap-2 border border-red-200 px-4 py-3 text-sm font-bold text-red-600"
              >
                <LogOut size={17} />
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={login}
                className="mt-2 flex w-full items-center justify-center gap-2 border border-slate-300 px-4 py-3 text-sm font-black text-slate-700"
              >
                <LogIn size={17} />
                Login / Sign Up
              </button>
            )}

          </div>
        </div>
      )}

    </header>
  );
}