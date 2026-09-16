import App from "../models/App.js";

// ==========================================
// GET PUBLIC APPS
// ==========================================
export const getApps = async (req, res) => {
  try {
    const search = req.query.search?.trim() || "";

    const filter = {
      status: "published",
    };

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          developer: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const apps = await App.find(filter)
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(apps);
  } catch (error) {
    console.error(
      "GET APPS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch applications.",
    });
  }
};

// ==========================================
// GET MY APPLICATIONS
// ==========================================
export const getMyApps = async (req, res) => {
  try {
    const apps = await App.find({
      uploadedBy: req.user.id,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(apps);
  } catch (error) {
    console.error(
      "GET MY APPS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch your applications.",
    });
  }
};

// ==========================================
// UPLOAD APPLICATION
// ==========================================
export const createApp = async (req, res) => {
  try {
    console.log(
      "\n========== NEW APP UPLOAD =========="
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "FILES:",
      Object.keys(req.files || {})
    );

    // ======================================
    // GET FORM DATA
    // ======================================

    const {
      name,
      developer,
      description,
      version,
      android,
    } = req.body || {};

    // ======================================
    // TEXT VALIDATION
    // ======================================

    if (
      !name?.trim() ||
      !developer?.trim() ||
      !description?.trim() ||
      !version?.trim() ||
      !android?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, developer, description, version and Android version are required.",
      });
    }

    // ======================================
    // APK
    // ======================================

    const apk = req.files?.apk?.[0];

    if (!apk) {
      return res.status(400).json({
        success: false,
        message:
          "APK file is required.",
      });
    }

    // ======================================
    // ICON
    // ======================================

    const icon = req.files?.icon?.[0];

    if (!icon) {
      return res.status(400).json({
        success: false,
        message:
          "App icon is required.",
      });
    }

    // ======================================
    // SCREENSHOTS
    // ======================================

    const screenshots =
      req.files?.screenshots || [];

    if (screenshots.length < 4) {
      return res.status(400).json({
        success: false,
        message:
          "At least 4 screenshots are required.",
      });
    }

    if (screenshots.length > 6) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum 6 screenshots are allowed.",
      });
    }

    // ======================================
    // FILE URLS
    // ======================================

    const apkUrl =
      `/uploads/apks/${apk.filename}`;

    const iconUrl =
      `/uploads/icons/${icon.filename}`;

    const screenshotUrls =
      screenshots.map(
        (file) =>
          `/uploads/screenshots/${file.filename}`
      );

    // ======================================
    // APK SIZE
    // ======================================

    const sizeMB =
      apk.size / (1024 * 1024);

    const size =
      `${sizeMB.toFixed(1)} MB`;

    // ======================================
    // DATABASE
    // ======================================

    const newApp = await App.create({
      name: name.trim(),

      developer:
        developer.trim(),

      description:
        description.trim(),

      version:
        version.trim(),

      android:
        android.trim(),

      iconUrl,

      apkUrl,

      screenshots:
        screenshotUrls,

      size,

      rating: 0,

      downloads: 0,

      // New applications require admin approval
      status: "pending",
    });

    console.log(
      "APP CREATED:",
      newApp._id.toString()
    );

    // ======================================
    // RESPONSE
    // ======================================

    return res.status(201).json({
      success: true,

      message:
        "Application uploaded successfully. It is waiting for admin approval.",

      app: newApp,
    });
  } catch (error) {
    console.error(
      "\nCREATE APP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Application upload failed.",
    });
  }
};

// ==========================================
// DOWNLOAD APP
// ==========================================
export const downloadApp = async (
  req,
  res
) => {
  try {
    // ======================================
    // FIND PUBLISHED APP
    // ======================================

    const app = await App.findOne({
      _id: req.params.id,

      // Only published apps can be downloaded
      status: "published",
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found.",
      });
    }

    // ======================================
    // INCREASE DOWNLOAD COUNT
    // ======================================

    app.downloads =
      (app.downloads || 0) + 1;

    await app.save();

    console.log(
      `DOWNLOAD COUNT: ${app.name} = ${app.downloads}`
    );

    // ======================================
    // RESPONSE
    // ======================================

    return res.status(200).json({
      success: true,

      message:
        "Download counted successfully.",

      downloadUrl:
        app.apkUrl,

      // Send latest count to frontend
      downloads:
        app.downloads,
    });
  } catch (error) {
    console.error(
      "DOWNLOAD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Download failed.",
    });
  }
};

// ==========================================
// ADMIN - GET ALL APPLICATIONS
// ==========================================
export const getAdminApps = async (
  req,
  res
) => {
  try {
    const apps = await App.find({})
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(apps);
  } catch (error) {
    console.error(
      "ADMIN GET APPS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch admin applications.",
    });
  }
};

// ==========================================
// ADMIN - APPROVE APPLICATION
// ==========================================
export const approveApp = async (
  req,
  res
) => {
  try {
    const app =
      await App.findByIdAndUpdate(
        req.params.id,
        {
          status: "published",
        },
        {
          new: true,
        }
      );

    if (!app) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Application published successfully.",

      app,
    });
  } catch (error) {
    console.error(
      "APPROVE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to approve application.",
    });
  }
};

// ==========================================
// ADMIN - REJECT APPLICATION
// ==========================================
export const rejectApp = async (
  req,
  res
) => {
  try {
    const app =
      await App.findByIdAndUpdate(
        req.params.id,
        {
          status: "rejected",
        },
        {
          new: true,
        }
      );

    if (!app) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Application rejected successfully.",

      app,
    });
  } catch (error) {
    console.error(
      "REJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to reject application.",
    });
  }
};

// ==========================================
// ADMIN - DELETE APPLICATION
// ==========================================
export const deleteApp = async (
  req,
  res
) => {
  try {
    console.log(
      "DELETE REQUEST ID:",
      req.params.id
    );

    const app =
      await App.findById(
        req.params.id
      );

    if (!app) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found.",
      });
    }

    await App.deleteOne({
      _id: req.params.id,
    });

    console.log(
      "APP DELETED:",
      req.params.id
    );

    return res.status(200).json({
      success: true,

      message:
        "Application deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to delete application.",
    });
  }
};