import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router";
import remarkGfm from "remark-gfm";
import { Heading } from "../ui/Headings";
import { ImageComp } from "../ui/image";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

function MarkdownContent({ content }) {
    return (
        <div className="flex w-full flex-col gap-6">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                children={content}
                components={{
                    p({ children }) {
                        return <Heading size="pp">{children}</Heading>;
                    },
                    h1({ children }) {
                        return <Heading size="h11">{children}</Heading>;
                    },
                    h2({ children }) {
                        return <Heading size="h22">{children}</Heading>;
                    },
                    h3({ children }) {
                        return <Heading size="h33">{children}</Heading>;
                    },
                    h4({ children }) {
                        return <Heading size="h44">{children}</Heading>;
                    },
                    h5({ children }) {
                        return <Heading size="h55">{children}</Heading>;
                    },
                    h6({ children }) {
                        return <Heading size="h66">{children}</Heading>;
                    },
                    strong({ children }) {
                        return (
                            <strong className="font-semibold">
                                {children}
                            </strong>
                        );
                    },
                    em({ children }) {
                        return <em className="italic">{children}</em>;
                    },
                    del({ children }) {
                        return <del className="line-through">{children}</del>;
                    },
                    a({ href, children }) {
                        return (
                            <NavLink
                                to={href}
                                className="text-blue-500 hover:underline"
                            >
                                {children}
                            </NavLink>
                        );
                    },
                    code({ children }) {
                        return (
                            <code className="rounded bg-muted px-1 py-0.5 text-sm">
                                {children}
                            </code>
                        );
                    },
                    blockquote({ children }) {
                        return (
                            <blockquote className="border-muted border-l-4 pl-4 text-muted italic">
                                {children}
                            </blockquote>
                        );
                    },
                    ul({ children }) {
                        return <Heading size="ul">{children}</Heading>;
                    },
                    ol({ children }) {
                        return <Heading size="ol">{children}</Heading>;
                    },
                    li({ children }) {
                        return <Heading size="li">{children}</Heading>;
                    },
                    img({ src, alt }) {
                        return (
                            <ImageComp
                                src={src}
                                alt={alt}
                                className={
                                    "aspect-video h-full w-full object-cover"
                                }
                            />
                        );
                    },
                    table({ children }) {
                        return <TableBody>{children}</TableBody>;
                    },
                    tbody({ children }) {
                        return <TableBody>{children}</TableBody>;
                    },
                    tr({ children }) {
                        return <TableRow>{children}</TableRow>;
                    },
                    thead({ children }) {
                        return <TableHeader>{children}</TableHeader>;
                    },
                    tfoot({ children }) {
                        return <TableFooter>{children}</TableFooter>;
                    },
                    th({ children }) {
                        return <TableHead>{children}</TableHead>;
                    },
                    td({ children }) {
                        return <TableCell>{children}</TableCell>;
                    },
                }}
            />
        </div>
    );
}

export default MarkdownContent;
