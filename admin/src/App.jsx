import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Smartphone,
  Clock3,
  CheckCircle2,
  XCircle,
  Trash2,
  RefreshCw,
} from "lucide-react";

import {
  getApps,
  approveApp,
  rejectApp,
  deleteApp,
} from "./services/api";

export default function App() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const loadApps = async () => {
    try {
      setLoading(true);

      const data = await getApps();

      setApps(Array.isArray(data) ? data : data.apps || []);
    } catch (error) {
      console.error("Admin apps error:", error);
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();
  }, []);

  const handleApprove = async (id) => {
    try {
      setActionLoading(id);

      await approveApp(id);

      await loadApps();
    } catch (error) {
      console.error(error);
      alert("Failed to approve application.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(id);

      await rejectApp(id);

      await loadApps();
    } catch (error) {
      console.error(error);
      alert("Failed to reject application.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      setActionLoading(id);

      await deleteApp(id);

      await loadApps();
    } catch (error) {
      console.error(error);
      alert("Failed to delete application.");
    } finally {
      setActionLoading(null);
    }
  };

  const totalApps = apps.length;

  const pendingApps = apps.filter(
    (app) => app.status === "pending"
  ).length;

  const publishedApps = apps.filter(
    (app) => app.status === "published"
  ).length;

  const rejectedApps = apps.filter(
    (app) => app.status === "rejected"
  ).length;

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="grid size-10 place-items-center rounded-lg bg-blue-600 text-white">
              <LayoutDashboard size={20} />
            </div>

            <div>
              <h1 className="text-lg font-black">
                AppDeveloper
              </h1>

              <p className="text-xs text-slate-400">
                Admin Panel
              </p>
            </div>

          </div>

          <button
            onClick={loadApps}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>

        </div>
      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-5 py-7">

        {/* TITLE */}

        <div className="mb-7">

          <p className="text-xs font-black tracking-widest text-blue-600">
            ADMINISTRATION
          </p>

          <h2 className="mt-1 text-3xl font-black">
            Application Dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage applications submitted by developers.
          </p>

        </div>


        {/* STATS */}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

          <Stat
            title="Total Apps"
            value={totalApps}
            icon={<Smartphone size={20} />}
          />

          <Stat
            title="Pending"
            value={pendingApps}
            icon={<Clock3 size={20} />}
          />

          <Stat
            title="Published"
            value={publishedApps}
            icon={<CheckCircle2 size={20} />}
          />

          <Stat
            title="Rejected"
            value={rejectedApps}
            icon={<XCircle size={20} />}
          />

        </div>


        {/* APPLICATIONS */}

        <section className="mt-8">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h3 className="text-xl font-black">
                Applications
              </h3>

              <p className="text-sm text-slate-500">
                Review developer submissions.
              </p>
            </div>

          </div>


          <div className="overflow-hidden border border-slate-200 bg-white">

            {loading ? (

              <div className="flex min-h-60 items-center justify-center">

                <RefreshCw
                  size={28}
                  className="animate-spin text-blue-600"
                />

              </div>

            ) : apps.length === 0 ? (

              <div className="flex min-h-60 flex-col items-center justify-center px-5 text-center">

                <div className="grid size-14 place-items-center bg-slate-100">
                  <Smartphone
                    size={25}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-4 font-black">
                  No applications
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Developer submissions will appear here.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-slate-100">

                {apps.map((app) => (

                  <div
                    key={app._id}
                    className="p-4 sm:p-5"
                  >

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      {/* APP INFO */}

                      <div className="flex min-w-0 items-center gap-4">

                        <img
                          src={
                            app.iconUrl
                              ? `http://localhost:5000${app.iconUrl}`
                              : "/vite.svg"
                          }
                          alt={app.name}
                          className="size-14 shrink-0 rounded-lg border border-slate-200 object-cover"
                        />

                        <div className="min-w-0">

                          <h4 className="truncate font-black">
                            {app.name}
                          </h4>

                          <p className="mt-1 text-sm text-slate-500">
                            By {app.developer}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2">

                            <span className="text-xs text-slate-400">
                              v{app.version}
                            </span>

                            <StatusBadge
                              status={app.status}
                            />

                          </div>

                        </div>

                      </div>


                      {/* ACTIONS */}

                      <div className="flex gap-2">

                        {app.status === "pending" && (
                          <>
                            <button
                              disabled={actionLoading === app._id}
                              onClick={() =>
                                handleApprove(app._id)
                              }
                              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-black text-white hover:bg-green-700 disabled:opacity-50 sm:flex-none"
                            >
                              <CheckCircle2 size={15} />
                              Approve
                            </button>

                            <button
                              disabled={actionLoading === app._id}
                              onClick={() =>
                                handleReject(app._id)
                              }
                              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-black text-red-600 hover:bg-red-100 disabled:opacity-50 sm:flex-none"
                            >
                              <XCircle size={15} />
                              Reject
                            </button>
                          </>
                        )}

                        {app.status === "published" && (
                          <button
                            disabled={actionLoading === app._id}
                            onClick={() =>
                              handleDelete(app._id)
                            }
                            className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-black text-red-600 hover:bg-red-100 disabled:opacity-50"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        )}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}


/* ================= STAT ================= */

function Stat({ title, value, icon }) {
  return (
    <div className="border border-slate-200 bg-white p-4">

      <div className="flex items-center justify-between">

        <div className="grid size-10 place-items-center bg-blue-50 text-blue-600">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs font-bold text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}


/* ================= STATUS ================= */

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-700",
    published: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-md px-2 py-1 text-[10px] font-black uppercase ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "unknown"}
    </span>
  );
}