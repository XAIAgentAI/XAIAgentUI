import { useState } from "react";
import { AgentDetailDialog } from "../components/AgentDetailDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CryptoData {
  coinName: string;
  priceChange24h: number;
  currentPrice: number;
  marketLiquidity: number;
}

export interface Agent {
  id: string;
  name: string;
  creator: {
    xUsername: string;
    xProfileUrl: string;
  };
  description: string;
  category?: string;
  featured?: boolean;
  cryptoData: CryptoData;
  rating: number;
  ratingCount: number;
  ranking: string;
  usageStats: string;
  examplePrompts: string[];
  features: string[];
  ratingDistribution?: number[];
  relatedAgents?: Agent[];
}

const CATEGORIES = [
  "Top Picks",
  "Writing",
  "Productivity",
  "Research & Analysis",
  "Education",
  "Lifestyle",
  "Programming"
];

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [trainingData, setTrainingData] = useState("");
  const [agentDialogOpen, setAgentDialogOpen] = useState<boolean>(false);
  // Placeholder data simulating user-created X Agents
  const agents: Agent[] = [
    {
      id: "1",
      name: "Data Analysis Expert",
      creator: {
        xUsername: "DataScience_AI",
        xProfileUrl: "https://x.com/DataScience_AI"
      },
      description: "Specialized in analyzing complex datasets and providing actionable insights. Perfect for business intelligence and research tasks.",
      category: "Research & Analysis",
      featured: true,
      cryptoData: {
        coinName: "DATA",
        priceChange24h: 5.23,
        currentPrice: 0.0458,
        marketLiquidity: 2500000
      },
      rating: 4.9,
      ratingCount: 12500,
      ranking: "#1 in Data Analysis",
      usageStats: "15M+",
      examplePrompts: [
        "Analyze market trends for crypto tokens",
        "Predict price movements based on historical data",
        "Generate trading strategies",
        "Analyze sentiment from social media data"
      ],
      features: [
        "Real-time market analysis",
        "Advanced trading algorithms",
        "Risk assessment tools",
        "Sentiment analysis"
      ],
      ratingDistribution: [70, 20, 5, 3, 2]
    },
    {
      id: "2",
      name: "Code Assistant Pro",
      creator: {
        xUsername: "TechSolutions",
        xProfileUrl: "https://x.com/TechSolutions"
      },
      description: "Your personal coding companion. Helps with debugging, code reviews, and best practices across multiple programming languages.",
      category: "Programming",
      featured: true,
      cryptoData: {
        coinName: "CODE",
        priceChange24h: -2.15,
        currentPrice: 0.0892,
        marketLiquidity: 3750000
      },
      rating: 4.8,
      ratingCount: 8900,
      ranking: "#1 in Programming",
      usageStats: "10M+",
      examplePrompts: [
        "Debug this Python code",
        "Explain this React component",
        "Optimize this SQL query",
        "Suggest code improvements"
      ],
      features: [
        "Multi-language support",
        "Code optimization",
        "Best practices suggestions",
        "Real-time debugging"
      ],
      ratingDistribution: [65, 25, 5, 3, 2]
    },
    {
      id: "3",
      name: "Content Writer",
      creator: {
        xUsername: "ContentPro",
        xProfileUrl: "https://x.com/ContentPro"
      },
      description: "Creates engaging content for blogs, social media, and marketing materials with a focus on SEO optimization.",
      category: "Writing",
      featured: true,
      cryptoData: {
        coinName: "WRITE",
        priceChange24h: 8.45,
        currentPrice: 0.0675,
        marketLiquidity: 1850000
      },
      rating: 4.7,
      ratingCount: 7500,
      ranking: "#1 in Content Writing",
      usageStats: "8M+",
      examplePrompts: [
        "Write a blog post about AI",
        "Create social media content",
        "Generate SEO-optimized headlines",
        "Draft marketing copy"
      ],
      features: [
        "SEO optimization",
        "Multi-format content",
        "Brand voice matching",
        "Engagement analytics"
      ],
      ratingDistribution: [60, 25, 10, 3, 2]
    },
    // Add more placeholder agents as needed
  ];

  const featuredAgents = agents.filter(agent => agent.featured);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Categories Bar */}
      <div className="flex overflow-x-auto space-x-4 mb-8 pb-2">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50/50 whitespace-nowrap tracking-wide transition-all duration-200 ease-in-out rounded-lg px-4 py-2"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 tracking-tight leading-tight">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAgents.map(agent => (
            <div
              key={agent.id}
              className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out hover:border-orange-200"
            >
              <h3 className="text-xl font-semibold mb-3 tracking-tight leading-snug">{agent.name}</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-base font-medium tracking-wide">{agent.cryptoData.coinName}</span>
                    <span className={`text-base font-medium ${agent.cryptoData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {agent.cryptoData.priceChange24h >= 0 ? '+' : ''}{agent.cryptoData.priceChange24h}%
                    </span>
                  </div>
                  <div className="text-sm leading-relaxed text-gray-600">
                    ${agent.cryptoData.currentPrice.toFixed(4)} | 流动市值: ${(agent.cryptoData.marketLiquidity / 1000000).toFixed(2)}M
                  </div>
                </div>
                <a
                  href={agent.creator.xProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-all duration-200 ease-in-out hover:underline"
                >
                  创建者: @{agent.creator.xUsername}
                </a>
              </div>
              <p className="text-base leading-relaxed text-gray-700 mb-4">{agent.description}</p>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-orange-500 text-white hover:bg-orange-600"
                      onClick={() => {
                        console.log(`Preparing to train agent: ${agent.name}`);
                        setSelectedAgent(agent);
                        setTrainingData("");
                      }}
                    >
                      Train Agent
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Train {selectedAgent?.name}</DialogTitle>
                      <DialogDescription>
                        Provide training data for your X Agent. This data will be used to customize the agent's behavior.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <Textarea
                        placeholder="Enter training data or upload a file..."
                        value={trainingData}
                        onChange={(e) => setTrainingData(e.target.value)}
                        className="min-h-[200px]"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            console.log('Training cancelled');
                            setTrainingData("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={() => {
                            console.log(`Training agent ${selectedAgent?.name} with data:`, trainingData);
                            // TODO: Connect to backend API
                            setTrainingData("");
                          }}
                        >
                          Start Training
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedAgent(agent);
                    setAgentDialogOpen(true);
                  }}
                >
                  Learn More
                </Button>
                <AgentDetailDialog
                  isOpen={agentDialogOpen && selectedAgent?.id === agent.id}
                  onClose={() => setAgentDialogOpen(false)}
                  agent={selectedAgent}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Sections */}
      {CATEGORIES.map((category) => {
        const categoryAgents = agents.filter(agent => agent.category === category);
        if (categoryAgents.length === 0) return null;

        return (
          <div key={category} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 tracking-tight leading-tight">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryAgents.map(agent => (
                <div
                  key={agent.id}
                  className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out hover:border-orange-200"
                >
                  <h3 className="text-xl font-semibold mb-3 tracking-tight leading-snug">{agent.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-base font-medium tracking-wide">{agent.cryptoData.coinName}</span>
                        <span className={`text-base font-medium ${agent.cryptoData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {agent.cryptoData.priceChange24h >= 0 ? '+' : ''}{agent.cryptoData.priceChange24h}%
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed text-gray-600">
                        ${agent.cryptoData.currentPrice.toFixed(4)} | 流动市值: ${(agent.cryptoData.marketLiquidity / 1000000).toFixed(2)}M
                      </div>
                    </div>
                    <a
                      href={agent.creator.xProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-all duration-200 ease-in-out hover:underline"
                    >
                      创建者: @{agent.creator.xUsername}
                    </a>
                  </div>
                  <p className="text-base leading-relaxed text-gray-700 mb-4">{agent.description}</p>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-orange-500 text-white hover:bg-orange-600"
                          onClick={() => {
                            console.log(`Preparing to train agent: ${agent.name}`);
                            setSelectedAgent(agent);
                            setTrainingData("");
                          }}
                        >
                          Train Agent
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Train {selectedAgent?.name}</DialogTitle>
                          <DialogDescription>
                            Provide training data for your X Agent. This data will be used to customize the agent's behavior.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <Textarea
                            placeholder="Enter training data or upload a file..."
                            value={trainingData}
                            onChange={(e) => setTrainingData(e.target.value)}
                            className="min-h-[200px]"
                          />
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                console.log('Training cancelled');
                                setTrainingData("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="bg-orange-500 hover:bg-orange-600"
                              onClick={() => {
                                console.log(`Training agent ${selectedAgent?.name} with data:`, trainingData);
                                // TODO: Connect to backend API
                                setTrainingData("");
                              }}
                            >
                              Start Training
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedAgent(agent);
                        setAgentDialogOpen(true);
                      }}
                    >
                      Learn More
                    </Button>
                    <AgentDetailDialog
                      isOpen={agentDialogOpen && selectedAgent?.id === agent.id}
                      onClose={() => setAgentDialogOpen(false)}
                      agent={selectedAgent}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
