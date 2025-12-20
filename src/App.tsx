import { ComponentExample } from "@/components/component-example";
import { Navbar } from "@/components/navbar";

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ComponentExample />
      </main>
    </div>
  );
}

export default App;