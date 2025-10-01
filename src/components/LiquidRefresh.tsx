import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LiquidRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export interface LiquidRefreshRef {
  triggerRefresh: () => void;
}

export const LiquidRefresh = forwardRef<LiquidRefreshRef, LiquidRefreshProps>(({ onRefresh, children, className }, ref) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const PULL_THRESHOLD = 80;
  const MAX_PULL = 150;

  const animatePullRefresh = async () => {
    setIsDragging(false);
    setIsRefreshing(true);
    
    // Animate pull down
    setPullDistance(0);
    await new Promise(resolve => setTimeout(resolve, 50));
    setPullDistance(PULL_THRESHOLD);
    
    try {
      await onRefresh();
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
      }, 600);
    }
  };

  useImperativeHandle(ref, () => ({
    triggerRefresh: animatePullRefresh
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
        setIsDragging(true);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (container.scrollTop === 0) {
        startY.current = e.clientY;
        setIsDragging(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || isRefreshing) return;
      const currentY = e.touches[0].clientY;
      const distance = Math.min(Math.max(currentY - startY.current, 0), MAX_PULL);
      setPullDistance(distance);
      if (distance > 0) {
        e.preventDefault();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isRefreshing) return;
      const currentY = e.clientY;
      const distance = Math.min(Math.max(currentY - startY.current, 0), MAX_PULL);
      setPullDistance(distance);
    };

    const handleEnd = async () => {
      if (!isDragging) return;
      setIsDragging(false);

      if (pullDistance >= PULL_THRESHOLD) {
        await animatePullRefresh();
      } else {
        setPullDistance(0);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleEnd);
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
    };
  }, [isDragging, pullDistance, isRefreshing, onRefresh]);

  const pullProgress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const showIndicator = pullDistance > 0 || isRefreshing;

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-auto h-screen", className)}
      style={{ touchAction: pullDistance > 0 ? 'none' : 'auto' }}
    >
      {/* Pull Indicator */}
      {showIndicator && (
        <div 
          className="absolute top-0 left-0 right-0 z-50 flex items-end justify-center pointer-events-none"
          style={{ 
            height: `${pullDistance}px`,
            opacity: pullProgress,
            transition: isDragging ? 'none' : 'all 0.3s ease-out'
          }}
        >
          <div 
            className="liquid-refresh-animation mb-4"
            style={{
              transform: `scale(${0.5 + pullProgress * 0.5})`,
              transition: isDragging ? 'none' : 'all 0.3s ease-out'
            }}
          >
            <div className="liquid-wave"></div>
            <div className="liquid-wave liquid-wave-2"></div>
            <div className="liquid-wave liquid-wave-3"></div>
          </div>
        </div>
      )}

      {/* Content */}
      <div 
        style={{ 
          transform: `translateY(${pullDistance}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          willChange: 'transform'
        }}
        className={cn(isRefreshing && "opacity-70")}
      >
        {children}
      </div>
    </div>
  );
});

LiquidRefresh.displayName = 'LiquidRefresh';

export default LiquidRefresh;

