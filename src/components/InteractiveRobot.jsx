import Spline from '@splinetool/react-spline';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function InteractiveRobot() {
  const splineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [performanceLevel, setPerformanceLevel] = useState(1); 

  const optimizeForMobile = useCallback(() => {
    const iframe = document.querySelector('iframe[src*="spline"]');
    if (!iframe) return;

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const canvas = iframeDoc.querySelector('canvas');
      
      if (canvas) {

        const scaleFactor = performanceLevel === 1 ? 0.6 : 0.4;
        
  
        canvas.width = canvas.width * scaleFactor;
        canvas.height = canvas.height * scaleFactor;
        
     
        canvas.style.imageRendering = 'optimizeSpeed';
        canvas.style.willChange = 'transform';
        
        canvas.style.transform = 'translateZ(0)';
      }
    } catch (e) {
      iframe.style.filter = performanceLevel === 1 ? 'blur(0.2px)' : 'blur(0.4px)';
      iframe.style.willChange = 'transform';
      iframe.style.transform = 'translateZ(0)';
    }
  }, [performanceLevel]);

  useEffect(() => {
    if (!isMobile) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;

    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;

        if (fps < 45 && performanceLevel > 0.5) {
          setPerformanceLevel(0.5); 
        } else if (fps > 55 && performanceLevel < 1) {
          setPerformanceLevel(1); 
        }
      }
      
      requestAnimationFrame(checkPerformance);
    };

    const perfMonitor = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(perfMonitor);
  }, [isMobile, performanceLevel]);

  const onLoad = useCallback((spline) => {
    splineRef.current = spline;
    
    const mobileCheck = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobileCheck);
    
    if (mobileCheck) {
      setTimeout(() => {
        if (spline.setZoom) {
          spline.setZoom(0.4); 
        }
        optimizeForMobile();
      }, 1000);
    }
  }, [optimizeForMobile]);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(mobile);
      
      if (splineRef.current && splineRef.current.setZoom) {
        splineRef.current.setZoom(mobile ? 0.4 : 1);
      }
      
      if (mobile) {
        setTimeout(optimizeForMobile, 500);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [optimizeForMobile]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-visible">
      <div 
        className="spline-wrapper w-full h-full"
        style={isMobile ? {
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          imageRendering: 'optimizeSpeed',
          willChange: 'transform',
          transformStyle: 'flat',
          perspective: '1000px',
        } : {}}
      >
        <Spline 
          scene="https://prod.spline.design/GiQi22IVkiA-P3iv/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}