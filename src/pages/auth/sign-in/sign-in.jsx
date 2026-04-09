// zodResolver will be dynamically imported
import { Eye, EyeOff, Lock, Mail, Unlock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Heading } from "@/components/ui/Headings";
import { ImageComp } from "@/components/ui/image";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { PasswordStrength } from "@/components/ui/password-strength";
import { useAuth } from "@/providers/auth-provider";
// SignInSchema will be dynamically imported

function SignIn() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const [resolver, setResolver] = useState();
    const [schema, setSchema] = useState();

    useEffect(() => {
        let mounted = true;
        (async () => {
            const [{ zodResolver }, { SignInSchema }] = await Promise.all([
                import("@hookform/resolvers/zod"),
                import("@/schema/auth/sign-in"),
            ]);
            if (mounted) {
                setResolver(() => zodResolver);
                setSchema(SignInSchema);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const signInForm = useForm({
        resolver: resolver && schema ? resolver(schema) : undefined,
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { setFocus } = signInForm;

    useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    const onSubmit = (data) => {
        setLoading(true);
        setTimeout(() => {
            if (signIn(data)) {
                navigate("/");
            }
            signInForm.reset();
            setFocus("email");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
            <div className="flex w-full max-w-lg flex-col">
                <Heading size="h5" className={"font-semibold"}>
                    Welcome Back!
                </Heading>
                <Heading size="p" className="text-muted-foreground">
                    Sign in to get started with our app!
                </Heading>
            </div>
            <form
                onSubmit={signInForm.handleSubmit(onSubmit)}
                className="flex w-full max-w-lg flex-col gap-6"
            >
                <FieldSet className={"gap-4"}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={signInForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <Mail />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            id="email"
                                            type="email"
                                            placeholder="example@example.com"
                                            {...field}
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Controller
                            name="password"
                            control={signInForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <NavLink
                                            to="/auth/reset-password"
                                            className="font-medium text-muted-foreground decoration-wavy underline-offset-4 duration-300 hover:text-primary hover:underline hover:transition-colors active:text-primary active:underline"
                                        >
                                            Reset Password?
                                        </NavLink>
                                    </div>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="•••••••••"
                                            {...field}
                                        />
                                        <InputGroupAddon>
                                            {!showPassword ? (
                                                <Lock />
                                            ) : (
                                                <Unlock />
                                            )}
                                        </InputGroupAddon>
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                size="icon"
                                                variant="none"
                                                aria-label="Toggle Password Visibility"
                                                title="Toggle Password Visibility"
                                                onClick={() => {
                                                    setShowPassword(
                                                        !showPassword
                                                    );
                                                }}
                                            >
                                                {showPassword ? (
                                                    <Eye />
                                                ) : (
                                                    <EyeOff />
                                                )}
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <PasswordStrength
                            password={signInForm.watch("password")}
                        />
                    </FieldGroup>
                </FieldSet>
                <Button isLoading={loading} disabled={loading} type="submit">
                    Sign In with Email
                </Button>
            </form>

            <Heading size="p" className="text-center">
                Don't have an account?{" "}
                <NavLink
                    to="/auth/sign-up"
                    className="font-medium text-primary decoration-wavy underline-offset-4 hover:underline active:underline"
                >
                    Sign Up
                </NavLink>
            </Heading>
        </div>
    );
}

export default SignIn;
