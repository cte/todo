import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Calculator() {
  const question = "1+1"
  const answer = 2

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Simple Calculator</CardTitle>
          <CardDescription>
            Answering your mathematical question
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6 py-6">
            <div className="text-6xl font-bold text-primary">
              {question}
            </div>
            <div className="text-8xl font-bold">=</div>
            <div className="flex items-center space-x-3">
              <div className="text-6xl font-bold text-primary">
                {answer}
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                Correct!
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
