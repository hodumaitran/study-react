import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import AuthLayout from "@/components/layout/auth/AuthLayout";
import MainLayout from "@/components/layout/client/MainLayout";
import CreatePostPage from "@/pages/admin/CreatePostPage";
import EditPostPage from "@/pages/admin/EditPostPage";
import PostListPage from "@/pages/admin/PostListPage";
import ProfilePage from "@/pages/admin/ProfilePage";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import AddBlogPage from "@/pages/client/addBlog";
import BlogDetailPage from "@/pages/client/blogDetail";
import DashboardPage from "@/pages/client/dashboardPage";
import HomePage from "@/pages/client/home";
import NotFound from "@/pages/not-found";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="dang-nhap" element={<LoginPage />} />
        <Route path="dang-ky" element={<RegisterPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/quan-ly-bai-viet" element={<DashboardPage />} />
        <Route path="/them-bai-viet" element={<AddBlogPage />} />
        <Route path="/bai-viet/:id" element={<BlogDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<Navigate to="posts" replace />} />
        <Route path="posts" element={<PostListPage />} />
        <Route path="posts/create" element={<CreatePostPage />} />
        <Route path="posts/:id/edit" element={<EditPostPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
