import * as React from "react"
import { PlusIcon, TrashIcon, CheckIcon } from "lucide-react"
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

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [inputValue, setInputValue] = React.useState("")

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
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

  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Todo List</CardTitle>
          <CardDescription>
            Manage your tasks efficiently. Add, complete, and delete todos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTodo} className="mb-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!inputValue.trim()}>
                <PlusIcon className="h-4 w-4" />
                Add
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <p className="text-lg">No todos yet!</p>
                <p className="text-sm">Add your first task to get started.</p>
              </div>
            ) : (
              <>
                {activeTodos.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                      Active Tasks
                    </h3>
                    {activeTodos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                      />
                    ))}
                  </div>
                )}

                {completedTodos.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                      Completed Tasks
                    </h3>
                    {completedTodos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="flex gap-2">
            <Badge variant="secondary">
              {activeTodos.length} active
            </Badge>
            <Badge variant="outline">
              {completedTodos.length} completed
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Total: {todos.length} {todos.length === 1 ? "task" : "tasks"}
          </div>
        </CardFooter>
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
      className={`group flex items-center gap-3 rounded-lg border bg-card p-3 transition-all hover:shadow-md ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
          todo.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground hover:border-primary"
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && <CheckIcon className="h-3 w-3" />}
      </button>
      <span
        className={`flex-1 ${
          todo.completed ? "text-muted-foreground line-through" : ""
        }`}
      >
        {todo.text}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
