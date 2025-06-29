"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckCircle2, Upload, XCircle} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useAuth} from "@/store/useAuth";
import axios from "axios";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

const profileSchema = z.object({
	fullName: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
	password: z
		.string()
		.refine(
			(val) => val === "" || val.length >= 6,
			"Mật khẩu tối thiểu 6 ký tự",
		)
		.optional()
		.or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
	const {user, setUser} = useAuth();
	const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [alert, setAlert] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			fullName: user?.fullname || "",
			password: "",
		},
	});

	const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setAvatarUrl(imageUrl);
			setAvatarFile(file);
		}
	};

	const onSubmit = async (data: ProfileFormValues) => {
		if (!user) return;
		try {
			const formData = new FormData();
			formData.append("fullname", data.fullName);
			if (avatarFile) formData.append("avatar", avatarFile);
			if (data.password) formData.append("password", data.password);

			const res = await axios.patch(
				`http://localhost:3000/api/users/${user._id}`,
				formData,
				{
					headers: {"Content-Type": "multipart/form-data"},
					withCredentials: true,
				},
			);

			setUser(res.data);
			setAvatarUrl(res.data.avatar);
			setAlert({type: "success", message: "Cập nhật thành công!"});
		} catch (err) {
			setAlert({type: "error", message: "Có lỗi khi cập nhật!"});
		}
	};

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-slate-900">
				Thông tin cá nhân
			</h1>

			{alert && (
				<Alert
					variant={
						alert.type === "success" ? "default" : "destructive"
					}
					className={
						alert.type === "success"
							? "border-green-500 bg-green-50 text-green-700"
							: "border-red-500 bg-red-50 text-red-700"
					}>
					{alert.type === "success" ? (
							<CheckCircle2 className="w-5 h-5 text-green-500" />
						) : (
							<XCircle className="w-5 h-5 text-red-500" />
						)}
						<div>
							<AlertTitle>
								{alert.type === "success"
									? "Thành công"
									: "Lỗi"}
							</AlertTitle>
							<AlertDescription>{alert.message}</AlertDescription>
						</div>
				</Alert>
			)}

			<Card className="py-6">
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="username">Username</Label>
									<Input
										id="username"
										value={user?.username || ""}
										disabled
										className="bg-slate-50"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={user?.email || ""}
										disabled
										className="bg-slate-50"
									/>
								</div>
							</div>

							{/* Full Name */}
							<FormField
								control={form.control}
								name="fullName"
								render={({field}) => (
									<FormItem>
										<Label htmlFor="fullName">
											Họ và tên
										</Label>
										<FormControl>
											<Input
												id="fullName"
												placeholder="Nhập họ và tên..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Avatar upload */}
							<div className="space-y-2">
								<Label>Avatar</Label>
								<div className="flex items-center space-x-4">
									<Avatar className="h-16 w-16">
										<AvatarImage
											src={avatarUrl}
											alt="Avatar"
										/>
										<AvatarFallback>
											{user?.fullname?.[0] || "NA"}
										</AvatarFallback>
									</Avatar>
									<div>
										<input
											type="file"
											accept="image/*"
											onChange={handleAvatarUpload}
											className="hidden"
											id="avatar-upload"
										/>
										<Label htmlFor="avatar-upload">
											<Button
												type="button"
												variant="outline"
												asChild>
												<span className="cursor-pointer">
													<Upload className="h-4 w-4 mr-2" />
													Tải lên avatar
												</span>
											</Button>
										</Label>
									</div>
								</div>
							</div>

							{/* Password */}
							<FormField
								control={form.control}
								name="password"
								render={({field}) => (
									<FormItem>
										<Label htmlFor="password">
											Mật khẩu mới
										</Label>
										<FormControl>
											<Input
												id="password"
												type="password"
												placeholder="Để trống nếu không muốn thay đổi..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit">Cập nhật thông tin</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProfilePage;
