
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWalletCreation } from '@/hooks/use-wallet-creation';
import { useMediaQuery } from '@/hooks/use-mobile';

interface WalletCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletCreationDialog: React.FC<WalletCreationDialogProps> = ({
  open,
  onOpenChange
}) => {
  const {
    formData,
    handleInputChange,
    handleCreateWallet,
  } = useWalletCreation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "w-[95vw] max-w-[95vw]" : ""}>
        <DialogHeader>
          <DialogTitle>Add New Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Wallet Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Cash, Bank Account"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="balance">Initial Balance</Label>
            <Input
              id="balance"
              name="balance"
              type="number"
              step="0.01"
              value={formData.balance}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              name="currency"
              placeholder="USD"
              value={formData.currency}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="color"
                name="color"
                type="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-12 h-8 p-0"
              />
              <span className="text-sm">{formData.color}</span>
            </div>
          </div>
          <Button 
            className="w-full mt-4" 
            onClick={() => {
              handleCreateWallet();
              onOpenChange(false);
            }}
          >
            Add Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletCreationDialog;
