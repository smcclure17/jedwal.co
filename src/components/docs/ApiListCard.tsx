import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface ApiListCardProps {

}

export function ApiListCard({}: ApiListCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row align-middle">
        <CardTitle>Roadmap Content</CardTitle>
        <CardDescription>/api/camel-rugged</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-xs">https://docs.google.com/spreadsheets/d/1HLDNLGfAgCgEnCwTsB78y85hNBuJM...</span>
      </CardContent>
    </Card>
  )
}
