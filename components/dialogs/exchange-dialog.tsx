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
import {
  getExchangeRate,
  useExchangeOperation,
} from '@/hooks/use-exchange-operation';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Currency } from '@/types/currency';
import { User } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { CoinsIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
  action?: boolean;
  user: User;
};

export const ExchangeDialog = forwardRef<HTMLButtonElement, Props>(
  ({ action, user }, ref) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { exchange } = useExchangeOperation({ user });

    const schema = yup.object().shape({
      amount: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? 0 : value))
        .positive('Amount must be greater than 0')
        .required('Please enter an amount')
        .test('sufficientBalance', '', function (value) {
          const fromCurrency = this.parent.fromCurrency as Currency;
          const userBalance = user.balance[fromCurrency] || 0;
          return (
            value <= userBalance ||
            this.createError({
              message: `Insufficient funds. Your ${fromCurrency} balance is ${userBalance.toFixed(
                2
              )}.`,
            })
          );
        }),
      fromCurrency: yup
        .mixed<Currency>()
        .oneOf(Object.values(Currency), 'Please select a valid currency')
        .required('Please select a currency'),
      toCurrency: yup
        .mixed<Currency>()
        .oneOf(Object.values(Currency), 'Please select a valid currency')
        .required('Please select a currency')
        .test(
          'differentCurrency',
          'Currencies must be different',
          function (value) {
            return value !== this.parent.fromCurrency;
          }
        ),
    });

    const form = useForm<yup.InferType<typeof schema>>({
      resolver: yupResolver(schema),
      defaultValues: {
        amount: 0,
        fromCurrency: Currency.PLN,
        toCurrency: Currency.USD,
      },
    });

    const onSubmit = (data: yup.InferType<typeof schema>) => {
      exchange(data.amount, data.fromCurrency, data.toCurrency);
      toast({
        title: 'Exchange successful',
        description: `Exchanged ${data.amount.toFixed(2)} ${
          data.fromCurrency
        } to 
      ${(
        getExchangeRate(data.fromCurrency, data.toCurrency) *
        (data.amount - data.amount * operationFees.exchange)
      ).toFixed(2)} ${data.toCurrency}`,
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
            <CoinsIcon />
            Exchange currency
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Exchange currency</DialogTitle>
            <DialogDescription>
              Exchange currency to another currency.
            </DialogDescription>
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
                          {`${field.value} ${form.watch('fromCurrency')} → ${(
                            getExchangeRate(
                              form.watch('fromCurrency'),
                              form.watch('toCurrency')
                            ) *
                            (field.value - field.value * operationFees.exchange)
                          ).toFixed(2)} ${form.watch(
                            'toCurrency'
                          )} (after fees)`}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fromCurrency"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="fromCurrency">
                        From currency
                      </FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="fromCurrency"
                          render={({ field: controllerField }) => (
                            <Select
                              value={controllerField.value}
                              onValueChange={controllerField.onChange}
                            >
                              <SelectTrigger
                                id="fromCurrency"
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
                <FormField
                  control={form.control}
                  name="toCurrency"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="toCurrency">To currency</FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="toCurrency"
                          render={({ field: controllerField }) => (
                            <Select
                              value={controllerField.value}
                              onValueChange={controllerField.onChange}
                            >
                              <SelectTrigger
                                id="toCurrency"
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
                <Button type="submit">Exchange currency</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);

ExchangeDialog.displayName = 'ExchangeDialog';
