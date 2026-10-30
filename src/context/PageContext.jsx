

import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const PageContext = createContext();

function PageContextProvider({children}) {
  const [theme, setTheme] = useState('light-mode');
  
  function updateTheme() {
    if (theme == 'light-mode') {
      setTheme("dark-mode");
    } else {
      setTheme("light-mode");
    }
  };
  // Now, update page html dynamically on every change
  useEffect(() => {
    setPageTheme(theme);
  }, [theme]);

  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(pathname.split('/').pop());
  currentPage == '' && setCurrentPage('home');

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1100);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1100);
  }, [window.innerWidth]);

  return <PageContext.Provider
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
}


function setPageTheme(theme) {
  let html = document.querySelector('html');
  html.classList.remove('light-mode', 'dark-mode');
  html.classList.add(theme);
}

export default PageContextProvider;