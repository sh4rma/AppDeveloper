import {
  Upload,
  ChevronRight,
  ShieldCheck,
  Users,
  Smartphone,
  Code2,
} from "lucide-react";

export default function Hero({ onExplore, onUpload }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/developer.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-[#071a31]/85" />

      {/* Decorative blocks */}

      <div className="absolute right-[-100px] top-[-100px] h-72 w-72 border-[50px] border-sky-400/10" />

      <div className="absolute bottom-[-120px] left-[-100px] h-80 w-80 border-[45px] border-green-400/10" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

        <div className="max-w-3xl">

          {/* LABEL */}

          <div className="animate-[fadeUp_.5s_ease-out] inline-flex items-center gap-2 border border-sky-300/30 bg-sky-400/10 px-3 py-1.5 text-[10px] font-black tracking-[0.18em] text-sky-200">

            <Code2 size={13} />

            APPDEVELOPER

          </div>

          {/* HEADING */}

          <h1 className="mt-5 animate-[fadeUp_.6s_ease-out] text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">

            Discover.

            <span className="block text-sky-300">
              Download.
            </span>

            <span className="block text-white">
              Build.
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="mt-6 max-w-2xl animate-[fadeUp_.7s_ease-out] text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">

            Explore Android demo applications created by
            developers, students and creators. Find an app,
            check its details and download the APK.

          </p>

          {/* BUTTONS */}

          <div className="mt-8 flex animate-[fadeUp_.8s_ease-out] flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={onExplore}
              className="group flex items-center justify-center gap-2 bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-500 active:scale-[0.98]"
            >
              Explore Applications

              <ChevronRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={onUpload}
              className="flex items-center justify-center gap-2 border border-white/30 bg-white px-6 py-3.5 text-sm font-black text-slate-900 transition hover:bg-slate-100 active:scale-[0.98]"
            >
              <Upload size={17} />

              Upload Demo App
            </button>

          </div>

          {/* FEATURES */}

          <div className="mt-9 grid max-w-xl grid-cols-3 border-t border-white/15 pt-5">

            <div className="border-r border-white/15 pr-3">

              <ShieldCheck
                size={17}
                className="text-green-400"
              />

              <p className="mt-2 text-xs font-bold text-white">
                Direct APK
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Easy downloads
              </p>

            </div>

            <div className="border-r border-white/15 px-3">

              <Users
                size={17}
                className="text-sky-300"
              />

              <p className="mt-2 text-xs font-bold text-white">
                Developers
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Community apps
              </p>

            </div>

            <div className="pl-3">

              <Smartphone
                size={17}
                className="text-green-400"
              />

              <p className="mt-2 text-xs font-bold text-white">
                Android
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                APK applications
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}