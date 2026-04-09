import React from "react";
import { Heading } from "@/components/ui/Headings";

function Footer() {
    return (
        <div className="flex flex-col items-center justify-between gap-2 py-5 text-center md:flex-row">
            <Heading size="p">Built with ❤️ by Harshit Jain</Heading>
            <Heading size="p">
                &copy; {new Date().getFullYear()} Medium. All rights reserved.
            </Heading>
        </div>
    );
}

export default Footer;
