import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, LoginData, RegisterData } from "@/services/auth.service";
import { useAuth as useAuthStore } from "@/store/useAuth";

export interface AuthAlert {
  type: "success" | "error";
  message: string;
}

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [alert, setAlert] = useState<AuthAlert | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setAlert(null);
    
    try {
      const response = await authService.login(data);
      setUser(response.user);
      navigate("/admin");
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Đăng nhập thất bại!";
      setAlert({
        type: "error",
        message: errorMessage,
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setAlert(null);
    
    try {
      await authService.register(data);
      setAlert({
        type: "success",
        message: "Đăng ký thành công!",
      });
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Đăng ký thất bại!";
      setAlert({
        type: "error",
        message: errorMessage,
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearAlert = () => setAlert(null);

  return {
    login,
    register,
    alert,
    clearAlert,
    isLoading,
  };
};