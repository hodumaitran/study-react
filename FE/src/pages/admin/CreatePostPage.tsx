import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { Editor as TinyMCEEditor } from "tinymce";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBlog } from "@/services/blog.service";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const postSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  thumbnail: z.instanceof(File, { message: "Vui lòng chọn ảnh thumbnail" }),
  content: z.string().min(1, "Nội dung là bắt buộc"),
});

type PostFormValues = z.infer<typeof postSchema>;

const CreatePostPage = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      content: "",
    },
  });

  const handleAddPost = async (data: PostFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("thumbnail", data.thumbnail);
    // Giả sử ID của tác giả ==> Lấy ID từ state khi đăng nhập
    formData.append("author", "685ba98e8f098d2d02667db1");

    try {
      await createBlog(formData);
      toast.success("Tạo bài viết thành công!");
      form.reset();
      setPreviewImage(null);
      if (editorRef.current) {
        editorRef.current.setContent("");
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
      toast.error("Tạo bài viết thất bại!");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Tạo bài viết mới</h1>

      <Card className="py-6">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const editorContent = editorRef.current?.getContent() || "";
                form.setValue("content", editorContent);
                const isValid = await form.trigger();
                if (!isValid) return;
                const data = form.getValues();
                handleAddPost(data);
              }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <Label htmlFor="title">Tiêu đề</Label>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder="Nhập tiêu đề..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field: { onChange, ...fieldProps } }) => (
                    <FormItem className="w-full md:w-1/2">
                      <Label>Thumbnail (ảnh)</Label>
                      <FormControl>
                        <div className="flex flex-col gap-4">
                          <input
                            id="thumbnail-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                                setPreviewImage(URL.createObjectURL(file));
                              }
                            }}
                            className="hidden"
                            // Remove value from fieldProps to avoid type error
                            {...(() => {
                              const { value, ...rest } = fieldProps;
                              return rest;
                            })()}
                          />

                          {/* Custom Button upload */}
                          <Button type="button" variant="outline" asChild>
                            <label
                              htmlFor="thumbnail-upload"
                              className="cursor-pointer inline-flex items-center gap-x-2"
                            >
                              <Upload className="h-4 w-4" />
                              Tải ảnh thumbnail
                            </label>
                          </Button>

                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="rounded-md w-full max-w-xs object-cover border"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Content (Editor) */}
              <FormField
                control={form.control}
                name="content"
                render={() => (
                  <FormItem>
                    <Label htmlFor="content">Nội dung</Label>
                    <FormControl>
                      <div className="rounded-md">
                        <Editor
                          apiKey="jyhjbcdtre4jtjandd2wesovu5an0ghazhq9940m7p7scj65"
                          onInit={(_, editor) => {
                            editorRef.current = editor;
                          }}
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "image",
                              "charmap",
                              "preview",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "codesample",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "heading",
                              "blockquote",
                              "code",
                            ],
                            toolbar:
                              "undo redo | " +
                              "codesample | bold italic forecolor | alignleft aligncenter |" +
                              "alignright alignjustify | bullist numlist |" +
                              "image |" +
                              "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
                              "link | blockquote | code",
                            content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
                            images_upload_url:
                              "http://localhost:3000/api/images",
                            automatic_uploads: true,
                            file_picker_types: "image",
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Tạo mới</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostPage;
