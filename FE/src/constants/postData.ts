export interface Author {
  image?: string;
  fullname?: string;
}

export interface PostProps {
  id: number;
  thumbnail: string;
  title: string;
  content: string;
  createdAt: string;
  author: Author;
}

export const fakePosts: PostProps[] = [
  {
    id: 1,
    thumbnail:
      "https://media.vov.vn/sites/default/files/styles/large/public/2021-12/1_154.jpg",
    title: "Giới thiệu về React",
    content:
      "React là một thư viện JavaScript dùng để xây dựng giao diện người dùng.",
    createdAt: "2025-06-24T08:00:00Z",
    author: {
      image: "https://chothuestudio.com/wp-content/uploads/2023/09/1.jpg",
      fullname: "Nguyễn Văn A",
    },
  },
  {
    id: 2,
    thumbnail:
      "https://media.vov.vn/sites/default/files/styles/large/public/2021-12/1_154.jpg",
    title: "Học Tailwind CSS",
    content:
      "Tailwind CSS giúp bạn xây dựng giao diện nhanh chóng với utility-first.",
    createdAt: "2025-06-23T15:30:00Z",
    author: {
      image: "https://chothuestudio.com/wp-content/uploads/2023/09/1.jpg",
      fullname: "Trần Thị B",
    },
  },
  {
    id: 3,
    thumbnail:
      "https://media.vov.vn/sites/default/files/styles/large/public/2021-12/1_154.jpg",
    title: "Sử dụng React Router",
    content:
      "React Router giúp điều hướng giữa các trang trong ứng dụng React.",
    createdAt: "2025-06-22T12:00:00Z",
    author: {
      image: "https://chothuestudio.com/wp-content/uploads/2023/09/1.jpg",
      fullname: "Phạm Minh C",
    },
  },
  {
    id: 4,
    thumbnail:
      "https://media.vov.vn/sites/default/files/styles/large/public/2021-12/1_154.jpg",
    title: "Giới thiệu về React",
    content:
      "React là một thư viện JavaScript dùng để xây dựng giao diện người dùng.",
    createdAt: "2025-06-21T10:00:00Z",
    author: {
      image: "https://chothuestudio.com/wp-content/uploads/2023/09/1.jpg",
      fullname: "Nguyễn Văn A",
    },
  },
  {
    id: 5,
    thumbnail:
      "https://media.vov.vn/sites/default/files/styles/large/public/2021-12/1_154.jpg",
    title: "Học Tailwind CSS",
    content:
      "Tailwind CSS giúp bạn xây dựng giao diện nhanh chóng với utility-first.",
    createdAt: "2025-06-20T18:45:00Z",
    author: {
      image: "https://chothuestudio.com/wp-content/uploads/2023/09/1.jpg",
      fullname: "Trần Thị B",
    },
  },
  {
    id: 6,
    thumbnail:
      "https://media.vov.vn/sites/default/files/styles/large/public/2021-12/1_154.jpg",
    title: "Sử dụng React Router",
    content:
      "React Router giúp điều hướng giữa các trang trong ứng dụng React.",
    createdAt: "2025-06-19T09:30:00Z",
    author: {
      image: "https://chothuestudio.com/wp-content/uploads/2023/09/1.jpg",
      fullname: "Phạm Minh C",
    },
  },
];
