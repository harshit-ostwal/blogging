import { Leaf } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router";
import { userRoles } from "@/constants/roles";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Heading } from "../ui/Headings";

function Navbar() {
    const [loading, setLoading] = useState(false);
    const { loggedInUser, signOut } = useAuth();

    return (
        <div className="flex items-center justify-between">
            <NavLink to={"/"}>
                <Heading
                    size="h4"
                    className={"inline-flex items-center gap-2 font-semibold"}
                >
                    <Leaf size={32} className="fill-green-600" /> Medium
                </Heading>
            </NavLink>

            {loggedInUser && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"ghost"}
                            className="flex items-center gap-4 rounded-4xl px-4 py-1"
                        >
                            <Avatar
                                className={"cursor-pointer items-center gap-4"}
                            >
                                <AvatarImage src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=100" />
                                <AvatarFallback>
                                    {loggedInUser.fullName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <Heading
                                size="p"
                                className={"font-medium text-foreground"}
                            >
                                {loggedInUser.fullName}
                            </Heading>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            {loggedInUser.role === userRoles[1].label && (
                                <NavLink to={"/dashboard"}>
                                    <DropdownMenuItem>
                                        Dashboard
                                    </DropdownMenuItem>
                                </NavLink>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                disabled={loading}
                                onClick={() => {
                                    setLoading(true);
                                    setTimeout(() => {
                                        signOut();
                                        setLoading(false);
                                    }, 1000);
                                }}
                                variant="destructive"
                            >
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {!loggedInUser && (
                <div className="flex items-center gap-4">
                    <NavLink to={"/auth/sign-in"}>
                        <Button variant="outline">Sign In</Button>
                    </NavLink>
                    <NavLink to={"/auth/sign-up"}>
                        <Button>Sign Up</Button>
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar;
