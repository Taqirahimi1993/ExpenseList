import React from "react";

interface Props {
  children: string;
  maxChars?: number;
}
const ExpandableText = ({ children, maxChars = 100 }: Props) => {
  return <div>{children}</div>;
};

export default ExpandableText;
