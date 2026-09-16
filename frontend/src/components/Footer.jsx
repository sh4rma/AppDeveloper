import {
  Smartphone,
  Code2,
  ShieldCheck,
  Upload,
} from "lucide-react";

export default function Footer({
  onExploreApps,
  onUpload,
  onProfile,
}) {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* MAIN FOOTER */}

        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-3">

              {/* SAME NAVBAR LOGO */}

              <div className="grid h-11 w-11 shrink-0 place-items-center bg-blue-600 text-[11px] font-black text-white">
                App
              </div>

              <div>

                <p className="text-base font-black leading-none tracking-tight text-slate-950">
                  developer.
                </p>

                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Build • Share • Discover
                </p>

              </div>

            </div>

            <p className="mt-5 max-w-sm text-xs leading-6 text-slate-500">
              Discover, share and explore Android applications
              built by developers and creators from the community.
            </p>

            <div className="mt-5 flex items-center gap-2">

              <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-blue-600">

                <Smartphone size={11} />

                Android

              </span>

              <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500">

                <Code2 size={11} />

                Developer Community

              </span>

            </div>

          </div>

          {/* PLATFORM */}

          <div>

            <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-950">
              Platform
            </h3>

            <div className="mt-5 space-y-3">

              <button
                type="button"
                onClick={onExploreApps}
                className="block text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                Explore Apps
              </button>

              <button
                type="button"
                onClick={onUpload}
                className="flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                <Upload size={13} />
                Upload Application
              </button>

              <button
                type="button"
                onClick={onProfile}
                className="block text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                Developer Profile
              </button>

            </div>

          </div>

          {/* DEVELOPER */}

          <div>

            <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-950">
              Developer
            </h3>

            <div className="mt-5 space-y-3">

              <button
                type="button"
                onClick={onUpload}
                className="block text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                Publish Your App
              </button>

              <button
                type="button"
                className="block text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                Developer Guidelines
              </button>

              <button
                type="button"
                className="block text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                App Requirements
              </button>

            </div>

          </div>

          {/* SUPPORT */}

          <div>

            <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-950">
              Support
            </h3>

            <div className="mt-5 space-y-3">

              <button
                type="button"
                className="block text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                Help Center
              </button>

              <button
                type="button"
                className="block text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                Contact Us
              </button>

              <button
                type="button"
                className="block text-xs font-medium text-slate-500 transition hover:text-blue-600"
              >
                Privacy Policy
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM BAR */}

        <div className="flex flex-col gap-4 border-t border-slate-200 py-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[10px] font-medium text-slate-400">
            © 2026 AppDeveloper. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">

            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Built for Android Developers
            </span>

            <span className="hidden h-3 w-px bg-slate-200 sm:block" />

            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-green-600">

              <span className="size-1.5 bg-green-500" />

              Platform Active

            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}