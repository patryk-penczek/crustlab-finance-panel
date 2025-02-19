'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currencies } from '@/constants/currencies';
import { users } from '@/constants/users';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronsUpDownIcon, SendIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  action?: boolean;
};

export function SendDialog({ action }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

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
          <SendIcon />
          Send money
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Send money</DialogTitle>
          <DialogDescription>Send money to another user.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 pt-4 pb-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger id="recipient" asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-normal"
                >
                  {value
                    ? users.find((user) => user.id === Number(value))
                        ?.firstName +
                      ' ' +
                      users.find((user) => user.id === Number(value))?.lastName
                    : 'Select user...'}
                  <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search user..." />
                  <CommandList>
                    <CommandEmpty>User not found.</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.id}
                          value={user.id.toString()}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 size-4',
                              value === user.id.toString()
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {user.firstName} {user.lastName}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
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
