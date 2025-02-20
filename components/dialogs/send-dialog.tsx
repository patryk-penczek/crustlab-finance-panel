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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import { Currency } from '@/types/currency';
import { User } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckIcon, ChevronsUpDownIcon, SendIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
  action?: boolean;
  user: User;
};

export function SendDialog({ action, user }: Props) {
  const [open, setOpen] = useState(false);

  const schema = yup.object().shape({
    amount: yup
      .number()
      .transform((value, originalValue) => (originalValue === '' ? 0 : value))
      .positive('Amount must be greater than 0')
      .required('Please enter an amount')
      .test('sufficientBalance', '', function (value) {
        const currency = this.parent.currency as Currency;
        const userBalance = user.balance[currency] || 0;
        return (
          value <= userBalance ||
          this.createError({
            message: `Insufficient funds. Your ${currency} balance is ${userBalance}.`,
          })
        );
      }),
    currency: yup
      .mixed<Currency>()
      .oneOf(Object.values(Currency), 'Please select a valid currency')
      .required('Please select a currency'),
    recipientId: yup
      .string()
      .required('Please select a recipient')
      .min(1, 'Please select a recipient'),
  });

  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
      currency: Currency.PLN,
      recipientId: '',
    },
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    console.log(data);
    form.reset();
  };

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 pt-4 pb-6">
              <FormField
                control={form.control}
                name="recipientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="recipientId">Recipient</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger id="recipientId" asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between font-normal"
                          >
                            {field.value
                              ? users.find(
                                  (user) => user.id.toString() === field.value
                                )?.firstName +
                                ' ' +
                                users.find(
                                  (user) => user.id.toString() === field.value
                                )?.lastName
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
                                {users
                                  .filter(
                                    (recipient) => recipient.id !== user.id
                                  )
                                  .map((recipient) => (
                                    <CommandItem
                                      key={recipient.id}
                                      value={`${recipient.firstName} ${recipient.lastName}`}
                                      onSelect={() => {
                                        form.setValue(
                                          'recipientId',
                                          recipient.id.toString()
                                        );
                                        setOpen(false);
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          'mr-2 size-4',
                                          field.value ===
                                            recipient.id.toString()
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                      {recipient.firstName} {recipient.lastName}
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <FormControl>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                        value={field.value === 0 ? '' : field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor="currency">Currency</FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="currency"
                        render={({ field: controllerField }) => (
                          <Select
                            value={controllerField.value}
                            onValueChange={controllerField.onChange}
                          >
                            <SelectTrigger
                              id="currency"
                              className="w-full md:w-[180px]"
                            >
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {currencies.map(({ code }, index) => (
                                  <SelectItem
                                    key={index}
                                    value={code}
                                    id={`currency-option-${code}`}
                                  >
                                    <span>{code}</span>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Send money</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
