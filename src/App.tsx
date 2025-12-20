import { Navbar } from "@/components/navbar";
import { TodoList } from "@/components/todo-list";

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <TodoList />
      </main>
    </div>
  );
}

export default App;