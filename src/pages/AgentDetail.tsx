import { useParams } from 'react-router-dom';
import { ChatDetailDialog } from '../components/ChatDetailDialog';
import { useEffect, useState } from 'react';

interface Agent {
  id: string;
  name: string;
}

export function AgentDetail() {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    // Mock data for testing UI
    const mockAgent = {
      id: id || '1',
      name: 'Data Analysis Expert',
      description: 'Specialized in analyzing complex datasets and providing actionable insights.',
      tokenSymbol: 'DATA',
      price: 0.0458,
      marketCap: 2500000,
      creator: '@DataScience_AI'
    };
    
    setAgent(mockAgent);
  }, [id]);

  if (!agent) {
    return <div className="p-4">Loading...</div>;
  }

  return <ChatDetailDialog agentId={agent.id} agentName={agent.name} />;
}
