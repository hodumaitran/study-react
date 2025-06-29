import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert";
import {AlertCircle, CheckCircle} from "lucide-react";

interface RegisterFormData {
	fullname: string;
	username: string;
	email: string;
	password: string;
}

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<RegisterFormData>();

	const [alert, setAlert] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await axios.post("http://localhost:3000/api/register", data, {
				headers: {"Content-Type": "application/json"},
			});
			setAlert({type: "success", message: "Đăng ký thành công!"});
		} catch (err: any) {
			setAlert({
				type: "error",
				message: err.response?.data?.message || "Đăng ký thất bại!",
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
			<h2 className="text-2xl font-bold text-center text-blue-600">
				Đăng ký
			</h2>

			{alert && (
				<Alert
					variant={alert.type === "error" ? "destructive" : "default"}
					className={`mb-2 ${
						alert.type === "error"
							? "border-red-500 bg-red-50 text-red-700"
							: "border-green-500 bg-green-50 text-green-700"
					}`}>
					{alert.type === "error" ? (
						<AlertCircle className="mt-1 text-red-500" />
					) : (
						<CheckCircle className="mt-1 text-green-500" />
					)}
					<AlertTitle>
						{alert.type === "error"
							? "Lỗi khi đăng ký"
							: "Thành công"}
					</AlertTitle>
					<AlertDescription className="flex">
						{alert.message}
						{alert.type === "success" && (
							<span>
								<Link
									to="/dang-nhap"
									className="text-blue-600 underline font-medium">
									Đăng nhập ngay
								</Link>
							</span>
						)}
					</AlertDescription>
				</Alert>
			)}

			{/* Fullname */}
			<div>
				<label className="block text-sm font-medium mb-1">
					Họ và tên
				</label>
				<input
					type="text"
					{...register("fullname", {
						required: "Họ và tên là bắt buộc",
						minLength: {value: 3, message: "Tối thiểu 3 ký tự"},
					})}
					className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
						errors.fullname ? "border-red-500" : "border-gray-300"
					}`}
					placeholder="Họ và tên..."
				/>
				{errors.fullname && (
					<p className="text-red-500 text-sm mt-1">
						{errors.fullname.message}
					</p>
				)}
			</div>

			{/* Username */}
			<div>
				<label className="block text-sm font-medium mb-1">
					Username
				</label>
				<input
					type="text"
					{...register("username", {
						required: "Username là bắt buộc",
						minLength: {value: 3, message: "Tối thiểu 3 ký tự"},
					})}
					className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
						errors.username ? "border-red-500" : "border-gray-300"
					}`}
					placeholder="Username..."
				/>
				{errors.username && (
					<p className="text-red-500 text-sm mt-1">
						{errors.username.message}
					</p>
				)}
			</div>

			{/* Email */}
			<div>
				<label className="block text-sm font-medium mb-1">Email</label>
				<input
					type="email"
					{...register("email", {
						required: "Email là bắt buộc",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Email không hợp lệ",
						},
					})}
					className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
						errors.email ? "border-red-500" : "border-gray-300"
					}`}
					placeholder="Email..."
				/>
				{errors.email && (
					<p className="text-red-500 text-sm mt-1">
						{errors.email.message}
					</p>
				)}
			</div>

			{/* Mật khẩu */}
			<div>
				<label className="block text-sm font-medium mb-1">
					Mật khẩu
				</label>
				<input
					type="password"
					{...register("password", {
						required: "Mật khẩu là bắt buộc",
						minLength: {
							value: 6,
							message: "Mật khẩu tối thiểu 6 ký tự",
						},
					})}
					className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
						errors.password ? "border-red-500" : "border-gray-300"
					}`}
					placeholder="Mật khẩu..."
				/>
				{errors.password && (
					<p className="text-red-500 text-sm mt-1">
						{errors.password.message}
					</p>
				)}
			</div>
			{/* Submit */}
			<button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
				Đăng ký
			</button>
			<div className="text-center">
				Bạn có muốn đăng nhập?
				<span className="text-sm text-blue-500">
					<Link to="/dang-nhap"> Đăng nhập</Link>
				</span>
			</div>
		</form>
	);
};

export default RegisterPage;
