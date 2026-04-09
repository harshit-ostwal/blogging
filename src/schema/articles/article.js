import z from "zod/v4";
import { zArray, zString, zUrl } from "@/utils/zod.utils";

const articleSchema = z.strictObject({
    title: zString("Title"),
    slug: zString("Slug"),
    thumbnail: zUrl("Thumbnail URL"),
    category: zString("Category"),
    description: zString("Description", 20),
    content: zString("Content", 50, 5000),
    tags: zArray(zString("Tag")).optional(),
});

const createArticleSchema = articleSchema;
const updateArticleSchema = articleSchema.partial().strip();

export { createArticleSchema, updateArticleSchema };
