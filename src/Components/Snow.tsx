// Snow.tsx
import React, { useEffect, useState } from "react";

// 눈송이 데이터 타입 정의
interface Snowflake {
  id: number;
  size: number; // 눈송이 크기 (px)
  left: number; // X 위치 (%)
  duration: number; // 애니메이션 지속 시간 (초)
  delay: number; // 애니메이션 딜레이 (초)
}

const Snow: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      const snowflakeArray: Snowflake[] = [];
      for (let i = 0; i < 100; i++) {
        snowflakeArray.push({
          id: i,
          size: Math.random() * 5 + 5, // 눈송이 크기 (5px ~ 10px)
          left: Math.random() * 100, // 화면의 X 위치 (0% ~ 100%)
          duration: Math.random() * 5 + 5, // 떨어지는 시간 (5초 ~ 10초)
          delay: Math.random() * 5, // 시작 지연 시간 (0초 ~ 5초)
        });
      }
      setSnowflakes(snowflakeArray);
    };

    generateSnowflakes();
  }, []);

  return (
    <div className="snow-container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Snow;
