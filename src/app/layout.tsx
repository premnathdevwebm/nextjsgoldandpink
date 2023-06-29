import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

import NavBar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Gold and pink</title>
      </head>
      <body className={`${inter.className}`}>
        <NavBar />
        <main className={styles.mainContent}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
