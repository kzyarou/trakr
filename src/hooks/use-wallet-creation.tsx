
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Wallet } from '@/lib/types';
import { getWallets, saveWallets, generateId } from '@/lib/data';

export function useWalletCreation() {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    balance: 0,
    currency: 'USD',
    color: '#4299E1',
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'balance' ? parseFloat(value) || 0 : value,
    });
  };

  const handleCreateWallet = () => {
    const wallets = getWallets();
    const newWallet: Wallet = {
      id: generateId(),
      name: formData.name,
      balance: formData.balance,
      currency: formData.currency,
      color: formData.color,
      createdAt: new Date(),
      isDefault: wallets.length === 0,
    };

    const updatedWallets = [...wallets, newWallet];
    saveWallets(updatedWallets);
    setShowDialog(false);
    resetForm();

    toast({
      title: "Wallet Added",
      description: `${formData.name} wallet has been added successfully.`,
    });

    // Trigger a page refresh or update to reflect the new wallet
    window.dispatchEvent(new CustomEvent('wallet-created'));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      balance: 0,
      currency: 'USD',
      color: '#4299E1',
    });
  };

  const openDialog = () => {
    resetForm();
    setShowDialog(true);
  };

  return {
    showDialog,
    setShowDialog,
    formData,
    handleInputChange,
    handleCreateWallet,
    openDialog,
  };
}
