import { cn } from "@/lib";

interface SectionProps extends React.PropsWithChildren {
  title?: string;
  className?: string;
}

/**
 * A basic section component which wraps its children in a container
 * and applies some basic styling.
 *
 * @param {SectionProps} props - The props for the component
 * @param {string} [props.title] - The title to display above the section
 * @param {ReactNode} props.children - The children of the section
 * @returns {JSX.Element} A JSX element representing the section
 */
export function Section({ title, children, className }: SectionProps) {
  return (
    <section className={cn("container space-y-4", className)}>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {children}
    </section>
  );
}
