import React, { useState, useEffect, useRef } from "react";
import { Shape } from "../shape";
import styles from "./GameScreen.module.css";
import scoreImg from "../../assets/image/score.png";
import timeImg from "../../assets/image/time.png";

// 方块倍数设置
const shapes = [
  { type: "square", speed: 1, points: 10 },
  { type: "circle", speed: 1.25, points: 20 },
  { type: "triangle", speed: 1.5, points: 30 },
  { type: "hexagon", speed: 1.75, points: 40 },
];

// 计算方块 - 随机生成形状
const getRandomShape = () => {
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  return {
    ...shape,
    id: Date.now() + Math.random(), // 使用更可靠的唯一标识符
    x: Math.random() * (window.innerWidth - 50),
    y: -50,
  };
};

export const GameScreen: React.FC<{ onGameOver: (score: number) => void }> = ({
  onGameOver,
}) => {
  const [shapesList, setShapesList] = useState(() => [getRandomShape()]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 游戏时间设置为2分钟
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapesList((prevShapes) => {
        const newShapes = prevShapes
          .map((shape) => ({ ...shape, y: shape.y + shape.speed }))
          .filter((shape) => shape.y < window.innerHeight);

        if (prevShapes.length !== newShapes.length || prevShapes.length == 0) {
          newShapes.push(getRandomShape());
        }

        // Check for game over condition
        if (newShapes.some((shape) => shape.y >= window.innerHeight)) {
          clearInterval(interval);
          onGameOver(score);
          return [];
        }
        console.log("newShapes", newShapes);
        return newShapes;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [onGameOver, score]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          onGameOver(score);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onGameOver, score]);

  const handleShapeClick = (id: number, points: number) => {
    setScore((prev) => prev + points);
    setShapesList((prev) => prev.filter((shape) => shape.id !== id));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleCollision(touch.clientX, touch.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleCollision(e.clientX, e.clientY);
  };
  //   const handleCollision = (x: number, y: number) => {
  //     // 找出所有被点击的形状
  //     const hitShapes = shapesList.filter((shape) => {
  //       const shapeSize = 50; // 形状的固定大小
  //       const isHit =
  //         x >= shape.x &&
  //         x <= shape.x + shapeSize &&
  //         y >= shape.y &&
  //         y <= shape.y + shapeSize;
  //       return isHit;
  //     });

  //     // 如果没有形状被点击，则不执行任何操作
  //     if (hitShapes.length === 0) return;

  //     // 更新分数（这里假设所有被点击的形状都加相同的分数，实际应根据需要调整）
  //     setScore((prevScore) => {
  //       let totalPoints = 0;
  //       hitShapes.forEach((shape) => {
  //         totalPoints += shape.points; // 累加所有被点击形状的分数
  //       });
  //       return prevScore + totalPoints;
  //     });
  //     // 过滤掉被点击的形状
  //     setShapesList((prev) => {
  //       // 使用 id 来判断形状是否应该被保留
  //       return prev.filter(
  //         (shape) => !hitShapes.some((hitShape) => hitShape.id === shape.id)
  //       );
  //     });
  //   };

  const handleCollision = (x: number, y: number) => {
    // 找出所有被点击的形状
    const hitShapes = shapesList.filter((shape) => {
      const shapeSize = 150; // 形状的固定大小
      const isHit =
        x >= shape.x &&
        x <= shape.x + shapeSize &&
        y >= shape.y &&
        y <= shape.y + shapeSize;
      return isHit;
    });

    // 如果没有形状被点击，则不执行任何操作
    if (hitShapes.length === 0) return;

    // 更新分数
    setScore((prevScore) => {
      let totalPoints = 0;
      hitShapes.forEach((shape) => {
        totalPoints += shape.points; // 累加所有被点击形状的分数
      });
      return prevScore + totalPoints;
    });

    // 过滤掉被点击的形状并确保至少有3个形状在屏幕上
    setShapesList((prev) => {
      const newShapes = prev.filter(
        (shape) => !hitShapes.some((hitShape) => hitShape.id === shape.id)
      );

      // 确保至少有3个形状在屏幕上
      while (newShapes.length < 3) {
        newShapes.push(getRandomShape());
      }
      console.log("newShapes", newShapes);
      return newShapes;
    });
  };
  return (
    <div
      className={styles["game-screen"]}
      ref={gameRef}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
    >
      {shapesList.map((shape) => (
        <Shape
          key={shape.id}
          type={shape.type}
          styleShape={{ top: shape.y, left: shape.x, position: "absolute" }} // 确保位置绝对
          speed={shape.speed}
          onClick={() => handleShapeClick(shape.id, shape.points)}
        />
      ))}
      <div>
        <div className={styles["score"]}>
          <img style={{ width: 20, height: 20 }} src={scoreImg} />:{" "}
          <span>{score}</span>
        </div>
        <div className={styles["timer"]}>
          <img style={{ width: 20, height: 20 }} src={timeImg} />:
          <span>
            {Math.floor(timeLeft / 60)}:{timeLeft % 60}
          </span>
        </div>
      </div>
    </div>
  );
};
