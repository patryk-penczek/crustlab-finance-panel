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
  FormDescription,
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
import { operationFees } from '@/constants/fees';
import { toast } from '@/hooks/use-toast';
import { useWithdrawOperation } from '@/hooks/use-withdraw-operation';
import { cn } from '@/lib/utils';
import { Currency } from '@/types/currency';
import { User } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { Wallet2Icon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
  action?: boolean;
  user: User;
};

export const WithdrawDialog = forwardRef<HTMLButtonElement, Props>(
  ({ action, user }, ref) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { withdraw } = useWithdrawOperation({ user });

    const schema = yup.object().shape({
      amount: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? 0 : value))
        .positive('Amount must be greater than 0')
        .required('Please enter an amount')
        .test('sufficientBalance', '', function (value) {
          const currency = this.parent.currency as Currency;
          const userBalance = user.balance[currency] || 0;
          const valueWithFee = value + value * operationFees.withdraw;
          return (
            valueWithFee <= userBalance ||
            this.createError({
              message: `Insufficient funds to make a withdraw. Required amount with fee: ${valueWithFee.toFixed(
                2
              )} ${currency}`,
            })
          );
        }),
      currency: yup
        .mixed<Currency>()
        .oneOf(Object.values(Currency), 'Please select a valid currency')
        .required('Please select a currency'),
    });

    const form = useForm<yup.InferType<typeof schema>>({
      resolver: yupResolver(schema),
      defaultValues: {
        amount: 0,
        currency: Currency.PLN,
      },
    });

    const onSubmit = (data: yup.InferType<typeof schema>) => {
      withdraw(data.amount, data.currency);
      toast({
        title: 'Withdraw successful',
        description: `Withdrew ${data.amount.toFixed(2)} ${
          data.currency
        } from ${user.firstName} ${user.lastName}`,
      });
      form.reset();
      setDialogOpen(false);
    };

    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn(
              'justify-start rounded-none',
              action && 'h-8 px-1.5 py-2 w-full'
            )}
          >
            <Wallet2Icon />
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Withdraw</DialogTitle>
            <DialogDescription>Withdraw money from account.</DialogDescription>
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
                      {field.value > 0 && (
                        <FormDescription>
                          {`Total cost: ${(
                            Number(field.value) +
                            Number(field.value) * operationFees.withdraw
                          ).toFixed(2)} ${form.watch(
                            'currency'
                          )} (including fees).`}
                        </FormDescription>
                      )}
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
                <Button type="submit">Withdraw money</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);

WithdrawDialog.displayName = 'WithdrawDialog';
