import React, { useEffect, useState } from 'react';

export default function Test() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect 작동함!");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
