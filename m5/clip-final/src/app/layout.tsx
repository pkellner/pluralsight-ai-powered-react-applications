"use client";
import type { Metadata } from "next";
import { usePathname } from "next/navigation"; // Import usePathname hook
import "./globals.css";
import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current path

  const isHomePage = pathname === "/"; // Check if the current page is "/"

  return (
    <html lang="en">
      <body>
        {!isHomePage && (
          <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Pluralsight Course: AI-Powered React Applications
            </h1>
            <Link
              href="/"
              className="text-blue-600 border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
            >
              Back
            </Link>
          </header>
        )}
        {/* Divider */}
        {!isHomePage && <div className="border-t border-gray-200 my-4"></div>}

        {/* Main content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
