import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function InteractiveRobot() {
  const [isMobile, setIsMobile] = useState(false);
  const splineRef = useRef(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateScreen = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateScreen();

    mediaQuery.addEventListener("change", updateScreen);

    return () => {
      mediaQuery.removeEventListener("change", updateScreen);
    };
  }, []);

  const onLoad = useCallback(
    (spline) => {
      splineRef.current = spline;

      // Keep your original mobile scaling
      if (isMobile && spline.setZoom) {
        spline.setZoom(0.4);
      }
    },
    [isMobile]
  );

  return (
    <div
      ref={ref}
      className="flex items-center justify-center w-full h-full overflow-visible"
    >
      {inView && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-white animate-pulse">
                Loading Robot...
              </div>
            </div>
          }
        >
          <Spline
            scene="https://prod.spline.design/GiQi22IVkiA-P3iv/scene.splinecode"
            onLoad={onLoad}
          />
        </Suspense>
      )}
    </div>
  );
}