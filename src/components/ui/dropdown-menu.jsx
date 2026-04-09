"use client";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function DropdownMenu({ ...props }) {
    return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }) {
    return (
        <DropdownMenuPrimitive.Portal
            data-slot="dropdown-menu-portal"
            {...props}
        />
    );
}

function DropdownMenuTrigger({ ...props }) {
    return (
        <DropdownMenuPrimitive.Trigger
            data-slot="dropdown-menu-trigger"
            {...props}
        />
    );
}

function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                data-slot="dropdown-menu-content"
                sideOffset={sideOffset}
                className={cn(
                    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[11rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-4xl border bg-popover p-2 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
                    className
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    );
}

function DropdownMenuGroup({ ...props }) {
    return (
        <DropdownMenuPrimitive.Group
            data-slot="dropdown-menu-group"
            {...props}
        />
    );
}

function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
    return (
        <DropdownMenuPrimitive.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            data-variant={variant}
            className={cn(
                "relative flex cursor-pointer select-none items-center gap-2 rounded-2xl px-3 py-2 outline-hidden focus:bg-muted data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=info]:text-blue-700 data-[variant=success]:text-success data-[variant=warning]:text-orange-700 data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=info]:focus:bg-blue-100 data-[variant=success]:focus:bg-success/10 data-[variant=warning]:focus:bg-orange-100 data-[variant=destructive]:focus:text-destructive data-[variant=info]:focus:text-blue-700 data-[variant=success]:focus:text-success data-[variant=warning]:focus:text-orange-700 dark:data-[variant=info]:text-blue-800 dark:data-[variant=warning]:text-orange-800 dark:data-[variant=destructive]:focus:bg-destructive/20 dark:data-[variant=info]:focus:bg-blue-200 dark:data-[variant=success]:focus:bg-success/20 dark:data-[variant=warning]:focus:bg-orange-200 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
                className
            )}
            {...props}
        />
    );
}

function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            className={cn(
                "relative flex cursor-default select-none items-center gap-2 rounded-2xl py-2 pr-2 pl-8 outline-hidden focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )}
            checked={checked}
            {...props}
        >
            <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                <DropdownMenuPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
}

function DropdownMenuRadioGroup({ ...props }) {
    return (
        <DropdownMenuPrimitive.RadioGroup
            data-slot="dropdown-menu-radio-group"
            {...props}
        />
    );
}

function DropdownMenuRadioItem({ className, children, ...props }) {
    return (
        <DropdownMenuPrimitive.RadioItem
            data-slot="dropdown-menu-radio-item"
            className={cn(
                "relative flex cursor-default select-none items-center gap-2 rounded-2xl py-2 pr-2 pl-8 text-base outline-hidden focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )}
            {...props}
        >
            <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                <DropdownMenuPrimitive.ItemIndicator>
                    <CircleIcon className="size-2 fill-current" />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    );
}

function DropdownMenuLabel({ className, inset, ...props }) {
    return (
        <DropdownMenuPrimitive.Label
            data-slot="dropdown-menu-label"
            data-inset={inset}
            className={cn(
                "px-2 py-1 font-medium text-muted-foreground data-[inset]:pl-8",
                className
            )}
            {...props}
        />
    );
}

function DropdownMenuSeparator({ className, ...props }) {
    return (
        <DropdownMenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn("-mx-1 my-2 h-px bg-border", className)}
            {...props}
        />
    );
}

function DropdownMenuShortcut({ className, ...props }) {
    return (
        <span
            data-slot="dropdown-menu-shortcut"
            className={cn(
                "ml-auto text-muted-foreground text-xs tracking-widest",
                className
            )}
            {...props}
        />
    );
}

function DropdownMenuSub({ ...props }) {
    return (
        <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
    );
}

function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return (
        <DropdownMenuPrimitive.SubTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            className={cn(
                "flex cursor-default select-none items-center gap-2 rounded-2xl px-2 py-1.5 text-sm outline-hidden focus:bg-muted data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRightIcon className="ml-auto size-4" />
        </DropdownMenuPrimitive.SubTrigger>
    );
}

function DropdownMenuSubContent({ className, ...props }) {
    return (
        <DropdownMenuPrimitive.SubContent
            data-slot="dropdown-menu-sub-content"
            className={cn(
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-4xl border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in",
                className
            )}
            {...props}
        />
    );
}

export {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
};
