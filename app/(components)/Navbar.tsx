"use client";
import { Menu, Search, Bell } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Menu className="cursor-pointer" size={24} />
                <h1 className="text-2xl font-bold">SowBot Management System</h1>
            </div>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                    />
                    <Search
                        className="absolute left-3 top-2.5 text-gray-500"
                        size={16}
                    />
                </div>
                <Bell className="cursor-pointer" size={24} />
            </div>
        </nav>
    );
}
