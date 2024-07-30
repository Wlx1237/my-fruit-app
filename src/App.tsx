/*
 * @Author: wanglixin 2429056517@qq.com
 * @Date: 2024-07-29 09:17:31
 * @LastEditors: wanglixin 2429056517@qq.com
 * @LastEditTime: 2024-07-29 11:00:42
 * @FilePath: \my-fruit-app\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%
 */
//项目入口文件
import React, { useState } from "react";
//引入组件
import { StartScreen, GameScreen, Shape, GameOverScreen } from "./components";
import styles from "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  /**
   * 处理播放点击事件
   *
   * 当点击播放按钮时，触发该函数
   * 设置游戏已开始为 true，设置游戏是否结束为 false，并设置分数为 0
   */
  const handlePlayClick = () => {
    setGameStarted(true);
    setIsGameOver(false);
    setScore(0);
  };
  /**
   * 处理游戏结束
   *
   * @param finalScore 最终得分
   */
  const handleGameOver = (finalScore) => {
    setIsGameOver(true);
    setGameStarted(false);
    setScore(finalScore);
  };
  return (
    <div className={styles["APP"]}>
      {!gameStarted && !isGameOver && <StartScreen onPlay={handlePlayClick} />}
      {gameStarted && !isGameOver && <GameScreen onGameOver={handleGameOver} />}
      {isGameOver && (
        <GameOverScreen score={score} onPlayAgain={handlePlayClick} />
      )}
    </div>
  );
}

export default App;
