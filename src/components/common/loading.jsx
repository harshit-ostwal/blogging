import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
    return (
        <div className="flex h-90 min-w-full items-center justify-center">
            <Loader2 className="animate-spin" size={32} />
        </div>
    );
}

export default Loading;
