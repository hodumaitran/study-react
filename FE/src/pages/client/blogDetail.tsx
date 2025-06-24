import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fakePosts } from "@/constants/postData"; // Nếu dùng API thật thì thay bằng fetch

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nếu dùng API thật, thay đoạn này bằng fetch(`/api/posts/${id}`)
    const found = fakePosts.find((p) => String(p.id) === String(id));
    setPost(found);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="text-center py-10">Đang tải...</div>;
  if (!post)
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy bài viết
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="font-semibold">Bài viết</div>
      <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Avatar className="w-8 h-8">
          <AvatarImage src={post.author.image} alt={post.author.fullname} />
          <AvatarFallback>
            {post.author.fullname
              .split(" ")
              .map((w: string) => w[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{post.author.fullname}</p>
          <p className="text-xs">
            Posted: {new Date(post.createdAt).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>
      <Card className="overflow-hidden rounded-xl">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-contain"
        />
      </Card>
      <div className="prose prose-neutral max-w-none text-base">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
