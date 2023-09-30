import React from "react";

interface AnswerProps extends React.LiHTMLAttributes<HTMLLIElement> {
  selected: boolean;
}
const Answer = (props: AnswerProps) => {
  const { selected, children, ...restProps } = props;
  return (
    <li
      {...restProps}
      className={`list-none hover:cursor-pointer  hover:bg-teal-400 hover:text-white hover:scale-105 duration-100 px-4 py-8 rounded-md relative ${
        selected ? "bg-teal-400" : "bg-slate-300"
      }`}
    >
      {children}
    </li>
  );
};

export default Answer;
