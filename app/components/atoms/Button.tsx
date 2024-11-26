type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

/**
 * ボタン
 * @param   {void}onClick
 * @param   {React.ReactNode}children
 * @param   {string}[className = ""]
 * @param   {boolean}[disabled = false]
 * @returns
 */
export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  const baseClass =
    "px-4 py-2 font-semibold rounded-md transition duration-200";
  const fullClassName = `${baseClass} ${className}`;

  return (
    <button onClick={onClick} className={fullClassName} disabled={disabled}>
      {children}
    </button>
  );
};
