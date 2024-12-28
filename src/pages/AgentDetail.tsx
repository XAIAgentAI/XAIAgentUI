import { useParams, useNavigate } from 'react-router-dom';
import { AgentDetailDialog } from '../components/AgentDetailDialog';
import { useEffect, useState } from 'react';
import type { Agent } from './Agents';

export function AgentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState<Agent | null>(null);


  useEffect(() => {
    // Mock data for testing UI
    const mockAgent = {
      id: id || '1',
      name: 'image generator',
      description: '专业的AI图像生成助手，支持多种风格和场景',
      creator: {
        xUsername: 'naif',
        xProfileUrl: 'https://x.com/naif'
      },
      category: 'Image Generation',
      featured: true,
      cryptoData: {
        coinName: 'IMG',
        priceChange24h: 5.23,
        currentPrice: 0.0458,
        marketLiquidity: 2500000
      },
      rating: 3.5,
      ratingCount: 10000,
      ranking: '#1 in DALL·E',
      usageStats: '10K+',
      examplePrompts: [
        '生成一张未来城市的图片',
        '创建一个虚拟人物的肖像',
        '为新科技公司设计logo',
        '绘制一个奇幻小说场景'
      ],
      features: ['网页搜索', 'DALL·E 图片'],
      ratingDistribution: [60, 25, 10, 3, 2],
      relatedAgents: [
        {
          id: '2',
          name: '高级图像生成器',
          description: '支持自定义风格的高级图像生成',
          creator: {
            xUsername: 'naif',
            xProfileUrl: 'https://x.com/naif'
          },
          cryptoData: {
            coinName: 'IMG',
            priceChange24h: 3.15,
            currentPrice: 0.0358,
            marketLiquidity: 1500000
          },
          rating: 4.2,
          ratingCount: 5000,
          ranking: '#2 in DALL·E',
          usageStats: '5K+',
          examplePrompts: [],
          features: []
        }
      ]
    };
    
    setAgent(mockAgent);
  }, [id]);

  if (!agent) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <AgentDetailDialog
      isOpen={true}
      onClose={() => navigate('/agents')}
      agent={agent}
    />
  );
}
