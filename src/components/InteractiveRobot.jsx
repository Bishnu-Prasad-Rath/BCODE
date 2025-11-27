import Spline from '@splinetool/react-spline';
import { useCallback, useState, useEffect, useRef } from 'react';

export default function InteractiveRobot() {
  const splineRef = useRef(null);

  const onLoad = useCallback((spline) => {
    splineRef.current = spline;
    
    // Force smaller viewport for mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile && spline.setZoom) {
      spline.setZoom(0.6); // Much smaller zoom
      
      // Try to find and modify the iframe directly
      setTimeout(() => {
        const iframe = document.querySelector('iframe[src*="spline"]');
        if (iframe) {
          iframe.style.transform = 'scale(0.7)';
          iframe.style.transformOrigin = 'center center';
        }
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (splineRef.current && splineRef.current.setZoom) {
        splineRef.current.setZoom(isMobile ? 0.6 : 1);
      }
      
      // Update iframe scaling
      const iframe = document.querySelector('iframe[src*="spline"]');
      if (iframe) {
        iframe.style.transform = isMobile ? 'scale(0.7)' : 'scale(1)';
        iframe.style.transformOrigin = 'center center';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-visible">
      <div className="spline-wrapper" style={{
        transform: 'scale(1)',
        width: '100%',
        height: '100%',
      }}>
        <Spline 
          scene="https://prod.spline.design/GiQi22IVkiA-P3iv/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}