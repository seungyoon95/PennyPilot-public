"use client";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "./CategoryPicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransaction } from "../_actions/transactions";
import { toast } from "sonner";
import { DateToUTCDate } from "@/lib/helpers";

interface Props {
    trigger: ReactNode;
    type: TransactionType;
}

function CreateTransactionDialog({trigger, type} : Props) {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date(),
        },
    });

    const [open, setOpen] = React.useState(false);

    const handleCategoryChange = React.useCallback((value: string) => {
        form.setValue("category", value);
    }, [form]);

    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: CreateTransaction,
        onSuccess: () => {
            toast.success("Transcation created successfully", {
                id: "create-transaction",
            });

            form.reset({
                type,
                description: "",
                amount: 0,
                date: new Date(),
                category: undefined,
            });

            queryClient.invalidateQueries({
                queryKey: ["overview"],
            });

            setOpen((prev) => !prev);
        },
    });

    const onSubmit = React.useCallback((values: CreateTransactionSchemaType) => {
        toast.loading("Creating transaction...", {
            id: "create-transaction"
        });

        mutate({
            ...values,
            date: DateToUTCDate(values.date),
        })
    }, [mutate]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="bg-primary-foreground">
                <DialogHeader>
                    <DialogTitle>
                        New 
                        <span className={cn(
                            "m-1",
                            type === "income" ? "text-emerald-500" :
                            "text-red-500"
                        )}>
                            {type}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={""} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field}) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={0} type="number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between gap-2">
                            <FormField
                                control={form.control}
                                name="category"
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <CategoryPicker 
                                                type={type} 
                                                onChange={handleCategoryChange} 
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Transaction Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={
                                                        cn(
                                                            "w-[200px] pl-3 text-left",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar 
                                                    mode="single" 
                                                    selected={field.value} 
                                                    onSelect={value => {
                                                        if (!value) return ;
                                                        field.onChange(value);
                                                    }} 
                                                    initialFocus 
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant={"secondary"} onClick={() => {
                            form.reset();
                        }}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                        {!isPending && "Create"}
                        {isPending && <Loader2 className="animate-spin" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTransactionDialog;