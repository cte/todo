import * as React from "react"
import { Check, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [inputValue, setInputValue] = React.useState("")

  const addTodo = () => {
    if (inputValue.trim() === "") return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    }

    setTodos([newTodo, ...todos])
    setInputValue("")
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">Todo List</CardTitle>
            <Badge variant="secondary" className="text-sm">
              {activeTodos.length} active
            </Badge>
          </div>
          <CardDescription>
            Keep track of your tasks and stay organized
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addTodo} size="default">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No todos yet</p>
              <p className="text-sm mt-1">Add your first task to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
              {completedTodos.length > 0 && (
                <>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground font-medium mb-3">
                      Completed ({completedTodos.length})
                    </p>
                  </div>
                  {completedTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </CardContent>
        {todos.length > 0 && (
          <CardFooter className="text-sm text-muted-foreground border-t border-border pt-6">
            <div className="flex items-center justify-between w-full">
              <span>
                {activeTodos.length} task{activeTodos.length !== 1 ? "s" : ""}{" "}
                remaining
              </span>
              {completedTodos.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTodos(activeTodos)}
                  className="text-destructive hover:text-destructive"
                >
                  Clear completed
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`group flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? "bg-primary border-primary"
            : "border-muted-foreground hover:border-primary"
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && <Check className="h-3 w-3 text-primary-foreground" />}
      </button>
      <span
        className={`flex-1 ${
          todo.completed
            ? "line-through text-muted-foreground"
            : "text-foreground"
        }`}
      >
        {todo.text}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        aria-label="Delete todo"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
