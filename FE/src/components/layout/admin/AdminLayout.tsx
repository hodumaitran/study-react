import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { PencilIcon, UserCircleIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const mockUser = {
  name: "Nguyễn Văn A",
  username: "admin",
  email: "admin@example.com",
  avatar: "https://via.placeholder.com/40x40",
};

export function AdminLayout() {
  const tabs = [
    { title: "Quản lý bài viết", icon: PencilIcon, href: "/admin/posts" },
    {
      title: "Thông tin cá nhân",
      icon: UserCircleIcon,
      href: "/admin/profile",
    },
  ];

  return (
    <SidebarProvider>
      <div className="h-screen bg-slate-50 flex w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader className="px-4 py-6 text-xl font-bold">
            ReactBlog
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tabs.map((tab) => (
                    <SidebarMenuItem key={tab.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={tab.href}
                          className="flex items-center space-x-2"
                        >
                          <tab.icon />
                          <span>{tab.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-4 py-4 border-t">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback>
                  {mockUser.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{mockUser.username}</span>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
