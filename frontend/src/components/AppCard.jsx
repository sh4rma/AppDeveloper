import {
  Download,
  Star,
  User,
  ArrowRight,
  Smartphone,
} from "lucide-react";

const API_URL = "http://localhost:5000";

function getFileUrl(path) {
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path}`;
}

export default function AppCard({ app, onClick }) {
  const icon = getFileUrl(app.iconUrl);

  const screenshot = app.screenshots?.[0]
    ? getFileUrl(app.screenshots[0])
    : null;

  return (
    <article className="group overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40">

      {/* ================================
          SCREENSHOT
      ================================= */}

      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">

        {screenshot ? (
          <img
            src={screenshot}
            alt={app.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Smartphone
              size={35}
              className="text-slate-300"
            />
          </div>
        )}

        {/* Android */}

        <div className="absolute left-3 top-3 flex items-center gap-1 bg-white px-2.5 py-1 text-[10px] font-black text-slate-600 shadow-sm">
          <Smartphone size={11} />
          ANDROID
        </div>

        {/* Version */}

        {app.version && (
          <span className="absolute right-3 top-3 bg-green-600 px-2.5 py-1 text-[11px] font-bold text-white">
            v{app.version}
          </span>
        )}

      </div>


      {/* ================================
          CONTENT
      ================================= */}

      <div className="p-5">

        {/* APP INFO */}

        <div className="flex items-start gap-3">

          {/* ICON */}

          <div className="h-14 w-14 shrink-0 overflow-hidden border border-slate-200 bg-blue-50">

            {icon ? (
              <img
                src={icon}
                alt={app.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center text-xl font-black text-blue-600">
                {app.name?.charAt(0)?.toUpperCase()}
              </div>
            )}

          </div>


          {/* NAME + DEVELOPER */}

          <div className="min-w-0 flex-1">

            <h3 className="truncate text-lg font-black text-slate-900">
              {app.name}
            </h3>

            <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-slate-500">

              <User
                size={13}
                className="shrink-0"
              />

              <span className="truncate">
                {app.developer || "Independent Developer"}
              </span>

            </div>

          </div>

        </div>


        {/* ================================
            RATING
        ================================= */}

        <div className="mt-4 flex items-center gap-3">

          <span className="flex items-center gap-1 text-sm font-bold text-amber-500">

            <Star
              size={15}
              fill="currentColor"
            />

            {app.rating
              ? Number(app.rating).toFixed(1)
              : "New"}

          </span>

          <span className="text-xs text-slate-300">
            •
          </span>

          <span className="text-xs text-slate-500">
            Android {app.android || "8.0+"}
          </span>

        </div>


        {/* ================================
            DESCRIPTION
        ================================= */}

        <p className="mt-4 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">

          {app.description ||
            "Android application demo published by a developer."}

        </p>


        {/* ================================
            BOTTOM
        ================================= */}

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">

            <Download size={14} />

            {app.downloads || 0} downloads

          </div>


          {/* VIEW APP */}

          <button
            type="button"
            onClick={() => onClick(app)}
            className="group/btn flex items-center gap-1.5 bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-blue-700 active:scale-95"
          >

            View App

            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
            />

          </button>

        </div>

      </div>

    </article>
  );
}