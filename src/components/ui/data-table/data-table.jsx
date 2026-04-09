"use client";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { categoryOptions, statusOptions } from "@/constants/article";
import { Button } from "../button";
import { DataTableViewOptions } from "./data-column-toogle";
import { DataTablePagination } from "./data-table-pagination";

export function DataTable({ columns, data = [] }) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const columnsMemorized = useMemo(() => columns, [columns]);
    const dataMemorized = useMemo(() => data, [data]);

    const table = useReactTable({
        data: dataMemorized,
        columns: columnsMemorized,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    // const { deleteBulkSessions } = useStudy();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Filter by title..."
                    value={table.getColumn("title")?.getFilterValue() ?? ""}
                    onChange={(event) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-md rounded-xl"
                />

                <Select
                    value={table.getColumn("category")?.getFilterValue() ?? ""}
                    onValueChange={(value) =>
                        table.getColumn("category")?.setFilterValue(value)
                    }
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {categoryOptions.map((category, idx) => (
                                <SelectItem key={idx} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    value={table.getColumn("status")?.getFilterValue() ?? ""}
                    onValueChange={(value) =>
                        table.getColumn("status")?.setFilterValue(value)
                    }
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {statusOptions.map((status, idx) => (
                                <SelectItem key={idx} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <DataTableViewOptions table={table} />
                {columnFilters.length > 0 && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Clear Filters
                    </Button>
                )}
                {Object.keys(rowSelection).length > 1 && (
                    <Button
                        variant="destructive"
                        size={"lg"}
                        onClick={() =>
                            deleteBulkSessions(
                                table
                                    .getSelectedRowModel()
                                    .flatRows.map((row) => row.original.id)
                            )
                        }
                    >
                        Bulk Delete ({Object.keys(rowSelection).length})
                        Sessions
                    </Button>
                )}
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
