import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { BadgeCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Agent } from '../pages/Agents';

interface AgentDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
}

export function AgentDetailDialog({ isOpen, onClose, agent }: AgentDetailDialogProps) {
  const navigate = useNavigate();
  if (!agent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <ScrollArea className="max-h-[90vh]">
          {/* Header Section */}
          <DialogHeader className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
                {/* Agent Image Placeholder */}
                <span className="text-4xl text-orange-500">AI</span>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">image generator</DialogTitle>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>创建者：</span>
                  <span className="text-orange-500">naif</span>
                </div>
              </div>
            </div>
            <DialogDescription className="text-base leading-relaxed">
              {agent.description}
            </DialogDescription>
          </DialogHeader>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 my-6 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-5 h-5 text-orange-500" />
                <span className="text-xl font-semibold">3.5</span>
              </div>
              <p className="text-sm text-gray-600">评级 10K+</p>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">#1</div>
              <p className="text-sm text-gray-600">属于DALL·E 全球</p>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">#1</div>
              <p className="text-sm text-gray-600">属于DALL·E 全球</p>
            </div>
          </div>

          {/* Example Prompts Section */}
          <div className="my-6">
            <h3 className="text-lg font-semibold mb-4">对话开场白</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                '生成一张未来城市的图片',
                '创建一个虚拟人物的肖像',
                '为新科技公司设计logo',
                '绘制一个奇幻小说场景'
              ].map((prompt, index) => (
                <Card key={index} className="p-4 hover:bg-orange-50 cursor-pointer transition-colors">
                  <p className="text-sm">{prompt}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="my-6">
            <h3 className="text-lg font-semibold mb-4">功能</h3>
            <div className="space-y-3">
              {['网页搜索', 'DALL·E 图片'].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <BadgeCheck className="w-5 h-5 text-orange-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="my-6">
            <h3 className="text-lg font-semibold mb-4">评级</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="w-4">{rating}</span>
                  <Star className="w-4 h-4 text-orange-500" />
                  <Progress value={100 - (rating - 1) * 20} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* More by Creator */}
          <div className="my-6">
            <h3 className="text-lg font-semibold mb-4">更多来自 naif</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "高级图像生成器", description: "支持自定义风格的高级图像生成" },
                { name: "代码助手", description: "AI驱动的编程帮手和调试器" }
              ].map((relatedAgent, index) => (
                <Card key={index} className="p-4 hover:bg-orange-50 cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">{relatedAgent.name}</h4>
                  <p className="text-sm text-gray-600">{relatedAgent.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <DialogFooter>
          <Button  
            onClick={() => {
              onClose();
              navigate(`/chat/${agent.id}`);
            }} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
          >
            开始聊天
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
