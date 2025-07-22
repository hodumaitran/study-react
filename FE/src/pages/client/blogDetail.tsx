import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "@/services/blog.service";
import { IBlog } from "@/types";
import Prism from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript"; // Thêm các ngôn ngữ bạn cần
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup"; // HTML
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-okaidia.css"; // Hoặc bạn có thể chọn theme khác

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getBlogById(id)
      .then((data) => setPost(data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (post) {
      Prism.highlightAll();
    }
  }, [post]);

  if (loading) return <div className="text-center py-10">Đang tải...</div>;
  if (!post)
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy bài viết
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <p className="text-sm text-muted-foreground font-medium">Bài viết</p>
      <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={post?.author?.avatar}
            alt={post?.author?.fullname}
          />
          <AvatarFallback>AU</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{post?.author?.fullname}</p>
          <p className="text-xs">
            Ngày đăng: {new Date(post.createdAt).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>

      <Card className="overflow-hidden rounded-xl border-none shadow-md">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full max-h-[500px] object-cover"
        />
      </Card>

      <article className="prose prose-neutral max-w-none text-base">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
