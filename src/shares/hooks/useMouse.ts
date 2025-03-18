import { useEffect, useRef, useState } from 'react';

interface IMousePosition {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
}
export function useMousePosition<T extends HTMLElement>() {
  const [mouse, setMouse] = useState<IMousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0
  });
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      let elementX = 0,
        elementY = 0,
        elementPositionX = 0,
        elementPositionY = 0;

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        elementX = x - rect.left;
        elementY = y - rect.top;
        elementPositionX = rect.left + window.scrollX;
        elementPositionY = rect.top + window.scrollY;
      }

      setMouse({ x, y, elementX, elementY, elementPositionX, elementPositionY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return { ref, ...mouse };
}
