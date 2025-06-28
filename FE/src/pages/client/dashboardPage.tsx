import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fakePosts } from "@/constants/postData";
import {
  getPostsThisWeek,
  getTopAuthor,
  getUniqueAuthors,
} from "@/utils/postFunction";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [posts, setPosts] = useState(fakePosts);

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("vi-VN");

  return (
    <div className="p-6 space-y-6">
      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Tổng số bài viết</p>
            <h2 className="text-2xl font-bold mt-2">{posts.length}</h2>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Tác giả khác nhau</p>
            <h2 className="text-2xl font-bold mt-2">
              {getUniqueAuthors(posts).length}
            </h2>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Bài viết tuần này</p>
            <h2 className="text-2xl font-bold mt-2">
              {getPostsThisWeek(posts)}
            </h2>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Tác giả nổi bật</p>
            <h2 className="text-base font-semibold mt-2">
              {getTopAuthor(posts).name}
            </h2>
            <p className="text-sm mt-1">
              ({getTopAuthor(posts).count} bài viết)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bảng bài viết */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Ảnh</th>
              <th className="p-3 border">Tiêu đề</th>
              <th className="p-3 border">Nội dung</th>
              <th className="p-3 border">Tác giả</th>
              <th className="p-3 border">Ngày tạo</th>
              <th className="p-3 border text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t hover:bg-gray-50">
                <td className="p-3 border">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-16 h-10 object-cover rounded"
                  />
                </td>
                <td className="p-3 border font-medium">{post.title}</td>
                <td className="p-3 border max-w-[250px] truncate">
                  {post.content}
                </td>
                <td className="p-3 border">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.image}
                      alt={post.author.fullname}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{post.author.fullname}</span>
                  </div>
                </td>
                <td className="p-3 border">{formatDate(post.createdAt)}</td>
                <td className="p-3 border text-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
