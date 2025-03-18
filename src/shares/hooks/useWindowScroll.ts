import { useEffect, useState } from 'react';

export function useWindowScroll() {
  const [scroll, setScroll] = useState({
    x: window.scrollX,
    y: window.scrollY
  });
  useEffect(() => {
    const handleScroll = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollTo = (x: number, y: number, behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({ left: x, top: y, behavior });
  };
  return { scroll, scrollTo };
}
