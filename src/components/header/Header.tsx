/**
 * A simple header component for the app.
 * Displays a title and a subtitle explaining the purpose of the app.
 *
 * @returns A JSX element representing the header.
 */
export function Header() {
  return (
    <header className="border-foreground/10 shrink-0 border-b">
      <div className="container py-3">
        <h1 className="text-xl font-semibold">
          My Cards
        </h1>
        <p className="text-foreground/60 text-sm">
          Cards & transactions overview
        </p>
      </div>
    </header>
  );
}
