"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
    const router = useRouter();
    const [selected, setSelected] = useState("");

    const handleNavigation = (page: string) => {
        setSelected(page);
        if (page === "Home") {
            page = "";
        }
        router.push(`/${page.toLowerCase()}`); // 跳转到对应的页面
    };

    return (
        <aside className="w-48 min-w-48 bg-gray-100 p-4 flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-red-700">Menu</h2>
            {["Home", "Dashboard", "Posture", "Reports", "Settings"].map((item) => (
                <button
                    key={item}
                    onClick={() => handleNavigation(item)}
                    className={`w-full text-left py-2 px-4 rounded-md ${
                        selected === item
                            ? "bg-red-500 text-white"
                            : "bg-white hover:bg-gray-200"
                    }`}
                >
                    {item}
                </button>
            ))}
        </aside>
    );
}
