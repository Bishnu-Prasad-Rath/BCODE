import Spline from '@splinetool/react-spline';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function InteractiveRobot() {
  const splineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Performance monitoring for dynamic quality adjustment
  const [performanceLevel, setPerformanceLevel] = useState(1); // 1 = high, 0.5 = low

  const optimizeForMobile = useCallback(() => {
    const iframe = document.querySelector('iframe[src*="spline"]');
    if (!iframe) return;

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const canvas = iframeDoc.querySelector('canvas');
      
      if (canvas) {
        // Dynamic DPR scaling based on performance
        const scaleFactor = performanceLevel === 1 ? 0.6 : 0.4; // 720p vs 480p
        
        // Reduce canvas resolution for mobile
        canvas.width = canvas.width * scaleFactor;
        canvas.height = canvas.height * scaleFactor;
        
        // GPU optimizations
        canvas.style.imageRendering = 'optimizeSpeed';
        canvas.style.willChange = 'transform';
        
        // Force GPU layer creation
        canvas.style.transform = 'translateZ(0)';
      }
    } catch (e) {
      // Cross-origin fallback - apply CSS optimizations
      iframe.style.filter = performanceLevel === 1 ? 'blur(0.2px)' : 'blur(0.4px)';
      iframe.style.willChange = 'transform';
      iframe.style.transform = 'translateZ(0)';
    }
  }, [performanceLevel]);

  // Performance monitoring simulation
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

        // Adjust quality based on FPS
        if (fps < 45 && performanceLevel > 0.5) {
          setPerformanceLevel(0.5); // Drop to low quality
        } else if (fps > 55 && performanceLevel < 1) {
          setPerformanceLevel(1); // Return to high quality
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
      // Start with medium quality, adjust based on performance
      setTimeout(() => {
        if (spline.setZoom) {
          spline.setZoom(0.4); // Force smaller model on mobile
        }
        optimizeForMobile();
      }, 1000);
    }
  }, [optimizeForMobile]);

  // Interaction-based rendering (simulated)
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // In a native Three.js app, we'd switch to frameloop="demand" here
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
          // Maximum GPU optimizations for mobile
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          imageRendering: 'optimizeSpeed',
          willChange: 'transform',
          // Force composite layer
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