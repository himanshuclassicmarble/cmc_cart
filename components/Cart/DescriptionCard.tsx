'use client'

import React from 'react';
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  OrderFormData,
  validDealers,
  shippingOptions,
  paymentStatusOptions
} from "@/app/types/CartForm/Schemas";
import Container from '../Container/Container';
import CartCard from './CartCard';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarRangeIcon } from 'lucide-react';
import { Card } from '../ui/card';

const dealerOptions = validDealers.map(dealer => ({
  value: dealer,
  label: dealer
}));

interface DescriptionCardProps {
  onSubmit: (data: OrderFormData) => void;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ onSubmit }) => {
  const form = useForm<OrderFormData>({
    defaultValues: {
      dealer: {
        value: "",
        label: ""
      },
      products: [],
      remarks: "",
      termsAndConditions: "",
      shippingMethod: {
        value: "standard",
        label: "Standard Shipping"
      },
      poNumber: "",
      paymentStatus: "pending",
      deliveryDate: new Date()
    }
  });

  return (
    <Container>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="lg:space-y-6 flex flex-col gap-3 lg:flex-row lg:gap-4">
          <div className="grid grid-cols-1 lg:w-[200vh] md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="dealer"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Select Dealer</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      form.setValue("dealer", {
                        value,
                        label: value
                      });
                    }}
                    value={field.value.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-16 bg-gray-200">
                        <SelectValue placeholder="Select a dealer"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dealerOptions.map((dealer) => (
                        <SelectItem 
                          key={dealer.value} 
                          value={dealer.value}
                        >
                          {dealer.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <CartCard />
                </FormItem>
              )}
            />
          </div>

          <Separator className='lg:hidden'/>
      
          <Card className="w-full flex flex-col gap-5 p-3 lg:w-1/2 lg:p-5 bg-slate-100 rounded-sm border-none">
            <div className="flex flex-col flex-grow gap-2 w-full">
              <h2 className="text-xl font-bold uppercase">Remarks/Samples</h2>
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Textarea 
                        placeholder="Enter your remarks" 
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="termsAndConditions"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Textarea 
                        placeholder="Terms and Conditions" 
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="w-full flex flex-col">
              <h2 className="text-xl font-bold uppercase">Shipping & Payment</h2>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="shippingMethod"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={(value) => {
                          const option = shippingOptions.find(opt => opt.value === value);
                          if (option) {
                            form.setValue("shippingMethod", option);
                          }
                        }}
                        value={field.value.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className='bg-gray-200 w-full'>
                            <SelectValue placeholder="Select shipping method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {shippingOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="poNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="w-full">
                        <Input {...field} placeholder="Enter PO number" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Delivery Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="w-full">
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarRangeIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className='bg-gray-200 w-full'>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

          </Card>
        </form>
      </Form>
    </Container>
  );
};

export default DescriptionCard;