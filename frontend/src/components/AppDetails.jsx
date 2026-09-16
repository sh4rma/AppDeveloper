import { useState } from "react";

import {
  ArrowLeft,
  Download,
  Star,
  Smartphone,
  User,
  ShieldCheck,
  HardDrive,
} from "lucide-react";

const API_URL = "http://localhost:5000";

function getFileUrl(path) {
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path}`;
}

export default function AppDetails({
  app,
  onBack,
  onDownload,
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  if (!app) return null;

  const icon = getFileUrl(app.iconUrl);

  // ==========================================
  // DOWNLOAD ANIMATION
  // ==========================================

  const handleDownload = async () => {
  if (downloading) return;

  setDownloading(true);
  setDownloadProgress(0);

  let progress = 0;

  const interval = setInterval(() => {
    progress += 1;

    setDownloadProgress(progress);

    if (progress >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        setDownloading(false);
        onDownload(app);
      }, 300);
    }
  }, 40);
};

  return (
    <div className="min-h-screen bg-white">

      {/* ==================================
          TOP BAR
      ================================== */}

      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center px-4 py-3">

          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-2 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>

      </div>


      <main className="mx-auto max-w-6xl px-4 py-8">

        {/* ==================================
            APP HEADER
        ================================== */}

        <section className="border border-slate-200 bg-white p-5 sm:p-7">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* ICON */}

            <div className="h-24 w-24 shrink-0 overflow-hidden border border-slate-200 bg-blue-50">

              {icon ? (
                <img
                  src={icon}
                  alt={app.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center text-4xl font-black text-blue-600">
                  {app.name?.charAt(0)?.toUpperCase()}
                </div>
              )}

            </div>


            {/* APP INFO */}

            <div className="flex-1">

              <p className="text-xs font-black tracking-widest text-blue-600">
                ANDROID APPLICATION
              </p>

              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {app.name}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                <User size={15} />

                <span>
                  By {app.developer || "Independent Developer"}
                </span>

              </div>


              {/* TAGS */}

              <div className="mt-4 flex flex-wrap gap-2">

                <span className="border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                  Android {app.android || "8.0+"}
                </span>

                <span className="border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                  Version {app.version || "1.0"}
                </span>

                <span className="border border-slate-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                  Demo App
                </span>

              </div>

            </div>


            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="flex shrink-0 items-center justify-center gap-2 bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
            >
              <Download
                size={18}
                className={downloading ? "animate-bounce" : ""}
              />

              {downloading
                ? `Downloading ${downloadProgress}%`
                : "Download APK"}
            </button>

          </div>

        </section>


        {/* ==================================
            STATS
        ================================== */}

        <section className="mt-5 grid grid-cols-2 border border-slate-200 bg-white sm:grid-cols-4">

          <Info
            icon={<Star size={18} />}
            label="Rating"
            value={
              app.rating
                ? `${Number(app.rating).toFixed(1)}/5`
                : "New"
            }
          />

          <Info
            icon={<Download size={18} />}
            label="Downloads"
            value={app.downloads || 0}
          />

          <Info
            icon={<HardDrive size={18} />}
            label="App Size"
            value={app.size || "Unknown"}
          />

          <Info
            icon={<Smartphone size={18} />}
            label="Platform"
            value="Android"
          />

        </section>


        {/* ==================================
            DESCRIPTION
        ================================== */}

        <section className="mt-6 border border-slate-200 bg-white p-5 sm:p-7">

          <h2 className="text-xl font-black text-slate-900">
            About this app
          </h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
            {app.description ||
              "Android application demo published by a developer."}
          </p>

        </section>


        {/* ==================================
            SCREENSHOTS
        ================================== */}

        {app.screenshots?.length > 0 && (

          <section className="mt-6 border border-slate-200 bg-white p-5 sm:p-7">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-black text-slate-900">
                Screenshots
              </h2>

              <span className="text-xs font-bold text-slate-400">
                {app.screenshots.length} images
              </span>

            </div>


            <div className="mt-5 flex gap-4 overflow-x-auto pb-2">

              {app.screenshots
                .slice(0, 6)
                .map((image, index) => (

                  <img
                    key={index}
                    src={getFileUrl(image)}
                    alt={`${app.name} screenshot ${index + 1}`}
                    className="h-72 w-40 shrink-0 border border-slate-200 object-cover"
                  />

                ))}

            </div>

          </section>

        )}


        {/* ==================================
            APP INFORMATION
        ================================== */}

        <section className="mt-6 border border-slate-200 bg-white p-5 sm:p-7">

          <h2 className="text-xl font-black text-slate-900">
            App information
          </h2>

          <div className="mt-5 divide-y divide-slate-100">

            <Row
              label="Application name"
              value={app.name}
            />

            <Row
              label="Developer"
              value={app.developer || "Independent Developer"}
            />

            <Row
              label="Version"
              value={app.version || "1.0"}
            />

            <Row
              label="Android requirement"
              value={app.android || "8.0+"}
            />

            <Row
              label="Application size"
              value={app.size || "Unknown"}
            />

            <Row
              label="Downloads"
              value={app.downloads || 0}
            />

          </div>

        </section>


        {/* ==================================
            SAFETY
        ================================== */}

        <section className="mt-6 border border-green-200 bg-green-50 p-5">

          <div className="flex gap-3">

            <ShieldCheck
              size={22}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <div>

              <h3 className="font-black text-green-800">
                Developer submitted application
              </h3>

              <p className="mt-1 text-sm leading-6 text-green-700">
                This application has been reviewed and published
                on AppDeveloper. Always verify the developer and
                application details before installing an APK.
              </p>

            </div>

          </div>

        </section>


        {/* ==================================
            BOTTOM DOWNLOAD
        ================================== */}

        <div className="mt-8 border border-slate-200 bg-slate-50 p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="font-black text-slate-900">
                Ready to install?
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Download {app.name} APK
              </p>

            </div>


            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 bg-green-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
            >

              <Download
                size={18}
                className={downloading ? "animate-bounce" : ""}
              />

              {downloading
                ? `Downloading ${downloadProgress}%`
                : "Download APK"}

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}


/* ==================================
   INFO
================================== */

function Info({ icon, label, value }) {

  return (
    <div className="border-r border-slate-200 p-4 last:border-r-0">

      <div className="flex items-center gap-2 text-blue-600">

        {icon}

        <span className="text-xs font-bold text-slate-400">
          {label}
        </span>

      </div>

      <p className="mt-2 text-base font-black text-slate-900">
        {value}
      </p>

    </div>
  );
}


/* ==================================
   INFORMATION ROW
================================== */

function Row({ label, value }) {

  return (
    <div className="flex items-center justify-between gap-5 py-4">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-bold text-slate-900">
        {value || "—"}
      </span>

    </div>
  );
}