'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currencies } from '@/constants/currencies';
import { cn } from '@/lib/utils';
import { PiggyBankIcon } from 'lucide-react';

type Props = {
  action?: boolean;
};

export function DepositDialog({ action }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'justify-start rounded-none',
            action && 'h-8 px-1.5 py-2 w-full'
          )}
        >
          <PiggyBankIcon />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>Deposit money into account.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4 pb-6">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="currency">Currency</Label>
            <Select>
              <SelectTrigger id="currency" className="w-full md:w-[180px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {currencies.map(({ code }, index) => (
                    <SelectItem key={index} value={code}>
                      <span>{code}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
