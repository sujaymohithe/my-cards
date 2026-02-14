import { cn } from "../../lib";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * A basic text input component.
 * It applies some basic styling and allows for a class name to be passed
 * in to customize the appearance.
 *
 * @param {TextInputProps} props - The props for the component
 * @param {string} [props.className] - The class name to apply to the component
 * @returns {JSX.Element} A JSX element representing the text input
 */
export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-lg border-2 border-foreground px-4 py-3",
        "placeholder:text-foreground/50",
        "focus:outline-none focus:ring-2 focus:ring-foreground/30",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-foreground/10",
        className,
      )}
    />
  );
}
