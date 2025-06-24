import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface RegisterFormData {
  username: string;
  email: string;
  numberPhone: string;
  password: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Dữ liệu gửi đi:", data);
    alert("Đăng ký thành công!");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">Đăng ký</h2>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          {...register("username", {
            required: "Username là bắt buộc",
            minLength: { value: 3, message: "Tối thiểu 3 ký tự" },
          })}
          className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Username..."
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
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
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Số điện thoại */}
      <div>
        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
        <input
          type="tel"
          {...register("numberPhone", {
            required: "Số điện thoại là bắt buộc",
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ",
            },
          })}
          className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
            errors.numberPhone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Số điện thoại..."
        />
        {errors.numberPhone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.numberPhone.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mật khẩu</label>
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
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
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
