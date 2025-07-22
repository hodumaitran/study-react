import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import connectDB from "./config/mongodb.js";
import Blog from "./models/blog.model.js";
import User from "./models/user.model.js";

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
  app.post("/api/images", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send("Không có file nào được gửi");

    const fileName = `${Date.now()}-${file.originalname}`;
    const uploadPath = path.join(uploadDir, fileName);
    fs.writeFileSync(uploadPath, file.buffer);

    // Trả URL đầy đủ cho TinyMCE
    const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

    res.json({ location: fullUrl });
  });

  // Xóa ảnh
  app.delete("/api/images/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);

    // Kiểm tra file tồn tại
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    try {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "Xoá ảnh thành công" });
    } catch (error) {
      res.status(500).json({ message: "Xoá ảnh thất bại", error });
    }
  });

  // Tạo blog
  app.post("/api/blogs", upload.single("thumbnail"), async (req, res) => {
    try {
      const { title, content, author } = req.body;
      let thumbnailUrl = req.body.thumbnail;

      if (!title || !content || !author) {
        return res
          .status(400)
          .json({ message: "Thiếu title, content hoặc author" });
      }

      // Nếu có file thumbnail thì lưu file và lấy url
      if (req.file) {
        const fileName = `${Date.now()}-${req.file.originalname}`;
        const uploadPath = path.join(uploadDir, fileName);
        fs.writeFileSync(uploadPath, req.file.buffer);
        thumbnailUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${fileName}`;
      }

      const newBlog = new Blog({
        title,
        thumbnail: thumbnailUrl,
        content,
        author,
      });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json({ message: "Error creating blog", error });
    }
  });

  // Lấy danh sách blog
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await Blog.find().populate("author");
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blogs", error });
    }
  });

  // Lấy chi tiết blog theo ID
  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id).populate("author");
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog", error });
    }
  });

  // Cập nhật blog theo ID
  app.patch("/api/blogs/:id", upload.single("thumbnail"), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const updateData = {
        ...(title && { title }),
        ...(content && { content }),
      };

      // Nếu có file thumbnail mới thì lưu file và cập nhật đường dẫn
      if (req.file) {
        const fileName = `${Date.now()}-${req.file.originalname}`;
        const uploadPath = path.join(uploadDir, fileName);
        fs.writeFileSync(uploadPath, req.file.buffer);
        updateData.thumbnail = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${fileName}`;
      }

      const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: "Error updating blog", error });
    }
  });

  // Xoá blog theo ID
  app.delete("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).send({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting blog", error });
    }
  });

  // Đăng ký
  app.post("/api/register", async (req, res) => {
    const { fullname, username, password, email } = req.body;
    if (!fullname || !username || !password || !email) {
      return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
    }
    try {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email đã được sử dụng" });
      }
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username đã được sử dụng" });
      }
      // Tạo người dùng mới
      const newUser = new User({
        fullname,
        username,
        password,
        email,
      });
      await newUser.save();
      res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi đăng ký", error });
    }
  });

  // Đăng nhập
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đăng nhập" });
    }
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Email hoặc mật khẩu không đúng" });
      }
      res.status(200).json({ message: "Đăng nhập thành công", user });
    } catch (error) {
      res.status(500).json({ message: "Lỗi đăng nhập", error });
    }
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
    await connectDB();
    console.log("Starting Server...");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
