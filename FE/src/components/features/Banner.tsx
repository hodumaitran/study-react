import { PostCardBanner } from "./post/PostCardBanner";
import { fakePosts } from "@/constants/postData";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="container-wrapper flex flex-col md:flex-row justify-center items-start mt-5 h-[455px]">
      <div className="w-full h-full md:w-2/3 relative">
        <img
          src={
            "https://media.vov.vn/sites/default/files/styles/large/public/2021-12/1_154.jpg"
          }
          alt=""
          className="w-full h-full rounded-2xl object-cover"
        />

        <div className="absolute bottom-0 w-full bg-gray-300/30 backdrop-blur-md rounded-b-2xl p-6">
          <Button
            variant="outline"
            className="!p-2 !h-8 mb-3 text-[12px] !border-2 !border-red-400 !rounded-full text-white"
          >
            Doanh nghiệp
          </Button>
          <p className="text-xl md:text-2xl font-semibold leading-snug text-white">
            Khi còn trẻ, có sức khỏe
            <span className="block">
              Bạn sẽ dễ dàng vượt qua vất vả, áp lực
            </span>
          </p>
        </div>
      </div>

      <div className="w-full h-full md:w-1/3 pl-4 overflow-y-auto">
        <h3 className="text-xl font-semibold">Bài viết nổi bật khác</h3>
        {fakePosts.slice(0, 5).map((item, id) => (
          <Link key={item.id} to={`/bai-viet/${item.id}`}>
            <PostCardBanner key={id} image={item.image} title={item.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};
