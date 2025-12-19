import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Calculator() {
  const num1 = 1
  const num2 = 1
  const result = num1 + num2

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Simple Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl font-bold text-primary">
              {num1} + {num2} = {result}
            </div>
            <p className="text-muted-foreground text-center">
              The answer to 1+1 is {result}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
