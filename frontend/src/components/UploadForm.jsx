import { useState } from "react";
import {
  X,
  Upload,
  ImagePlus,
  FileBox,
  CheckCircle2,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import { uploadApp } from "../services/api";

export default function UploadForm({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [apkFile, setApkFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  const [iconPreview, setIconPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  // ================= APK =================

  const handleApk = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".apk")) {
      alert("Please select a valid APK file.");
      return;
    }

    setApkFile(file);
  };

  // ================= ICON =================

  const handleIcon = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
  };

  // ================= SCREENSHOTS =================

  const handleScreenshots = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length < 4) {
      alert("Please select at least 4 screenshots.");
      return;
    }

    if (files.length > 6) {
      alert("Maximum 6 screenshots allowed.");
      return;
    }

    setScreenshots(files);

    setImagePreviews(
      files.map((file) => URL.createObjectURL(file))
    );
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apkFile) {
      alert("Please select APK file.");
      return;
    }

    if (!iconFile) {
      alert("Please upload app icon.");
      return;
    }

    if (screenshots.length < 4) {
      alert("Please upload 4–6 screenshots.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    // Make sure files are included
    formData.set("apk", apkFile);
    formData.set("icon", iconFile);

    screenshots.forEach((file) => {
      formData.append("screenshots", file);
    });

    try {
      setLoading(true);

      await uploadApp(formData);

      // SUCCESS STATE
      setLoading(false);
      setSuccess(true);

      // Give user time to see success animation
      setTimeout(() => {
        onSuccess();
      }, 1800);

    } catch (error) {
      console.error("Upload error:", error);

      setLoading(false);

      alert(
        error?.response?.data?.message ||
          "Application upload failed. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-3 sm:p-6">

      {/* FORM CONTAINER */}

      <div
        className={`my-3 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 sm:my-8 ${
          success
            ? "scale-[1.01]"
            : "animate-[fadeIn_.25s_ease-out]"
        }`}
      >

        {/* ================= HEADER ================= */}

        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-7">

          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-blue-600">
              DEVELOPER CENTER
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight">
              Upload Application
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Publish your Android application.
            </p>
          </div>

          {!loading && !success && (
            <button
              type="button"
              onClick={onClose}
              className="grid size-9 place-items-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              <X size={18} />
            </button>
          )}

        </div>


        {/* ================= SUCCESS ================= */}

        {success ? (

          <div className="flex min-h-[430px] flex-col items-center justify-center px-6 py-12 text-center">

            <div className="relative">

              <div className="absolute inset-0 animate-ping rounded-full bg-green-100" />

              <div className="relative grid size-24 place-items-center rounded-full bg-green-50">
                <CheckCircle2
                  size={52}
                  strokeWidth={2.5}
                  className="text-green-600"
                />
              </div>

            </div>

            <h2 className="mt-7 text-2xl font-black">
              Upload Successful
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Your application has been uploaded successfully
              and is now being processed.
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
              <CheckCircle2 size={15} />
              Application uploaded
            </div>

          </div>

        ) : (

          /* ================= FORM ================= */

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-5 sm:p-7"
          >

            {/* ================= APP ICON ================= */}

            <div>

              <label className="mb-2 block text-sm font-bold">
                App Icon
              </label>

              <div className="flex items-center gap-4">

                <label className="group relative block size-24 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-400">

                  {iconPreview ? (

                    <>
                      <img
                        src={iconPreview}
                        alt="App icon"
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                        <ImagePlus
                          size={21}
                          className="text-white"
                        />
                      </div>
                    </>

                  ) : (

                    <div className="flex h-full flex-col items-center justify-center">
                      <ImagePlus
                        size={23}
                        className="text-slate-400"
                      />

                      <span className="mt-1 text-[10px] font-bold text-slate-400">
                        1:1 Icon
                      </span>
                    </div>

                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleIcon}
                    className="hidden"
                  />

                </label>

                <div>
                  <p className="text-sm font-semibold">
                    Square app icon
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Recommended: 512 × 512 px
                    <br />
                    PNG, JPG or WEBP
                  </p>

                  {iconFile && (
                    <div className="mt-2 flex items-center gap-1 text-xs font-bold text-green-600">
                      <CheckCircle2 size={13} />
                      {iconFile.name}
                    </div>
                  )}
                </div>

              </div>

            </div>


            {/* ================= APP NAME ================= */}

            <Field
              label="App Name"
              name="name"
              placeholder="app name"
              required
            />


            {/* ================= DEVELOPER ================= */}

            <Field
              label="Developer Name"
              name="developer"
              placeholder="your name"
              required
            />


            {/* ================= DESCRIPTION ================= */}

            <div>

              <label className="mb-2 block text-sm font-bold">
                Description
              </label>

              <textarea
                name="description"
                rows="4"
                required
                placeholder="Tell users what your application does..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>


            {/* ================= VERSION ================= */}

            <div className="grid gap-4 sm:grid-cols-2">

              <Field
                label="Version"
                name="version"
                placeholder="1.0.0"
                required
              />

              <Field
                label="Android Version"
                name="android"
                placeholder="Android 12+"
                required
              />

            </div>


            {/* ================= APK ================= */}

            <div>

              <label className="mb-2 block text-sm font-bold">
                APK File
              </label>

              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed px-5 py-5 transition ${
                  apkFile
                    ? "border-green-300 bg-green-50"
                    : "border-blue-200 bg-blue-50 hover:border-blue-400"
                }`}
              >

                <div
                  className={`grid size-12 shrink-0 place-items-center rounded-xl ${
                    apkFile
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {apkFile ? (
                    <CheckCircle2 size={25} />
                  ) : (
                    <FileBox size={25} />
                  )}
                </div>

                <div className="min-w-0 flex-1">

                  <p
                    className={`truncate text-sm font-bold ${
                      apkFile
                        ? "text-green-700"
                        : "text-blue-700"
                    }`}
                  >
                    {apkFile
                      ? apkFile.name
                      : "Select APK file"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {apkFile
                      ? `${formatBytes(apkFile.size)} • Ready to upload`
                      : "Only .apk files are accepted"}
                  </p>

                </div>

                {!apkFile && (
                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-600 shadow-sm">
                    Browse
                  </span>
                )}

                <input
                  type="file"
                  accept=".apk"
                  onChange={handleApk}
                  className="hidden"
                />

              </label>

            </div>


            {/* ================= SCREENSHOTS ================= */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm font-bold">
                  App Screenshots
                </label>

                <span className="text-xs font-semibold text-slate-400">
                  4–6 images
                </span>

              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-7 text-center transition hover:border-blue-300 hover:bg-blue-50/40">

                <ImagePlus
                  size={28}
                  className="text-slate-400"
                />

                <p className="mt-2 text-sm font-bold">
                  Select screenshots
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Choose 4 to 6 images
                </p>

                <input
  type="file"
  accept="image/png,image/jpeg,image/webp"
  multiple
  onChange={handleScreenshots}
  className="hidden"
/>

              </label>


              {/* SQUARE PREVIEWS */}

              {imagePreviews.length > 0 && (

                <div className="mt-4">

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-xs font-bold text-slate-500">
                      Selected screenshots
                    </span>

                    <span className="text-xs font-bold text-green-600">
                      {imagePreviews.length}/6 selected
                    </span>

                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">

                    {imagePreviews.map((image, index) => (

                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                      >

                        <img
                          src={image}
                          alt={`Screenshot ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute bottom-1 left-1 grid size-5 place-items-center rounded-md bg-white/90 text-[10px] font-black text-slate-700">
                          {index + 1}
                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              )}

            </div>


            {/* ================= UPLOAD STATUS ================= */}

            {loading && (

              <div className="overflow-hidden rounded-xl border border-blue-100 bg-blue-50">

                <div className="flex items-center gap-3 px-4 py-3">

                  <LoaderCircle
                    size={20}
                    className="animate-spin text-blue-600"
                  />

                  <div className="flex-1">

                    <p className="text-sm font-bold text-blue-800">
                      Uploading application...
                    </p>

                    <p className="text-xs text-blue-500">
                      APK and screenshots are being uploaded.
                    </p>

                  </div>

                  <span className="text-xs font-black text-blue-600">
                    Uploading
                  </span>

                </div>

                {/* ANIMATED BAR */}

                <div className="h-1 overflow-hidden bg-blue-100">
                  <div className="h-full w-1/2 animate-[uploadMove_1.2s_ease-in-out_infinite] bg-blue-600" />
                </div>

              </div>

            )}


            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />

                  Uploading Application...
                </>
              ) : (
                <>
                  <Upload size={18} />

                  Upload Application
                </>
              )}

            </button>

            <p className="text-center text-[11px] text-slate-400">
              Your application will be sent to the server for processing.
            </p>

          </form>

        )}

      </div>

      {/* CSS ANIMATION */}

      <style>
        {`
          @keyframes uploadMove {
            0% {
              transform: translateX(-100%);
            }

            50% {
              transform: translateX(100%);
            }

            100% {
              transform: translateX(250%);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(15px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

    </div>
  );
}


// ================= FIELD =================

function Field({
  label,
  name,
  placeholder,
  required,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <input
        type="text"
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
      />

    </div>
  );
}


// ================= FILE SIZE =================

function formatBytes(bytes) {
  if (!bytes) return "0 KB";

  const mb = bytes / 1024 / 1024;

  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`;
  }

  return `${(bytes / 1024).toFixed(0)} KB`;
}