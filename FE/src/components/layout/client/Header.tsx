import { Button } from "@/components/ui/Button";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full flex justify-center items-center py-3 border-b border-gray-200">
      <div className="w-full container-wrapper flex justify-between items-center">
        <div className="font-bold text-xl text-primary">
          <Link to={"/"}>Study React</Link>
        </div>
        <div className="flex justify-between items-center gap-8">
          <ul className="flex justify-center items-center gap-5">
            <li className="font-semibold hover:text-gray-500">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary underline font-bold"
                    : "hover:text-gray-500"
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="font-semibold hover:text-gray-500">
              <NavLink
                to="/lien-he"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary underline font-bold"
                    : "hover:text-gray-500"
                }
              >
                Liên hệ
              </NavLink>
            </li>
          </ul>
          <div className="">
            <Link to="/dang-nhap">
              <Button variant="default">Đăng nhập</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
