import multer from "multer";
import path from "path";
import fs from "fs";

const uploadRoot = path.join(process.cwd(), "uploads");

const apkFolder = path.join(uploadRoot, "apks");
const iconFolder = path.join(uploadRoot, "icons");
const screenshotFolder = path.join(
  uploadRoot,
  "screenshots"
);


// ==========================================
// CREATE FOLDERS
// ==========================================

[apkFolder, iconFolder, screenshotFolder].forEach(
  (folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, {
        recursive: true,
      });
    }
  }
);


// ==========================================
// STORAGE
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "apk") {
      return cb(null, apkFolder);
    }

    if (file.fieldname === "icon") {
      return cb(null, iconFolder);
    }

    if (file.fieldname === "screenshots") {
      return cb(null, screenshotFolder);
    }

    cb(new Error("Invalid upload field."));
  },

  filename: (req, file, cb) => {
    const extension = path.extname(
      file.originalname
    );

    const originalName = path.basename(
      file.originalname,
      extension
    );

    const cleanName = originalName
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .substring(0, 80);

    const filename =
      `${Date.now()}-${cleanName}${extension}`;

    cb(null, filename);
  },
});


// ==========================================
// FILE FILTER
// ==========================================

const fileFilter = (req, file, cb) => {

  // APK
  if (file.fieldname === "apk") {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    if (extension !== ".apk") {
      return cb(
        new Error("Only .apk files are allowed.")
      );
    }

    return cb(null, true);
  }


  // IMAGE FILES
  if (
    file.fieldname === "icon" ||
    file.fieldname === "screenshots"
  ) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, PNG and WEBP images are allowed."
        )
      );
    }

    return cb(null, true);
  }

  cb(new Error("Invalid file field."));
};


// ==========================================
// MULTER
// ==========================================

const upload = multer({
  storage,
  fileFilter,

  limits: {
    // 200 MB per file
    fileSize: 200 * 1024 * 1024,

    // Maximum number of files
    files: 8,
  },
});

export default upload;