"use client";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "../../../../constants";

const renderSubLinks = (
  subLinks: any
) => {
  if (subLinks.length === 0) {
    return null;
  }
  return (
    <ul className="absolete z-10">
      {subLinks.map((subLink: any) => (
        <li key={subLink.key}>
          <Link href={subLink.href}>{subLink.text}</Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [activeSubLink, setActiveSubLink] = useState(false);

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

  const handleSubLinkMouseEnter = () => {
    setActiveSubLink(true);
  };

  const handleSubLinkMouseLeave = () => {
    setActiveSubLink(false);
  };

  return (
    <div className="h-24 flexBetween navbar md:min-h-full">
      <div className="flex-1 flexStart gap-10">
        <span>
          <Link href="/">
            <Image src={require("@/app/logo.png")} alt="ima" />
          </Link>
        </span>
        <ul className="xl:flex hidden text-small gap-7 relative">
          {NavLinks.map((navLink) => (
            <li
              key={navLink.key}
              onMouseEnter={
                navLink.key === "MORE" ? handleSubLinkMouseEnter : () => {}
              }
              onMouseLeave={
                navLink.key === "MORE" ? handleSubLinkMouseLeave : () => {}
              }
            >
              <Link href={navLink.href}>{navLink.text}</Link>
              {navLink.subLinks &&
                activeSubLink &&
                renderSubLinks(
                  navLink.subLinks
                )}
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.button} onClick={toggleTheme}>
        {theme === "light" ? (
          <FontAwesomeSvgIcon icon={faMoon} />
        ) : (
          <FontAwesomeSvgIcon icon={faSun} />
        )}
      </button>
    </div>
  );
};

export default Navbar;
