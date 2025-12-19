import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export function Calculator() {
  const [result, setResult] = React.useState<number | null>(null)

  const calculate = () => {
    setResult(1 + 1)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Simple Calculator</CardTitle>
        <CardDescription>What is 1 + 1?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4 text-2xl font-semibold">
          <span>1</span>
          <PlusIcon className="h-6 w-6" />
          <span>1</span>
          <span>=</span>
          <span className="text-primary">{result !== null ? result : "?"}</span>
        </div>
        <Button onClick={calculate} className="w-full">
          Calculate
        </Button>
      </CardContent>
    </Card>
  )
}
