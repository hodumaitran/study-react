import { PostProps } from "@/constants/postData";

export const getUniqueAuthors = (posts: PostProps[]) =>
  Array.from(new Set(posts.map((p) => p.author.fullname)));

export const getPostsThisWeek = (posts: PostProps[]) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return posts.filter((post) => new Date(post.createdAt) >= oneWeekAgo).length;
};

export const getLatestPost = (posts: PostProps[]) =>
  posts.reduce((latest, current) =>
    new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
  );

export const getTopAuthor = (posts: PostProps[]) => {
  const authorMap: Record<string, number> = {};
  posts.forEach((post) => {
    authorMap[post.author.fullname] =
      (authorMap[post.author.fullname] || 0) + 1;
  });
  const sorted = Object.entries(authorMap).sort((a, b) => b[1] - a[1]);
  return { name: sorted[0]?.[0], count: sorted[0]?.[1] || 0 };
};
