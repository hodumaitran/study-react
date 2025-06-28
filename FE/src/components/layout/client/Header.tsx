import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full flex justify-center items-center py-3 border-b border-gray-200">
      <div className="w-full container-wrapper flex justify-between items-center">
        <div className="font-bold text-xl text-primary">Study React</div>
        <div className="flex justify-between items-center gap-8">
          <ul className="flex justify-center items-center gap-5">
            <li className="font-semibold hover:text-gray-500">
              <Link to="/">Trang chủ</Link>
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
