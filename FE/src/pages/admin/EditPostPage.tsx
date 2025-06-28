import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
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
import { Upload } from "lucide-react";

const postSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  thumbnail: z.instanceof(File, { message: "Vui lòng chọn ảnh thumbnail" }),
  content: z.string().min(1, "Nội dung là bắt buộc"),
});

type PostFormValues = z.infer<typeof postSchema>;

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      content: "",
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        const data = await res.json();
        form.reset({
          title: data.title || "",
          thumbnail: undefined,
          content: data.content || "",
        });
        setPreviewImage(data.thumbnail || null);
        if (editorRef.current && data.content) {
          editorRef.current.setContent(data.content);
        }
      } catch {
        form.reset({ title: "", thumbnail: undefined, content: "" });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorRef.current?.getContent() || "";
    form.setValue("content", content);
    const isValid = await form.trigger();
    if (!isValid) return;
    const data = form.getValues();
    console.log("Form cập nhật:", data);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Chỉnh sửa bài viết</h1>

      <Card className="py-6">
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
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
                            {...(() => {
                              const { value, ...rest } = fieldProps;
                              return rest;
                            })()}
                          />
                          <Label htmlFor="thumbnail-upload">
                            <Button type="button" variant="outline" asChild>
                              <span className="cursor-pointer flex items-center">
                                <Upload className="h-4 w-4 mr-2" />
                                Tải ảnh thumbnail
                              </span>
                            </Button>
                          </Label>
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

              <FormField
                control={form.control}
                name="content"
                render={() => (
                  <FormItem>
                    <Label htmlFor="content">Nội dung</Label>
                    <FormControl>
                      <div className="border rounded-md">
                        <Editor
                          apiKey="jyhjbcdtre4jtjandd2wesovu5an0ghazhq9940m7p7scj65"
                          onInit={(_, editor) => {
                            editorRef.current = editor;
                            const content = form.getValues("content");
                            if (content) editor.setContent(content);
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
                            ],
                            toolbar:
                              "undo redo | " +
                              "codesample | bold italic forecolor | alignleft aligncenter |" +
                              "alignright alignjustify | bullist numlist |" +
                              "image |" +
                              "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
                              "link",
                            content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
                            images_upload_url:
                              "http://localhost:3000/api/upload-image",
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
                <Button type="submit">Cập nhật</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPostPage;
