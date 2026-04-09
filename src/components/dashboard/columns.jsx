import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusOptions } from "@/constants/article";
import { useArticle } from "@/providers/article-provider";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/data-table/data-table-column-header";

const Actions = ({ row }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { updateStatus, deleteArticle } = useArticle();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-lg">
                    <MoreHorizontal className="rotate-90" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            updateStatus(
                                row.original.id,
                                row.original.status === statusOptions[0]
                                    ? statusOptions[1]
                                    : row.original.status === statusOptions[1]
                                      ? statusOptions[2]
                                      : statusOptions[0]
                            );
                        }}
                        variant={
                            row.original.status === statusOptions[0]
                                ? "warning"
                                : row.original.status === statusOptions[1]
                                  ? "destructive"
                                  : "success"
                        }
                    >
                        {row.original.status === statusOptions[0] &&
                            "Publish Article"}
                        {row.original.status === statusOptions[1] &&
                            "Archive Article"}
                        {row.original.status === statusOptions[2] &&
                            "Draft Article"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => navigate(`/articles/${row.original.id}`)}
                    >
                        View Article
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() =>
                            navigate(
                                `/dashboard/articles/${row.original.id}/edit`
                            )
                        }
                    >
                        Edit Article
                    </DropdownMenuItem>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                variant="destructive"
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setOpen(true);
                                }}
                            >
                                Delete Article
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure you want to delete this
                                    article?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex items-center justify-end gap-2">
                                <AlertDialogCancel className={"flex-1"}>
                                    Cancel
                                </AlertDialogCancel>
                                <Button
                                    variant="destructive"
                                    className={"flex-1"}
                                    onClick={() => {
                                        deleteArticle(row.original.id);
                                        setOpen(false);
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const statusVariant = {
    Draft: "warning",
    Published: "success",
    Archived: "destructive",
};

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Title" />;
        },
        cell: ({ row }) => {
            return (
                <NavLink to={`/articles/${row.original.id}`}>
                    {row.original.title}
                </NavLink>
            );
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Category" />;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Status" />;
        },
        cell: ({ row }) => (
            <Badge variant={statusVariant[row.original.status] ?? "default"}>
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "publishedAt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Published At" />
            );
        },
        cell: ({ row }) => {
            return row.original.publishedAt !== null
                ? format(new Date(row.original.publishedAt), "PPP")
                : "Not Published Yet";
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Created At" />;
        },
        cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
    },
    {
        id: "actions",
        cell: ({ row }) => <Actions row={row} />,
        enableHiding: false,
        enableSorting: false,
    },
];
