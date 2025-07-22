import { Banner } from "@/components/features/Banner";
import { PostCard } from "@/components/features/post/PostCard";
import { Button } from "@/components/ui/Button";
import { getBlogs } from "@/services/blog.service";
import { IBlog } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Banner />
      <section className="container-wrapper my-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Bài viết gần đây</h3>
          <Link to={"/"}>
            <Button variant="outline" className="!text-[12px] !p-2 !h-8">
              Tất cả bài viết
            </Button>
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            posts.slice(0, 8).map((post) => (
              <Link key={post._id} to={`/bai-viet/${post._id}`}>
                <PostCard post={post} />
              </Link>
            ))
          )}
        </div>
      </section>
    </>
  );
}
