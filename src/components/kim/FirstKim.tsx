import type { FC } from "react";

interface FirstKimProps {
  title?: string;
}

const FirstKim: FC<FirstKimProps> = (props) => {
  return <button className="bg-yellow-600">내 첫번째 {props.title}</button>;
};

export default FirstKim;
