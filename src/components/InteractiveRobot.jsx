import Spline from '@splinetool/react-spline';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function InteractiveRobot() {
  const [isMobile, setIsMobile] = useState(false);
  const splineRef = useRef(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector("iframe[src*='spline']");

    if (!iframe) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        iframe.style.pointerEvents = entry.isIntersecting ? "auto" : "none";
      },
      { threshold: 0.2 }
    );

    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  const onLoad = useCallback((spline) => {
    splineRef.current = spline;

    if (isMobile && spline.setZoom) {
      spline.setZoom(0.4);
    }
  }, [isMobile]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-visible">
      <Spline
        scene={
          isMobile
            ? "https://prod.spline.design/GiQi22IVkiA-P3iv/scene.splinecode?low=1"
            : "https://prod.spline.design/GiQi22IVkiA-P3iv/scene.splinecode"
        }
        onLoad={onLoad}
      />
    </div>
  );
}
