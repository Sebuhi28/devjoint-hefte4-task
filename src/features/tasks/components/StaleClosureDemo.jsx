import { useState, useEffect } from 'react';

export const StaleClosureDemo = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // TƏLƏ: dependency massivi [] olduğu üçün 'count' dəyəri həmişə ilk (0) qiymətini oxuyacaq!
      console.log(`[Stale Closure Test] Taymerdəki sayğac dəyəri: ${count}`);
    }, 3000);

    return () => clearInterval(timer);
  }, []); // <-- Düzəltmək üçün bura [count] əlavə edilməlidir

  return (
    <div style={{ padding: '15px', border: '1px dashed #faad14', backgroundColor: '#fffbe6', margin: '20px 0', borderRadius: '6px' }}>
      <h4>Stale Closure Test Komponenti</h4>
      <p>Cari Count State: <strong>{count}</strong></p>
      <p style={{ fontSize: '12px', color: '#8c8c8c' }}>
        Console-a baxın: Düyməyə bassanız da taymer console-da həmişə köhnə "0" dəyərini yazacaq (Stale closure tələsi).
      </p>
      <button onClick={() => setCount(prev => prev + 1)}>Count Artır</button>
    </div>
  );
};