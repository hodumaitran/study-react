import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/store/useAuth";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const setUser = useAuth((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      setUser(res.data.user);
      navigate("/admin");
    } catch (err: any) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Đăng nhập thất bại!",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Đăng nhập
      </h2>

      {/* Hiển thị alert chỉ khi thất bại */}
      {alert && (
        <Alert
          variant="destructive"
          className="mb-2 border-red-500 bg-red-50 text-red-700"
        >
          <AlertCircle className="mt-1 text-red-500" />
          <AlertTitle>Lỗi đăng nhập</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Vui lòng nhập email",
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
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Mật khẩu */}
      <div>
        <label className="block text-sm font-medium mb-1">Mật khẩu</label>
        <input
          type="password"
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
          })}
          className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Password..."
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Nút submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
      </button>
      <div className="text-center">
        Bạn có tài khoản?
        <span className="text-sm text-blue-500">
          <Link to="/dang-ky"> Đăng ký</Link>
        </span>
      </div>
    </form>
  );
};

export default LoginPage;
