import React from "react";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`container mx-auto p-2 md:p-6 lg:p-8 ${className}`}>{children}</div>
  );
};

export default Container;