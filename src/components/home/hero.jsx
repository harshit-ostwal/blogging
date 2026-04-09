import React from "react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { Heading } from "@/components/ui/Headings";

function Hero() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 pt-20">
            <div className="flex flex-col items-center text-center">
                <Heading size="h2">
                    Explore stories. Expand your perspective.
                </Heading>
                <Heading
                    size="h5"
                    className={"max-w-2xl text-muted-foreground"}
                >
                    Discover ideas, perspectives, and stories that challenge
                    your thinking and deepen your understanding. topics.
                </Heading>
            </div>
            <NavLink to={"/articles"}>
                <Button>Explore Articles</Button>
            </NavLink>
        </div>
    );
}

export default Hero;
