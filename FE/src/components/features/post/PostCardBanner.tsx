interface PostCardProps {
  image: string;
  title: string;
}

export const PostCardBanner = (props: PostCardProps) => {
  return (
    <div className="flex justify-start items-center gap-3 py-3 border-b border-gray-200">
      <div className="w-20 h-15 shrink-0">
        <img
          src={props.image}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <p className="line-clamp-2 font-medium">{props.title}</p>
    </div>
  );
};
