"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../utils/cn"
import { Button } from "../components/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../components/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/popover"
import { getCountryDataList } from "countries-list";

export type CountryComboboxProps = {
    value: string;
    defaultValue?: string;
    onChange: (value: string) => void;
}

export function CountryCombobox({ value, defaultValue, onChange }: CountryComboboxProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? getCountryDataList().find((country) => country.name === value)?.name
                        : defaultValue || "Select Country"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Search Countries" />
                    <CommandList>
                        <CommandEmpty>No Country Found.</CommandEmpty>
                        <CommandGroup>
                            {getCountryDataList().map((country) => (
                                <CommandItem
                                    key={country.name}
                                    value={country.name}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === country.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {country.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
