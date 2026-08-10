import { useState, useEffect } from 'react';

export const StaleClosureDemo = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // TƏLƏ: dependency massivi [] olduğu üçün 'count' dəyəri həmişə 0 olaraq qalır!
      console.log(`Sayğacın tətbiq daxilindəki köhnə dəyəri: ${count}`);
    }, 2000);

    return () => clearInterval(timer);
  }, []); // <-- DÜZƏLİŞ ÜÇÜN BURA [count] ƏLAVƏ EDİLMƏLİDİR

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Arat</button>
    </div>
  );
};