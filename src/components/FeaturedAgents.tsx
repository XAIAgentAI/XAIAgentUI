import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"

interface Agent {
  id: string
  name: string
  description: string
  creator: string
  tokenSymbol: string
  tokenPrice: number
  marketCap: number
  priceChange: number
}

const featuredAgents: Agent[] = [
  {
    id: "1",
    name: "Data Analysis Expert",
    description: "Specialized in analyzing complex datasets and providing actionable insights. Perfect for business intelligence and research tasks.",
    creator: "@DataScience_AI",
    tokenSymbol: "DATA",
    tokenPrice: 0.0458,
    marketCap: 2.50,
    priceChange: 5.23
  },
  {
    id: "2",
    name: "Code Assistant Pro",
    description: "Your personal coding companion. Helps with debugging, code reviews, and best practices across multiple programming languages.",
    creator: "@TechSolutions",
    tokenSymbol: "CODE",
    tokenPrice: 0.0892,
    marketCap: 3.75,
    priceChange: -2.15
  },
  {
    id: "3",
    name: "Content Writer",
    description: "Creates engaging content for blogs, social media, and marketing materials with a focus on SEO optimization.",
    creator: "@ContentPro",
    tokenSymbol: "WRITE",
    tokenPrice: 0.0675,
    marketCap: 1.85,
    priceChange: 8.45
  }
]

export function FeaturedAgents() {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Featured Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{agent.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-medium">{agent.tokenSymbol}</span>
                  <span className={`text-sm ${agent.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {agent.priceChange >= 0 ? '+' : ''}{agent.priceChange}%
                  </span>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                ${agent.tokenPrice.toFixed(4)} | Market Cap: ${agent.marketCap}M
              </div>
              <CardDescription>Created by {agent.creator}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">{agent.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Train Agent</Button>
              <Button>Learn More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
