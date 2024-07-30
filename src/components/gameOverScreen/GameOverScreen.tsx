/*
 * @Author: wanglixin 2429056517@qq.com
 * @Date: 2024-07-29 10:18:16
 * @LastEditors: wanglixin 2429056517@qq.com
 * @LastEditTime: 2024-07-29 10:22:02
 * @FilePath: \my-fruit-app\src\components\gameOverScreen\GameOverScreen.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//游戏结束
import React from "react";
//样式
import styles from "./GameOverScreen.module.css";
interface PropsType {
  score: string | number;
  onPlayAgain: () => void;
}

export const GameOverScreen: React.FC<PropsType> = ({ score, onPlayAgain }) => {
  return (
    <div className={styles["game-over-screen"]}>
      <p>Game Over! Your score: {score}</p>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};
