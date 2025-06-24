import { Banner } from "@/components/features/Banner";
import { PostCard } from "@/components/features/post/PostCard";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { fakePosts } from "@/constants/postData";

export default function HomePage() {
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
          {fakePosts.slice(0, 8).map((post) => (
            <Link key={post.id} to={`/bai-viet/${post.id}`}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
