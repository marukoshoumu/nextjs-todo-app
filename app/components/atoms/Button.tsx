import React from "react";
import Link from "next/link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  const baseClass =
    "px-4 py-2 font-semibold rounded-md transition duration-200";
  const fullClassName = `${baseClass} ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <div className={fullClassName}>{children}</div>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={fullClassName} disabled={disabled}>
      {children}
    </button>
  );
};
