import axiosInstance from "@/config/axiosInstance";
import type { IBlog } from "@/types";

// Tạo blog mới
export const createBlog = async (formData: FormData): Promise<IBlog> => {
  const response = await axiosInstance.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Lấy danh sách blog
export const getBlogs = async (): Promise<IBlog[]> => {
  const response = await axiosInstance.get("/blogs");
  return response.data;
};

// Lấy chi tiết blog theo ID
export const getBlogById = async (id: string): Promise<IBlog> => {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response.data;
};

// Cập nhật blog theo ID
export const updateBlog = async (
  id: string,
  formData: FormData
): Promise<IBlog> => {
  const response = await axiosInstance.patch(`/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Xoá blog theo ID
export const deleteBlog = async (id: string): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`/blogs/${id}`);
  return response.data;
};
