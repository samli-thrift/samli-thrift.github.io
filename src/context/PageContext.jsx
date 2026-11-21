import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PageContext = createContext();

const THEME_KEY = "samli-theme";
const DESKTOP_QUERY = "(min-width: 1100px)";

// Saved choice first; otherwise light (your current default)
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light-mode" || saved === "dark-mode") return saved;
  } catch {
    /* storage blocked: fall through */
  }
  return "light-mode";
}

// "/shop" -> "shop", "/" -> "home"
const pageFromPath = (pathname) =>
  pathname.split("/").filter(Boolean).pop() || "home";

function setPageTheme(theme) {
  const html = document.documentElement;
  html.classList.remove("light-mode", "dark-mode");
  html.classList.add(theme);
}

function PageContextProvider({ children }) {
  const { pathname } = useLocation();

  // ---------- Theme ----------
  const [theme, setTheme] = useState(getInitialTheme);

  const updateTheme = () =>
    setTheme((t) => (t === "light-mode" ? "dark-mode" : "light-mode"));

  useLayoutEffect(() => {
    setPageTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // ---------- Current page (kept in sync with the URL) ----------
  const [currentPage, setCurrentPage] = useState(() => pageFromPath(pathname));

  useEffect(() => {
    setCurrentPage(pageFromPath(pathname));
  }, [pathname]);

  // ---------- Desktop breakpoint (updates on resize) ----------
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <PageContext.Provider
      value={{
        theme,
        setTheme,
        currentPage,
        setCurrentPage,
        isDesktop,
        updateTheme,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export default PageContextProvider;