import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Calculator() {
  const num1 = 1
  const num2 = 1
  const result = num1 + num2

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Calculator</CardTitle>
          <CardDescription>Basic arithmetic operation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl font-bold">
              {num1} + {num2} = {result}
            </div>
            <div className="text-muted-foreground text-sm">
              The answer is {result}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
