import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Dialog({ ...props }) {
    return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }) {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                "data-open:fade-in-0 data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/30 duration-100 data-closed:animate-out data-open:animate-in supports-backdrop-filter:backdrop-blur-sm",
                className
            )}
            {...props}
        />
    );
}

function DialogContent({
    className,
    children,
    showCloseButton = true,
    ...props
}) {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                    "data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-4xl bg-popover p-6 text-popover-foreground text-sm shadow-xl outline-none ring-1 ring-foreground/5 duration-100 data-closed:animate-out data-open:animate-in sm:max-w-lg dark:ring-foreground/10",
                    className
                )}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <DialogPrimitive.Close data-slot="dialog-close" asChild>
                        <Button
                            variant="ghost"
                            className="absolute top-4 right-4 bg-secondary"
                            size="icon-sm"
                        >
                            <XIcon />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    );
}

function DialogHeader({ className, ...props }) {
    return (
        <div
            data-slot="dialog-header"
            className={cn("flex flex-col gap-1.5", className)}
            {...props}
        />
    );
}

function DialogFooter({
    className,
    showCloseButton = false,
    children,
    ...props
}) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        >
            {children}
            {showCloseButton && (
                <DialogPrimitive.Close asChild>
                    <Button variant="outline">Close</Button>
                </DialogPrimitive.Close>
            )}
        </div>
    );
}

function DialogTitle({ className, ...props }) {
    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={cn(
                "font-heading font-medium text-base leading-none",
                className
            )}
            {...props}
        />
    );
}

function DialogDescription({ className, ...props }) {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn(
                "text-muted-foreground text-sm *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
                className
            )}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};
