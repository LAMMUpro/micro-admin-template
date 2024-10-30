import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { forwardRefWrap } from 'micro-app-tools/react18/utils';

const reactCompDemo = forwardRef(function Comp(props: any, ref: any) {

  useImperativeHandle(ref, () => {
    return {
      // 暴露的方法
    };
  });

  return (
    <>
      <div style={{ height: '500px', position: 'relative' }}>
        <Canvas></Canvas>
      </div>
    </>
  );
})

export default forwardRefWrap(reactCompDemo);


interface Position {
  x: number
  y: number
}

function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos4, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

function Dot({ position, opacity }: { position: Position, opacity: number }) {
  return (
    <div style={{
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
    }} />
  );
}

function usePointerPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e: any) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
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