import { IBlog } from "@/types";

export const PostCard = ({ post }: { post: IBlog }) => {
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="">
      <div className="w-full h-[250px]">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-md font-medium line-clamp-2">{post.title}</h3>
        <h2 className="text-md line-clamp-2">{stripHtml(post.content)}</h2>

        <div className="text-sm flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <img
              src={post?.author?.avatar}
              alt={post?.author?.fullname}
              className="size-6 rounded-full"
            />
            <p>{post?.author?.fullname}</p>
          </div>
          <p>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</p>
        </div>
      </div>
    </div>
  );
};
