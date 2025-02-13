import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/app/(UI)/Navbar";
import Sidebar from "@/app/(UI)/Sidebar";
import Footer from "@/app/(UI)/Footer";

export const metadata: Metadata = {
    title: "SowBot",
    description: "This is a SowBot Porject for pig sow management by PAALAB",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex flex-col h-screen">
                <Navbar />
                <main className="flex flex-1">
                    <Sidebar />
                    <>{children}</>
                </main>
                <Footer />
            </body>
        </html>
    );
}
