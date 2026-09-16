import { useState } from "react";

import {
  UserRound,
  Mail,
  Package,
  CheckCircle2,
  Clock3,
  XCircle,
  Upload,
  Settings,
  LockKeyhole,
  LogOut,
  ArrowLeft,
  Edit3,
  Download,
  Smartphone,
  Code2,
  ShieldCheck,
  ChevronRight,
  Phone,
  MapPin,
  BriefcaseBusiness,
  VenusAndMars,
  CalendarDays,
  Save,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000";


// ==========================================
// FILE URL
// ==========================================

function getFileUrl(path) {
  if (!path) return null;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${API_URL}${path}`;
}


// ==========================================
// PROFILE
// ==========================================

export default function Profile({
  user,
  apps = [],
  onBack,
  onUpload,
  onLogout,
  onProfileUpdate,
}) {
  const currentUser = user || {
    name: "Developer",
    email: "developer@example.com",
  };


  // ==========================================
  // EDIT MODAL
  // ==========================================

  const [showEdit, setShowEdit] = useState(false);

  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    address: currentUser.address || "",
    profession: currentUser.profession || "",
    gender: currentUser.gender || "",
    phone: currentUser.phone || "",
  });


  // ==========================================
  // DEVELOPER APPLICATIONS
  // ==========================================

  const myApps = apps.filter(
    (app) =>
      app.developer?.trim().toLowerCase() ===
      currentUser.name?.trim().toLowerCase()
  );


  // ==========================================
  // STATS
  // ==========================================

  const published = myApps.filter(
    (app) => app.status === "published"
  ).length;

  const pending = myApps.filter(
    (app) => app.status === "pending"
  ).length;

  const rejected = myApps.filter(
    (app) => app.status === "rejected"
  ).length;


  const totalDownloads = myApps.reduce(
    (total, app) =>
      total + (Number(app.downloads) || 0),
    0
  );


  // ==========================================
  // INITIALS
  // ==========================================

  const initials =
    currentUser.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "DV";


  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ==========================================
  // OPEN EDIT
  // ==========================================

  const openEditProfile = () => {
    setEditForm({
      name: currentUser.name || "",
      email: currentUser.email || "",
      address: currentUser.address || "",
      profession: currentUser.profession || "",
      gender: currentUser.gender || "",
      phone: currentUser.phone || "",
    });

    setShowEdit(true);
  };


  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!editForm.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (
      editForm.phone &&
      !/^[0-9+\-\s()]{7,20}$/.test(editForm.phone)
    ) {
      alert("Please enter a valid mobile number.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editForm.name.trim(),
            address: editForm.address.trim(),
            profession: editForm.profession.trim(),
            gender: editForm.gender,
            phone: editForm.phone.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Profile update failed."
        );
      }


      // ========================================
      // UPDATE LOCAL STORAGE
      // ========================================

      const updatedUser = {
        ...currentUser,
        ...data.user,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      // ========================================
      // UPDATE PARENT STATE
      // ========================================

      if (onProfileUpdate) {
        onProfileUpdate(updatedUser);
      }

      setShowEdit(false);

      alert("Profile updated successfully.");

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      alert(
        error.message ||
          "Unable to update profile."
      );

    } finally {
      setSaving(false);
    }
  };


  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f6f8fb] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto max-w-7xl">


        {/* =========================================
            TOP BAR
        ========================================= */}

        <div className="mb-5 flex items-center justify-between">

          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500 transition hover:text-blue-600 sm:text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>


          <span className="hidden text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 sm:block">
            Developer Workspace
          </span>

        </div>


        {/* =========================================
            PROFILE HERO
        ========================================= */}

        <section className="border border-slate-200 bg-white">

          <div className="h-2 bg-blue-600" />


          <div className="p-5 sm:p-7 lg:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


              {/* PROFILE IDENTITY */}

              <div className="flex min-w-0 items-center gap-4 sm:gap-5">

                <div className="grid h-20 w-20 shrink-0 place-items-center bg-blue-600 text-2xl font-black text-white sm:h-24 sm:w-24 sm:text-3xl">
                  {initials}
                </div>


                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="border border-blue-200 bg-blue-50 px-2 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-blue-600">
                      Developer
                    </span>


                    <span className="flex items-center gap-1 border border-green-200 bg-green-50 px-2 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-green-600">
                      <CheckCircle2 size={11} />
                      Active
                    </span>

                  </div>


                  <h1 className="mt-2 truncate text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                    {currentUser.name}
                  </h1>


                  <div className="mt-2 flex min-w-0 items-center gap-2 text-sm text-slate-500">

                    <Mail
                      size={15}
                      className="shrink-0"
                    />

                    <span className="truncate">
                      {currentUser.email}
                    </span>

                  </div>


                  {currentUser.profession && (
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <BriefcaseBusiness size={14} />
                      {currentUser.profession}
                    </div>
                  )}

                </div>

              </div>


              {/* ACTIONS */}

              <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">

                <button
                  type="button"
                  onClick={openEditProfile}
                  className="flex h-11 items-center justify-center gap-2 border border-slate-300 px-5 text-xs font-black uppercase tracking-wide text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
                >
                  <Edit3 size={15} />
                  Edit Profile
                </button>

              </div>

            </div>

          </div>


          {/* ACCOUNT META */}

          <div className="grid border-t border-slate-200 sm:grid-cols-3">

            <MetaItem
              icon={<Code2 size={15} />}
              label="Account Type"
              value="Developer"
            />

            <MetaItem
              icon={<ShieldCheck size={15} />}
              label="Account Status"
              value="Verified / Active"
            />

            <MetaItem
              icon={<Smartphone size={15} />}
              label="Platform"
              value="Android Applications"
            />

          </div>

        </section>


        {/* =========================================
            STATS
        ========================================= */}

        <section className="mt-5 grid grid-cols-2 border-l border-t border-slate-200 sm:grid-cols-4">

          <Stat
            icon={<Package size={18} />}
            label="Applications"
            value={myApps.length}
          />

          <Stat
            icon={<CheckCircle2 size={18} />}
            label="Published"
            value={published}
            valueClass="text-green-600"
          />

          <Stat
            icon={<Clock3 size={18} />}
            label="Pending"
            value={pending}
            valueClass="text-amber-600"
          />

          <Stat
            icon={<Download size={18} />}
            label="Downloads"
            value={totalDownloads}
            valueClass="text-blue-600"
          />

        </section>


        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">


          {/* =======================================
              MY APPLICATIONS
          ======================================= */}

          <section className="min-w-0 border border-slate-200 bg-white">


            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

              <div>

                <div className="flex items-center gap-2">

                  <div className="h-5 w-1 bg-blue-600" />

                  <h2 className="text-lg font-black text-slate-950 sm:text-xl">
                    My Applications
                  </h2>

                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Manage applications submitted from your developer account.
                </p>

              </div>

            </div>


            {myApps.length === 0 ? (

              <EmptyApplications
                onUpload={onUpload}
              />

            ) : (

              <div className="divide-y divide-slate-200">

                {myApps.map((app) => (

                  <ApplicationCard
                    key={app._id}
                    app={app}
                  />

                ))}

              </div>

            )}

          </section>


          {/* =======================================
              DEVELOPER SIDEBAR
          ======================================= */}

          <aside className="space-y-5">


            {/* DEVELOPER TOOLS */}

            <section className="border border-slate-200 bg-white">

              <div className="border-b border-slate-200 p-5">

                <div className="flex items-center gap-2">

                  <div className="grid h-8 w-8 place-items-center bg-blue-50 text-blue-600">
                    <Code2 size={16} />
                  </div>

                  <div>

                    <h2 className="text-sm font-black text-slate-950">
                      Developer Tools
                    </h2>

                    <p className="text-[10px] text-slate-400">
                      Account management
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-2">

                <ToolButton
                  icon={<Settings size={17} />}
                  title="Account Settings"
                  description="Manage your account"
                />

                <ToolButton
                  icon={<LockKeyhole size={17} />}
                  title="Change Password"
                  description="Update your password"
                />

                <ToolButton
                  icon={<ShieldCheck size={17} />}
                  title="Security"
                  description="Account security"
                />

              </div>

            </section>


            {/* PUBLISH CARD */}

            <section className="border border-blue-200 bg-blue-50">

              <div className="p-5">

                <div className="flex items-start justify-between">

                  <div className="grid h-10 w-10 place-items-center bg-blue-600 text-white">
                    <Upload size={18} />
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-500">
                    Developer
                  </span>

                </div>


                <h3 className="mt-5 text-base font-black text-slate-950">
                  Publish an application
                </h3>


                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Upload your Android APK and share your project
                  with users through AppDeveloper.
                </p>


                <button
                  type="button"
                  onClick={onUpload}
                  className="mt-4 flex h-10 w-full items-center justify-center gap-2 bg-blue-600 text-xs font-black uppercase tracking-wide text-white transition hover:bg-blue-700"
                >
                  <Upload size={14} />
                  Upload Application
                </button>

              </div>

            </section>


            {/* ACCOUNT INFO */}

            <section className="border border-slate-200 bg-white">

              <div className="border-b border-slate-200 p-5">

                <h2 className="text-sm font-black text-slate-950">
                  Account Information
                </h2>

              </div>


              <div className="p-5">

                <InfoRow
                  label="Name"
                  value={currentUser.name}
                />

                <InfoRow
                  label="Email"
                  value={currentUser.email}
                />

                <InfoRow
                  label="Phone"
                  value={currentUser.phone}
                />

                <InfoRow
                  label="Profession"
                  value={currentUser.profession}
                />

                <InfoRow
                  label="Gender"
                  value={currentUser.gender}
                />

                <InfoRow
                  label="Address"
                  value={currentUser.address}
                />

                <InfoRow
                  label="Role"
                  value="Developer"
                />

                <InfoRow
                  label="Status"
                  value="Active"
                  valueClass="text-green-600"
                />

              </div>

            </section>


            {/* LOGOUT */}

            <button
              type="button"
              onClick={onLogout}
              className="flex h-11 w-full items-center justify-center gap-2 border border-red-200 bg-white text-xs font-black uppercase tracking-wide text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>

          </aside>

        </div>

      </div>


      {/* ==========================================
          EDIT PROFILE MODAL
      ========================================== */}

      {showEdit && (

        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 p-3 sm:p-6">

          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">


            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                  Developer Account
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                  Edit Profile
                </h2>

              </div>


              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="grid h-9 w-9 place-items-center bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
              >
                <X size={18} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSaveProfile}
              className="space-y-5 p-5 sm:p-7"
            >

              {/* NAME */}

              <ProfileField
                icon={<UserRound size={16} />}
                label="Full Name"
              >
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="profile-input"
                />
              </ProfileField>


              {/* EMAIL */}

              <ProfileField
                icon={<Mail size={16} />}
                label="Email Address"
              >
                <input
                  type="email"
                  value={editForm.email}
                  disabled
                  className="profile-input cursor-not-allowed bg-slate-100 text-slate-400"
                />

                <p className="mt-1 text-[10px] text-slate-400">
                  Email cannot be changed from here.
                </p>

              </ProfileField>


              {/* PHONE */}

              <ProfileField
                icon={<Phone size={16} />}
                label="Mobile Number"
              >
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="profile-input"
                />
              </ProfileField>


              {/* PROFESSION */}

              <ProfileField
                icon={<BriefcaseBusiness size={16} />}
                label="Profession"
              >
                <input
                  type="text"
                  name="profession"
                  value={editForm.profession}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                  className="profile-input"
                />
              </ProfileField>


              {/* GENDER */}

              <ProfileField
                icon={<VenusAndMars size={16} />}
                label="Gender"
              >

                <select
                  name="gender"
                  value={editForm.gender}
                  onChange={handleChange}
                  className="profile-input"
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                  <option value="Prefer not to say">
                    Prefer not to say
                  </option>

                </select>

              </ProfileField>


              {/* ADDRESS */}

              <ProfileField
                icon={<MapPin size={16} />}
                label="Address"
              >

                <textarea
                  name="address"
                  value={editForm.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter your address"
                  className="profile-input resize-none"
                />

              </ProfileField>


              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  disabled={saving}
                  className="flex h-11 items-center justify-center gap-2 border border-slate-300 px-5 text-xs font-black uppercase tracking-wide text-slate-600 transition hover:bg-slate-50"
                >
                  <X size={15} />
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-11 items-center justify-center gap-2 bg-blue-600 px-6 text-xs font-black uppercase tracking-wide text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <Save size={15} />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}


// ==========================================
// PROFILE FIELD
// ==========================================

function ProfileField({
  icon,
  label,
  children,
}) {
  return (
    <div>

      <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-600">

        <span className="text-blue-600">
          {icon}
        </span>

        {label}

      </label>

      {children}

    </div>
  );
}


// ==========================================
// STAT
// ==========================================

function Stat({
  icon,
  label,
  value,
  valueClass = "text-slate-950",
}) {
  return (
    <div className="border-b border-r border-slate-200 bg-white p-4 sm:p-5">

      <div className="flex items-center justify-between gap-3">

        <div className="grid h-9 w-9 shrink-0 place-items-center bg-slate-100 text-slate-600">
          {icon}
        </div>

        <span
          className={`text-2xl font-black sm:text-3xl ${valueClass}`}
        >
          {value}
        </span>

      </div>

      <p className="mt-4 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400 sm:text-[10px]">
        {label}
      </p>

    </div>
  );
}


// ==========================================
// META ITEM
// ==========================================

function MetaItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="border-b border-slate-200 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">

      <div className="flex items-center gap-2 text-slate-400">

        {icon}

        <span className="text-[9px] font-black uppercase tracking-wider">
          {label}
        </span>

      </div>

      <p className="mt-2 text-xs font-black text-slate-800">
        {value}
      </p>

    </div>
  );
}


// ==========================================
// APPLICATION CARD
// ==========================================

function ApplicationCard({ app }) {

  const icon = app.iconUrl
    ? getFileUrl(app.iconUrl)
    : null;


  const statusConfig = {

    published: {
      label: "Published",
      className:
        "border-green-200 bg-green-50 text-green-700",
      icon: <CheckCircle2 size={12} />,
    },

    pending: {
      label: "Pending Review",
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
      icon: <Clock3 size={12} />,
    },

    rejected: {
      label: "Rejected",
      className:
        "border-red-200 bg-red-50 text-red-700",
      icon: <XCircle size={12} />,
    },

  };


  const status =
    statusConfig[app.status] ||
    statusConfig.pending;


  return (

    <article className="p-4 transition hover:bg-slate-50 sm:p-5">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


        {/* APP INFO */}

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">

          {icon ? (

            <img
              src={icon}
              alt={app.name}
              className="h-14 w-14 shrink-0 border border-slate-200 bg-slate-100 object-cover sm:h-16 sm:w-16"
            />

          ) : (

            <div className="grid h-14 w-14 shrink-0 place-items-center bg-blue-600 text-xl font-black text-white sm:h-16 sm:w-16">
              {app.name?.charAt(0)?.toUpperCase()}
            </div>

          )}


          <div className="min-w-0">

            <h3 className="truncate text-sm font-black text-slate-950 sm:text-base">
              {app.name}
            </h3>


            <p className="mt-1 text-xs text-slate-500">

              Version {app.version || "—"}

              <span className="mx-2 text-slate-300">
                •
              </span>

              Android {app.android || "8.0+"}

            </p>


            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">

              <span className="flex items-center gap-1">

                <Download size={12} />

                {app.downloads || 0}

                downloads

              </span>


              <span className="hidden text-slate-300 sm:inline">
                •
              </span>


              <span>
                {app.size || "APK"}
              </span>

            </div>

          </div>

        </div>


        {/* STATUS */}

        <div className="flex items-center justify-between gap-3 sm:justify-end">

          <span
            className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${status.className}`}
          >
            {status.icon}
            {status.label}
          </span>


          <button
            type="button"
            className="grid h-9 w-9 place-items-center border border-slate-200 text-slate-400 transition hover:border-blue-300 hover:text-blue-600"
            title="View application"
          >
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

    </article>

  );
}


