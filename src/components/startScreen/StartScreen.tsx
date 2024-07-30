/*
 * @Author: wanglixin 2429056517@qq.com
 * @Date: 2024-07-29 09:35:50
 * @LastEditors: wanglixin 2429056517@qq.com
 * @LastEditTime: 2024-07-29 09:43:50
 * @FilePath: \my-fruit-app\src\components\startScreen\StartScreen.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//游戏开始组件
import React from "react";
//引入样式文件
import styles from "./StartScreen.module.css";

//定义泛型约束
interface PropsType {
  onPlay: () => void;
}

export const StartScreen: React.FC<PropsType> = ({ onPlay }) => {
  return (
    <div className={styles["start-screen"]}>
      <button onClick={onPlay}>Play</button>
    </div>
  );
};
