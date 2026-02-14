import { cn } from "@/lib";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A basic button component which wraps its children in a button element
 * and applies some basic styling.
 *
 * @param {ButtonProps} props - The props for the component
 * @param {string} [props.type="button"] - The type of the button
 * @param {ReactNode} props.children - The children of the button
 * @param {string} [props.className] - The class name to apply to the button
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @returns {JSX.Element} A JSX element representing the button
 */
export function Button({
  type = "button",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "border-foreground/20 rounded-xl border px-3 py-2 text-sm font-medium",
        { "opacity-40": disabled },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
