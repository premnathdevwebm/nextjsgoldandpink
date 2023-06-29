"use client";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import {
  faSun,
  faMoon,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "../../../../constants";

const renderSubLinks = (subLinks: any) => {
  if (subLinks.length === 0) {
    return null;
  }
  return (
    <ul className={styles.subcName}>
      {subLinks.map((subLink: any) => (
        <li key={subLink.key} className={styles.subcName1}>
          <Link href={subLink.href}>{subLink.text}</Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [activeSubLink, setActiveSubLink] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

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

  const toggleHamburger = () => {
    setHamburgerOpen((prev) => !prev);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles["navbar-logo"]}>
        <span>
          <Link href="/">
            <Image src={require("@/app/logo.png")} alt="compimalogo" />
          </Link>
        </span>
        <i className={styles.hamburger} onClick={toggleHamburger}>
          {hamburgerOpen ? (
            <i className={styles.icons}><FontAwesomeSvgIcon icon={faTimes} /></i>
          ) : (
            <i className={styles.icons}><FontAwesomeSvgIcon icon={faBars} /></i>
          )}
        </i>
        <ul
          className={`${styles["nav-items"]} ${
            hamburgerOpen ? styles.open : ""
          }`}
        >
          {NavLinks.map((navLink) => (
            <li
              key={navLink.key}
              onMouseEnter={
                navLink.key === "MORE" ? handleSubLinkMouseEnter : () => {}
              }
              onMouseLeave={
                navLink.key === "MORE" ? handleSubLinkMouseLeave : () => {}
              }
              className={styles.cName}
            >
              <Link href={navLink.href}>
                {navLink.text}
                {navLink.subLinks &&
                  activeSubLink &&
                  renderSubLinks(navLink.subLinks)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className={styles.button} onClick={toggleTheme}>
          {theme === "light" ? (
            <FontAwesomeSvgIcon icon={faMoon} />
          ) : (
            <FontAwesomeSvgIcon icon={faSun} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
