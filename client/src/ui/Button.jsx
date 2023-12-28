import styles from "./Button.module.css";

export default function Button(props) {
  const { children, type, className, onClick, disabled } = props;
  return (
    <button
      type={type || "button"}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
