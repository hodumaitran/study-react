import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  UserCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/store/useAuth";
import { PencilIcon, UserCircleIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const mockUser = {
  name: "Nguyễn Văn A",
  username: "admin",
  email: "admin@example.com",
  avatar: "https://via.placeholder.com/40x40",
};

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

export function AdminLayout() {
  const { user } = useAuth();
  const tabs = [
    { title: "Quản lý bài viết", icon: Layers, href: "/admin/posts" },
    {
      title: "Thông tin cá nhân",
      icon: UserCircleIcon,
      href: "/admin/profile",
    },
  ];

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarProvider>
      <div className="h-screen bg-slate-50 flex w-full">
        {/* Sidebar */}
        <Sidebar
          className={cn(
            "transition-all duration-300",
            collapsed ? "w-[72px]" : "w-64"
          )}
        >
          <SidebarHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                  alt="React Logo"
                  className="w-6 h-6"
                />

                <span className="text-xl font-bold">ReactBlog</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tabs.map((tab) => {
                    const isActive = currentPath.startsWith(tab.href);
                    return (
                      <SidebarMenuItem key={tab.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={tab.href}
                            className={cn(
                              "p-3 rounded-lg font-semibold flex items-center h-auto hover:!bg-blue-100 hover:!text-blue-500",
                              isActive ? "bg-blue-100 text-blue-500" : "",
                              collapsed ? "gap-0 justify-center" : "gap-3"
                            )}
                          >
                            <tab.icon className="size-6" />
                            {!collapsed && <span>{tab.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback>
                  {user?.username}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <span className="text-sm">{mockUser.username}</span>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>

        <Toaster position="top-center" richColors />
      </div>
    </SidebarProvider>
  );
}
