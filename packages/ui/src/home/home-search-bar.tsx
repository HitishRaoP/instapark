"use client"

import React from "react"
import { Button } from "../components/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../components/form"
import { Input } from "../components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover"
import { Drawer, DrawerContent, DrawerTrigger } from "../components/drawer"
import { cn } from "../utils/cn"
import { Globe, ChevronDown, Search, LayoutGrid, LayoutList, Cross, CircleX } from "lucide-react"
import { useIsMobile } from "../hooks/use-mobile"
import { Vehicle } from "@instapark/types"
import { dateToUnixSec } from "../utils/dayjs"
import axios from "axios"
import { useState } from "react"
import { listingsSearchForm, type ListingsSearchFormType } from "../forms/listings-search-form"

/**
 * TODO:
 * 1. Make it responsive
 * @returns
 */

export const HomeSearchBar = () => {
    const form = listingsSearchForm()
    const isMobile = useIsMobile()

    const onSubmit = (values: ListingsSearchFormType) => {
        const startDate = dateToUnixSec(values.startDate as unknown as Date)
        const endDate = dateToUnixSec(values.endDate as unknown as Date)

    }

    const SearchFilters = () => (
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Start Date
                            </FormLabel>
                            <FormControl>
                                <Input type="datetime-local" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                End Date
                            </FormLabel>
                            <FormControl>
                                <Input type="datetime-local" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Vehicle
                        </FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Vehicle" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(Vehicle).map((v) => (
                                        <SelectItem className="cursor-pointer" key={v} value={v}>
                                            {v}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    )

    return (
        <div className="w-full max-w-3xl mx-auto mt-4  my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <SearchFilters />
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <div className="relative w-full">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input {...field} placeholder="Search by street" className="pl-10 w-full bg-muted" />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            {
                                isMobile ? <Search /> : "Search"
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