// ==========================================
// EMPTY APPLICATIONS
// ==========================================

function EmptyApplications({ onUpload }) {

  return (

    <div className="px-5 py-14 text-center sm:px-8 sm:py-20">

      <div className="mx-auto grid h-16 w-16 place-items-center bg-slate-100 text-slate-400">
        <Package size={27} />
      </div>


      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
        Developer Workspace
      </p>


      <h3 className="mt-2 text-xl font-black text-slate-950">
        No applications yet
      </h3>


      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Your uploaded Android applications will appear here.
        Start by publishing your first application.
      </p>


      <button
        type="button"
        onClick={onUpload}
        className="mt-6 inline-flex h-11 items-center gap-2 bg-blue-600 px-5 text-xs font-black uppercase tracking-wide text-white transition hover:bg-blue-700"
      >
        <Upload size={15} />
        Upload Application
      </button>

    </div>

  );
}


// ==========================================
// TOOL BUTTON
// ==========================================

function ToolButton({
  icon,
  title,
  description,
}) {

  return (

    <button
      type="button"
      className="group flex w-full items-center gap-3 px-3 py-3 text-left transition hover:bg-slate-50"
    >

      <div className="grid h-9 w-9 shrink-0 place-items-center bg-slate-100 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-600">
        {icon}
      </div>


      <div className="min-w-0 flex-1">

        <p className="text-xs font-black text-slate-800 group-hover:text-blue-600">
          {title}
        </p>


        <p className="mt-0.5 text-[10px] text-slate-400">
          {description}
        </p>

      </div>


      <ChevronRight
        size={14}
        className="shrink-0 text-slate-300 transition group-hover:text-blue-500"
      />

    </button>

  );
}


// ==========================================
// INFO ROW
// ==========================================

function InfoRow({
  label,
  value,
  valueClass = "text-slate-800",
}) {

  return (

    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">

      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>


      <span
        className={`max-w-[180px] truncate text-right text-xs font-black ${valueClass}`}
        title={value || ""}
      >
        {value || "—"}
      </span>

    </div>

  );
}