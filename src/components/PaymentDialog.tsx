import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface PaymentDialogProps {
  agentId: string;
  agentName: string;
  tokenPrice: number;
  onPurchase: (amount: number) => Promise<void>;
  onClose?: () => void;
}

export function PaymentDialog({ agentId, agentName, tokenPrice, onPurchase, onClose }: PaymentDialogProps) {
  const [amount, setAmount] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [balance, setBalance] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/tokens/balance');
        if (!response.ok) throw new Error('Failed to fetch balance');
        const data = await response.json();
        setBalance(data.balance);
      } catch (err) {
        console.error('Failed to fetch token balance:', err);
        setError('Failed to fetch token balance');
      }
    };
    fetchBalance();
  }, []);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/tokens/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId,
          amount,
          totalUSDT: parseFloat(totalUSDT)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment failed');
      }

      await onPurchase(amount);
      const balanceResponse = await fetch('/api/tokens/balance');
      const balanceData = await balanceResponse.json();
      setBalance(balanceData.balance);
      onClose?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process payment");
    } finally {
      setIsLoading(false);
    }
  };

  const totalUSDT = (amount * tokenPrice).toFixed(2);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-brand-orange-500 text-white hover:bg-brand-orange-600">
          Buy Tokens
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[425px] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-brand-orange-500">
            Purchase Tokens for {agentName}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-neutral-600">
            Purchase tokens to interact with this agent. Each token is equivalent to {tokenPrice} USDT.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
          {balance !== null && (
            <div className="grid grid-cols-3 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label className="text-right text-xs sm:text-sm">Balance</Label>
              <div className="col-span-2 sm:col-span-3 text-xs sm:text-sm text-neutral-600">
                {balance} Tokens
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="amount" className="text-right text-xs sm:text-sm">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
              className="col-span-2 sm:col-span-3 text-xs sm:text-sm"
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label className="text-right text-xs sm:text-sm">Total</Label>
            <div className="col-span-2 sm:col-span-3 text-xs sm:text-sm text-neutral-600">
              {totalUSDT} USDT
            </div>
          </div>
        </div>
        {error && (
          <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-red-500">
            {error}
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={handlePurchase}
            disabled={isLoading}
            className="w-full sm:w-auto text-sm sm:text-base bg-brand-orange-500 text-white hover:bg-brand-orange-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                <span className="text-xs sm:text-sm">Processing...</span>
              </>
            ) : (
              <span className="text-xs sm:text-sm">Confirm Purchase</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
