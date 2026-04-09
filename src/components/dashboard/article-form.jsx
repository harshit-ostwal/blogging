// zodResolver will be dynamically imported
const MDEditor = React.lazy(() => import("@uiw/react-md-editor"));
import { Heading1, X } from "lucide-react";
import React, { useEffect, useState, Suspense } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { categoryOptions } from "@/constants/article";
import { useArticle } from "@/providers/article-provider";
// createArticleSchema and updateArticleSchema will be dynamically imported
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Loading from "../common/loading";

const ArticleForm = ({ type, article }) => {
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [resolver, setResolver] = useState();
  const [schemas, setSchemas] = useState();

  const { createArticle, updateArticle } = useArticle();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [{ zodResolver }, schemaModule] = await Promise.all([
        import("@hookform/resolvers/zod"),
        import("@/schema/articles/article"),
      ]);
      if (mounted) {
        setResolver(() => zodResolver);
        setSchemas(schemaModule);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const articleForm = useForm({
    resolver:
      resolver && schemas
        ? resolver(
            type === "create"
              ? schemas.createArticleSchema
              : schemas.updateArticleSchema
          )
        : undefined,
    defaultValues: {
      title: type === "create" ? "" : article?.title,
      thumbnail: type === "create" ? "" : article?.thumbnail,
      description: type === "create" ? "" : article?.description,
      category: type === "create" ? "" : article?.category,
      content: type === "create" ? "" : article?.content,
      tags: type === "create" ? [] : article?.tags || [],
    },
  });

  const navigate = useNavigate();
  const title = articleForm.watch("title");

  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      articleForm.setValue("slug", slug, { shouldValidate: true });
    }
  }, [title, articleForm.setValue]);

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (type === "create") {
        createArticle(data);
      } else {
        updateArticle(article.id, data);
      }
      articleForm.reset();
      navigate("/dashboard");
      setLoading(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={articleForm.handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
    >
      <FieldSet className={"gap-4"}>
        <FieldGroup>
          <Controller
            name="title"
            control={articleForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Heading1 />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="title"
                    placeholder="Enter article title"
                    {...field}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="slug"
            control={articleForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Heading1 />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="slug"
                    placeholder="Enter article slug (unique identifier in URL)"
                    {...field}
                  />
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="thumbnail"
            control={articleForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="thumbnail">Thumbnail URL</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Heading1 />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="thumbnail"
                    placeholder="Enter thumbnail URL for your article"
                    {...field}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="description"
            control={articleForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="description"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter a brief description of your article"
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="category"
            control={articleForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select
                  id="category"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categoryOptions.map((label, idx) => (
                        <SelectItem key={idx} value={label}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="content"
            control={articleForm.control}
            render={({ field, fieldState }) => (
              <Field data-color-mode="light">
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Suspense fallback={<Loading />}>
                  <MDEditor
                    suppressHydrationWarning
                    value={field.value}
                    onChange={field.onChange}
                    height={800}
                    tabSize={4}
                  />
                </Suspense>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="tags"
            control={articleForm.control}
            defaultValue={[]}
            render={({ field, fieldState }) => {
              const tags = field.value || [];

              const addTag = (value) => {
                const trimmed = value.trim();
                if (trimmed && !tags.includes(trimmed)) {
                  field.onChange([...tags, trimmed]);
                }
                setTagInput("");
              };

              const removeTag = (idx) => {
                field.onChange(tags.filter((_, i) => i !== idx));
              };

              const handleKeyDown = (e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addTag(tagInput);
                }
                if (e.key === "Backspace" && !tagInput && tags.length > 0) {
                  removeTag(tags.length - 1);
                }
              };

              return (
                <Field>
                  <FieldLabel htmlFor="tags">Tags</FieldLabel>
                  <div className="flex min-h-13 w-full flex-wrap items-center gap-2 rounded-2xl border border-input px-3 py-2 transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
                    {tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className={"gap-4"}>
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(idx)}
                          className="cursor-pointer"
                        >
                          <X className="size-4 text-muted-foreground" />
                        </button>
                      </Badge>
                    ))}
                    <input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={() => tagInput && addTag(tagInput)}
                      placeholder={
                        tags.length === 0 ? "Type a tag and press Enter" : ""
                      }
                      className="min-w-30 flex-1 bg-transparent px-2 outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </FieldSet>
      <Button
        isLoading={loading}
        disabled={loading}
        type="submit"
        className={"ml-auto w-fit"}
      >
        {type === "create" ? "Create Article" : "Update Article"}
      </Button>
    </form>
  );
}

export default ArticleForm;
