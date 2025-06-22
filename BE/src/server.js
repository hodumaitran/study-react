import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const corsOptions = {
  origin: function (origin, callback) {
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

const START_SERVER = () => {
  const app = express();

  app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

  app.use(cookieParser());

  app.use(cors(corsOptions));

  app.use(express.json());

  // Serve static images
  const uploadDir = path.join(process.cwd(), "src/uploads");
  app.use("/uploads", express.static(uploadDir));

  // Tạo folder uploads nếu chưa có
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Upload ảnh
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  });

  // -- API Endpoints --
  app.post("/api/upload-image", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send("Không có file nào được gửi");

    const fileName = `${Date.now()}-${file.originalname}`;
    const uploadPath = path.join(uploadDir, fileName);
    fs.writeFileSync(uploadPath, file.buffer);

    // Trả URL đầy đủ cho TinyMCE
    const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

    res.json({ location: fullUrl });
  });

  // Lưu/tải nội dung HTML vào RAM
  let inMemoryContent = "";

  app.post("/api/blog", (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).send("Thiếu nội dung");

    inMemoryContent = content;
    res.json({ success: true });
  });

  app.get("/api/blog", (req, res) => {
    res.json({ content: inMemoryContent });
  });

  const LOCAL_DEV_APP_PORT = 3000;
  const LOCAL_DEV_APP_HOST = "localhost";

  app.listen(LOCAL_DEV_APP_PORT, LOCAL_DEV_APP_HOST, () => {
    console.log(
      `Local development: Back-end Server is running successfully at Host: ${LOCAL_DEV_APP_HOST} and Port: ${LOCAL_DEV_APP_PORT}`
    );
  });
};

(async () => {
  try {
    // Start Back-end Server
    console.log("Starting Server...");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
