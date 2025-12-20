import { useState, useEffect } from "react"
import { Trash2, Plus, Check, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = "todo-app-items"

export function TodoList() {
  // Load todos from localStorage on mount using lazy initialization
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY)
    if (storedTodos) {
      try {
        return JSON.parse(storedTodos)
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error)
        return []
      }
    }
    return []
  })
  const [inputValue, setInputValue] = useState("")
  const [showCompleted, setShowCompleted] = useState(false)

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        completed: false,
        createdAt: Date.now(),
      }
      setTodos([...todos, newTodo])
      setInputValue("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Todo Input */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={addTodo} size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add task</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{activeTodos.length} active</span>
          <span>·</span>
          <span>{completedTodos.length} completed</span>
          <span>·</span>
          <span>{todos.length} total</span>
        </div>

        {/* Active Tasks */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No tasks yet. Add one above to get started!
            </p>
          ) : (
            <>
              {activeTodos.length > 0 && (
                <div className="space-y-2">
                  {activeTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors border-muted-foreground hover:border-primary"
                        aria-label="Mark as complete"
                      >
                      </button>
                      <span className="flex-1 text-foreground">
                        {todo.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTodo(todo.id)}
                        className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete task</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Completed Tasks - Collapsible */}
              {completedTodos.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowCompleted(!showCompleted)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 w-full"
                  >
                    {showCompleted ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span>
                      Completed ({completedTodos.length})
                    </span>
                  </button>

                  {showCompleted && (
                    <div className="space-y-2">
                      {completedTodos.map((todo) => (
                        <div
                          key={todo.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors opacity-75"
                        >
                          <button
                            onClick={() => toggleTodo(todo.id)}
                            className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors bg-primary border-primary"
                            aria-label="Mark as incomplete"
                          >
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </button>
                          <span className="flex-1 line-through text-muted-foreground">
                            {todo.text}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTodo(todo.id)}
                            className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete task</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
