/*
 * @Author: wanglixin 2429056517@qq.com
 * @Date: 2024-07-29 09:48:03
 * @LastEditors: wanglixin 2429056517@qq.com
 * @LastEditTime: 2024-07-29 10:51:45
 * @FilePath: \my-fruit-app\src\components\shape\Shape.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
// 样式
import styles from "./Shape.module.css";

// 定义泛型
interface PropsType {
  type: string | number;
  styleShape: React.CSSProperties; // 更具体的类型
  speed: number;
  onClick: () => void;
}

export const Shape: React.FC<PropsType> = ({
  type,
  styleShape,
  onClick,
  speed,
}) => {
  // 使用模板字面量确保类名组合
  const shapeClassName = `${styles.shape} ${styles[type as string]}`;

  return (
    <div className={shapeClassName} style={styleShape} onClick={onClick}></div>
  );
};
