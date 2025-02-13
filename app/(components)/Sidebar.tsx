"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { menuItems } from "../(config)/menuItems"; // 引入菜单项

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname(); // 获取当前路径
    const [selected, setSelected] = useState("/");

    // 确保 `selected` 与 `pathname` 一致
    useEffect(() => {
        const currentPage = pathname === "/" 
            ? "Home" 
            : pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2);
        setSelected(currentPage);
    }, [pathname]);

    const handleNavigation = (page: string) => {
        setSelected(page);
        router.push(page === "Home" ? "/" : `/${page.toLowerCase()}`); // 处理 Home 页面路径
    };

    return (
        <aside className="w-48 min-w-48 bg-gray-100 p-4 flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-red-700">Menu</h2>
            {menuItems.map((item) => (
                <button
                    key={item}
                    onClick={() => handleNavigation(item)}
                    className={`w-full text-left py-2 px-4 rounded-md ${
                        selected === item ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"
                    }`}
                >
                    {item}
                </button>
            ))}
        </aside>
    );
}
