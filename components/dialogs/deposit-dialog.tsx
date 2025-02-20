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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currencies } from '@/constants/currencies';
import { cn } from '@/lib/utils';
import { Currency } from '@/types/currency';
import { User } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { PiggyBankIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
  action?: boolean;
  user: User;
};

const schema = yup.object().shape({
  amount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value))
    .positive('Amount must be greater than 0')
    .required('Please enter an amount'),
  currency: yup
    .mixed<Currency>()
    .oneOf(Object.values(Currency), 'Please select a valid currency')
    .required('Please select a currency'),
});

export function DepositDialog({ action }: Props) {
  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
      currency: Currency.PLN,
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
          <PiggyBankIcon />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>Deposit money into account.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 pt-4 pb-6">
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
                                  <SelectItem key={index} value={code}>
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
              <Button type="submit">Deposit money</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
