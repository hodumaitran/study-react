import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteBlog, getBlogs } from "@/services/blog.service";
import { IBlog } from "@/types";
import { formatDate } from "@/utils/formatter";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const PostListPage = () => {
  const [posts, setPosts] = useState<IBlog[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogs();
        setPosts(data);
      } catch (error) {
        toast.error("Không thể tải danh sách bài viết!");
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      setPosts(posts.filter((post) => post._id !== id));
      toast.success("Xóa bài viết thành công!");
    } catch (error) {
      toast.error("Xóa bài viết thất bại!");
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleOpenDialog = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Quản lý bài viết</h1>
        <Button asChild>
          <Link to="/admin/posts/create" className="flex items-center gap-x-1">
            <Plus className="h-4 w-4" />
            Thêm bài viết
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Tiêu đề</TableHead>
            {/* <TableHead>Trạng thái</TableHead> */}
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post._id}>
              <TableCell>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-[80px] aspect-video object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{post.title}</TableCell>
              {/* <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                    </span>
                  </TableCell> */}
              <TableCell>{formatDate(post.createdAt)}</TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Link
                    to={`/bai-viet/${post._id}`}
                    target="_blank"
                    className="bg-gray-100 hover:bg-gray-200 size-8 rounded-md border flex items-center justify-center p-2 text-gray-700 dark:text-textGray hover:border-opacity-80 dark:bg-transparent border-gray-200 dark:hover:border-opacity-30 transition-all"
                  >
                    <Eye />
                  </Link>
                  <Link
                    to={`/admin/posts/${post._id}/edit`}
                    className="bg-gray-100 hover:bg-gray-200 size-8 rounded-md border flex items-center justify-center p-2 text-gray-700 dark:text-textGray hover:border-opacity-80 dark:bg-transparent border-gray-200 dark:hover:border-opacity-30 transition-all"
                  >
                    <Edit />
                  </Link>
                  <Dialog
                    open={openDialog && selectedId === post._id}
                    onOpenChange={setOpenDialog}
                  >
                    <DialogTrigger asChild>
                      <button
                        onClick={() => handleOpenDialog(post._id)}
                        className="bg-gray-100 hover:bg-gray-200 size-8 rounded-md border flex items-center justify-center p-2 text-gray-700 dark:text-textGray hover:border-opacity-80 dark:bg-transparent border-gray-200 dark:hover:border-opacity-30 transition-all"
                      >
                        <Trash2 />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Xác nhận xóa bài viết</DialogTitle>
                      </DialogHeader>
                      <div>
                        Bạn có chắc chắn muốn xóa bài viết <b>{post.title}</b>{" "}
                        không?
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Hủy</Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(post._id)}
                        >
                          Xóa
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostListPage;
