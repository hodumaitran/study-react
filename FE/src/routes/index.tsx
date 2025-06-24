import AuthLayout from "@/components/layout/auth/AuthLayout";
import MainLayout from "@/components/layout/client/MainLayout";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import AddBlogPage from "@/pages/client/addBlog";
import BlogDetailPage from "@/pages/client/blogDetail";
import HomePage from "@/pages/client/home";
import NotFound from "@/pages/not-found";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/client/dashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/quan-ly-bai-viet" element={<DashboardPage />} />
        <Route path="/them-bai-viet" element={<AddBlogPage />} />
        <Route path="/bai-viet/:id" element={<BlogDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="dang-nhap" element={<LoginPage />} />
        <Route path="dang-ky" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
