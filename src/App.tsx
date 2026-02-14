import { Header } from "@/components/header";
import { Dashboard } from "@/pages/Dashboard";

/**
 * The main application component.
 * Contains the header and the main content area.
 * @returns A JSX element representing the application.
 */
function App() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex flex-1 flex-col overflow-hidden py-6">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
