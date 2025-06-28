import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  content: string;
  image: string;
  authorName: string;
  authorImage: string;
}

export default function AddPostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewAuthor, setPreviewAuthor] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    const imageFile = (
      document.querySelector('input[name="image"]') as HTMLInputElement
    )?.files?.[0];
    const authorFile = (
      document.querySelector('input[name="authorImage"]') as HTMLInputElement
    )?.files?.[0];

    const newPost = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      image: imageFile ? URL.createObjectURL(imageFile) : "",
      createdAt: new Date().toISOString(),
      author: {
        fullname: data.authorName,
        image: authorFile ? URL.createObjectURL(authorFile) : "",
      },
    };

    console.log("Bài viết mới:", newPost);
    alert("Thêm bài viết thành công!");
    reset();
    setPreviewImage(null);
    setPreviewAuthor(null);
  };

  return (
    <div className="container-wrapper my-10">
      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-bold">Thêm bài viết mới</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Tiêu đề</label>
                  <Input
                    placeholder="Nhập tiêu đề"
                    {...register("title", {
                      required: "Vui lòng nhập tiêu đề",
                      minLength: {
                        value: 3,
                        message: "Tiêu đề ít nhất 3 ký tự",
                      },
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">Tên tác giả</label>
                  <Input
                    placeholder="Nguyễn Văn A"
                    {...register("authorName", {
                      required: "Vui lòng nhập tên tác giả",
                      minLength: {
                        value: 3,
                        message: "Tên tác giả ít nhất 3 ký tự",
                      },
                    })}
                  />
                  {errors.authorName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.authorName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">Ảnh bài viết</label>
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("image", {
                      required: "Vui lòng chọn ảnh bài viết",
                    })}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image.message}
                    </p>
                  )}
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview bài viết"
                      className="mt-2 w-full max-w-xs rounded"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Nội dung</label>
                  <Textarea
                    className="w-full min-h-[116px] text-base"
                    placeholder="Nhập nội dung"
                    rows={14}
                    {...register("content", {
                      required: "Vui lòng nhập nội dung",
                      minLength: {
                        value: 10,
                        message: "Nội dung ít nhất 10 ký tự",
                      },
                    })}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.content.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">Ảnh tác giả</label>
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("authorImage", {
                      required: "Vui lòng chọn ảnh tác giả",
                    })}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreviewAuthor(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {errors.authorImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.authorImage.message}
                    </p>
                  )}
                  {previewAuthor && (
                    <img
                      src={previewAuthor}
                      alt="Preview tác giả"
                      className="mt-2 w-24 h-24 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Thêm bài viết
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
