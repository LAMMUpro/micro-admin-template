import { useState } from 'react';

export default function Comp() {
  const [count, setCount] = useState(100);

  return (
    <>
      <div>
        <span>计数器: {count}</span>{' '}
        <button onClick={() => setCount(count + 1)}>点击+1</button>{' '}
      </div>
    </>
  );
}
