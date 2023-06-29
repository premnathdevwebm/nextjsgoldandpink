"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(preferredTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <html lang="en">
      <head>
        <title>Gold and pink</title>
      </head>
      <body className={`${inter.className}`}>
        <button className={styles.button} onClick={toggleTheme}>
          {theme === "light" ? (
            <FontAwesomeSvgIcon icon={faMoon} />
          ) : (
            <FontAwesomeSvgIcon icon={faSun} />
          )}
        </button>
        {children}
      </body>
    </html>
  );
}
