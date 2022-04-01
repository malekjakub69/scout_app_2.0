import React from "react";
import "./my-button.scss";
import { Button } from "antd";

function MyButton({ children, style, onClick, size = "large", href, type = "dashed", width }: any) {
  return (
    <div className={"myButtonComponent"}>
      <Button
        onClick={onClick}
        size={size}
        type={type}
        className={"myButton"}
        href={href}
        style={width ? { ...style, width: width } : style}
      >
        {children}
      </Button>
    </div>
  );
}

export default MyButton;
