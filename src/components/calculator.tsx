import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Calculator() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Calculator</CardTitle>
          <CardDescription>Basic arithmetic operation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 text-4xl font-bold">
            <span>1</span>
            <span className="text-muted-foreground">+</span>
            <span>1</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-primary">2</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
