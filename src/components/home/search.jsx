import { Search } from "lucide-react";
import React from "react";
import { categoryOptions } from "@/constants/article";
import { Badge } from "../ui/badge";
import { Heading } from "../ui/headings";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "../ui/input-group";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

function SearchSection({
    length,
    searchArticle,
    setSearchArticle,
    selectedCategory,
    setSelectedCategory,
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <InputGroup>
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                <InputGroupInput
                    placeholder="Search..."
                    value={searchArticle}
                    onChange={(e) => setSearchArticle(e.target.value)}
                />
                <InputGroupAddon align="right">
                    <Select
                        onValueChange={(value) => setSelectedCategory(value)}
                    >
                        <SelectTrigger className={"min-w-40"}>
                            <SelectValue placeholder="Select a category" />
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
                </InputGroupAddon>
            </InputGroup>

            <Heading size={"p"} className="shrink-0">
                {length} articles found
            </Heading>
        </div>
    );
}

export default SearchSection;
