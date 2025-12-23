import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, TrashIcon, CheckIcon, CircleIcon } from "lucide-react"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

type FilterType = "all" | "active" | "completed"

export function TodoApp() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [inputValue, setInputValue] = React.useState("")
  const [filter, setFilter] = React.useState<FilterType>("all")

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTodos([newTodo, ...todos])
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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Todo List</CardTitle>
          <CardDescription>
            Manage your tasks efficiently and stay organized
          </CardDescription>
          <div className="flex gap-2 pt-4">
            <Badge variant={filter === "all" ? "default" : "secondary"}>
              All ({todos.length})
            </Badge>
            <Badge variant={filter === "active" ? "default" : "secondary"}>
              Active ({activeCount})
            </Badge>
            <Badge variant={filter === "completed" ? "default" : "secondary"}>
              Completed ({completedCount})
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addTodo}>
              <PlusIcon data-icon="inline-start" />
              Add
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>

          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                {filter === "all" && "No tasks yet. Add one to get started!"}
                {filter === "active" && "No active tasks. Great job!"}
                {filter === "completed" && "No completed tasks yet."}
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTodo(todo.id)}
                    className="shrink-0"
                  >
                    {todo.completed ? (
                      <CheckIcon className="text-primary" />
                    ) : (
                      <CircleIcon />
                    )}
                    <span className="sr-only">
                      {todo.completed ? "Mark as incomplete" : "Mark as complete"}
                    </span>
                  </Button>
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {todo.text}
                  </span>
                  {todo.completed && (
                    <Badge variant="secondary" className="shrink-0">
                      Done
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="shrink-0 text-destructive hover:text-destructive"
                  >
                    <TrashIcon />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="pt-4 text-center text-sm text-muted-foreground">
              {activeCount === 0 && completedCount > 0
                ? "🎉 All tasks completed!"
                : `${activeCount} task${activeCount !== 1 ? "s" : ""} remaining`}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
