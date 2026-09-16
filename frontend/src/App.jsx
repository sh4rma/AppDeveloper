import { useEffect, useState } from "react";

import {
  ArrowLeft,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AppDetails from "./components/AppDetails";
import UploadForm from "./components/UploadForm";
import InstallModal from "./components/InstallModal";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AdminLogin from "./pages/AdminLogin";

import { getApps, downloadApp } from "./services/api";

import {
  getCurrentUser,
  logoutUser,
} from "./services/auth";

export default function App() {
  // ==========================================
  // STATE
  // ==========================================

  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("home");

  const [selectedApp, setSelectedApp] = useState(null);

  const [showUpload, setShowUpload] = useState(false);

  const [installing, setInstalling] = useState(false);
  const [installApp, setInstallApp] = useState(null);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(
    getCurrentUser()
  );

  // ==========================================
  // LOAD APPS
  // ==========================================

  const loadApps = async () => {
    try {
      setLoading(true);

      const data = await getApps(search);

      setApps(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Apps load error:",
        error
      );

      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();
  }, [search]);

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setPage("home");
  };

  // ==========================================
  // SIGNUP
  // ==========================================

  const handleSignupSuccess = (registeredUser) => {
    setUser(registeredUser);
    setPage("home");
  };

  // ==========================================
  // ADMIN LOGIN SUCCESS
  // ==========================================

  const handleAdminLoginSuccess = (adminUser) => {
    console.log(
      "Admin logged in:",
      adminUser
    );

    // Open Admin Panel
    window.location.href =
      "http://localhost:5174";
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    logoutUser();

    setUser(null);
    setPage("home");

    setShowUpload(false);
    setSelectedApp(null);
  };

  // ==========================================
  // UPLOAD
  // ==========================================

  const handleUploadClick = () => {
    if (!user) {
      setPage("login");
      setShowUpload(false);
      return;
    }

    setShowUpload(true);
  };

  // ==========================================
  // PROFILE
  // ==========================================

  const handleProfile = () => {
    if (!user) {
      setPage("login");
      return;
    }

    setPage("profile");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // HOME
  // ==========================================

  const handleHome = () => {
    setPage("home");
    setSelectedApp(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // APPS
  // ==========================================

  const handleApps = () => {
    setPage("home");
    setSelectedApp(null);

    setTimeout(() => {
      document
        .getElementById("apps")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  };

  // ==========================================
  // DEVELOPERS
  // ==========================================

  const handleDevelopers = () => {
    setPage("home");
    setSelectedApp(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // OPEN APP DETAILS
  // ==========================================

  const openDetails = (app) => {
    setSelectedApp(app);
    setPage("details");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // INSTALL
  // ==========================================

  const handleInstall = (app) => {
    setInstallApp(app);
    setInstalling(true);
  };

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const handleComplete = async () => {
    if (!installApp) return;

    try {
      const result = await downloadApp(
        installApp._id
      );

      console.log(
        "Download response:",
        result
      );

      if (result?.downloadUrl) {
        const url =
          result.downloadUrl.startsWith("http")
            ? result.downloadUrl
            : `http://localhost:5000${result.downloadUrl}`;

        window.location.href = url;

        return;
      }

      if (installApp.apkUrl) {
        window.location.href =
          installApp.apkUrl.startsWith("http")
            ? installApp.apkUrl
            : `http://localhost:5000${installApp.apkUrl}`;

        return;
      }

      alert(
        "APK download link not found."
      );
    } catch (error) {
      console.error(
        "Download error:",
        error
      );

      if (installApp.apkUrl) {
        window.location.href =
          installApp.apkUrl.startsWith("http")
            ? installApp.apkUrl
            : `http://localhost:5000${installApp.apkUrl}`;
      } else {
        alert(
          "APK download failed."
        );
      }
    } finally {
      setInstalling(false);
    }
  };

  // ==========================================
  // UPLOAD SUCCESS
  // ==========================================

  const handleUploadSuccess = async () => {
    setShowUpload(false);

    await loadApps();
  };

  // ==========================================
  // EXPLORE
  // ==========================================

  const handleExplore = () => {
    document
      .getElementById("apps")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // ==========================================
  // PROFILE UPDATE
  // ==========================================

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  };

  // ==========================================
  // FOOTER EXPLORE
  // ==========================================

  const handleFooterExplore = () => {
    setPage("home");
    setSelectedApp(null);

    setTimeout(() => {
      document
        .getElementById("apps")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#172033]">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <Navbar
        search={search}
        setSearch={setSearch}
        onUpload={handleUploadClick}
        onHome={handleHome}
        onApps={handleApps}
        onDevelopers={handleDevelopers}
        onLogin={() => setPage("login")}
        onProfile={handleProfile}
        user={user}
        onLogout={handleLogout}
      />

      {/* ==========================================
          HOME
      ========================================== */}

      {page === "home" && (
        <Home
          apps={apps}
          loading={loading}
          onUpload={handleUploadClick}
          onAppClick={openDetails}
          onExplore={handleApps}
        />
      )}

      {/* ==========================================
          LOGIN
      ========================================== */}

      {page === "login" && (
        <Login
          onBack={() =>
            setPage("home")
          }

          onSignup={() =>
            setPage("signup")
          }

          onAdminLogin={() =>
            setPage("admin-login")
          }

          onSuccess={
            handleLoginSuccess
          }
        />
      )}

      {/* ==========================================
          ADMIN LOGIN
      ========================================== */}

      {page === "admin-login" && (
        <AdminLogin
          onBack={() =>
            setPage("login")
          }

          onSuccess={
            handleAdminLoginSuccess
          }
        />
      )}

      {/* ==========================================
          SIGNUP
      ========================================== */}

      {page === "signup" && (
        <Signup
          onBack={() =>
            setPage("home")
          }

          onLogin={() =>
            setPage("login")
          }

          onSuccess={
            handleSignupSuccess
          }
        />
      )}

      {/* ==========================================
          PROFILE
      ========================================== */}

      {page === "profile" && user && (
        <Profile
          user={user}
          apps={apps}

          onBack={() =>
            setPage("home")
          }

          onUpload={
            handleUploadClick
          }

          onLogout={
            handleLogout
          }

          onProfileUpdate={
            handleProfileUpdate
          }
        />
      )}

      {/* ==========================================
          APP DETAILS
      ========================================== */}

      {page === "details" &&
        selectedApp && (
          <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">

            <button
              type="button"
              onClick={handleHome}
              className="mb-6 flex items-center gap-2 border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
            >
              <ArrowLeft size={17} />

              Back to applications
            </button>

            <AppDetails
              app={selectedApp}

              onDownload={(app) => {
                if (!app?.apkUrl) {
                  alert(
                    "APK file not found."
                  );

                  return;
                }

                const downloadUrl =
                  app.apkUrl.startsWith("http")
                    ? app.apkUrl
                    : `http://localhost:5000${app.apkUrl}`;

                console.log(
                  "APK Download:",
                  downloadUrl
                );

                window.location.href =
                  downloadUrl;
              }}
            />
          </main>
        )}

      {/* ==========================================
          UPLOAD
      ========================================== */}

      {showUpload && user && (
        <UploadForm
          onClose={() =>
            setShowUpload(false)
          }

          onSuccess={
            handleUploadSuccess
          }
        />
      )}

      {/* ==========================================
          INSTALL MODAL
      ========================================== */}

      {installing && installApp && (
        <InstallModal
          app={installApp}
          onComplete={
            handleComplete
          }
        />
      )}

      {/* ==========================================
          FOOTER
      ========================================== */}

      <Footer
        onExplore={handleFooterExplore}
        onUpload={handleUploadClick}
        onProfile={handleProfile}
      />

      {/* ==========================================
          ANIMATIONS
      ========================================== */}

      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes cardIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}