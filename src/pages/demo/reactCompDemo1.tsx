import { isMobile } from '@/utils';
import React, { useState, useEffect, useRef, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

const reactCompDemo = () => {
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={divRef}
      style={{ height: '360px', position: 'relative' }}
    >
      <Canvas containerRef={divRef}></Canvas>
    </div>
  );
};
export default reactCompDemo;

function Canvas(props: { containerRef: React.RefObject<HTMLDivElement> }) {
  const pos1 = usePointerPosition(props.containerRef);
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos4, 50);
  return (
    <>
      <Dot
        position={pos1}
        opacity={1}
      />
      <Dot
        position={pos2}
        opacity={0.8}
      />
      <Dot
        position={pos3}
        opacity={0.6}
      />
      <Dot
        position={pos4}
        opacity={0.4}
      />
      <Dot
        position={pos5}
        opacity={0.2}
      />
    </>
  );
}

function Dot({ position, opacity }: { position: Position; opacity: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    />
  );
}

function usePointerPosition(containerRef: RefObject<HTMLDivElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e: any) {
      /** 兼容移动端/桌面端 */
      const position = isMobile() ? { x: e.touches[0]?.clientX, y: e.touches[0]?.clientY - containerTop } : { x: e.offsetX, y: e.offsetY }
      setPosition(position);
    }

    const containerTop = containerRef.current?.getClientRects()?.[0].top || 0;

    /** 兼容移动端/桌面端 */
    containerRef.current?.addEventListener(isMobile() ? 'touchmove' : 'pointermove', handleMove);

    return () => {
      containerRef.current?.removeEventListener(isMobile() ? 'touchmove' : 'pointermove', handleMove);
    };
  }, []);
  return position;
}

function useDelayedValue(value: Position, delay: number) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}
