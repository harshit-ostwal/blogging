// zodResolver will be dynamically imported
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import { Heading } from "@/components/ui/headings";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { PasswordStrength } from "@/components/ui/password-strength";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { userRoles } from "@/constants/roles";
import { useAuth } from "@/providers/auth-provider";

// signUpSchema will be dynamically imported

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [resolver, setResolver] = useState();
    const [schema, setSchema] = useState();

    useEffect(() => {
        let mounted = true;
        (async () => {
            const [{ zodResolver }, { signUpSchema }] = await Promise.all([
                import("@hookform/resolvers/zod"),
                import("@/schema/auth/sign-up"),
            ]);
            if (mounted) {
                setResolver(() => zodResolver);
                setSchema(signUpSchema);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const signUpForm = useForm({
        resolver: resolver && schema ? resolver(schema) : undefined,
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            role: "",
        },
    });

    const { setFocus } = signUpForm;

    useEffect(() => {
        setFocus("fullName");
    }, [setFocus]);

    const onSubmit = (data) => {
        setLoading(true);
        setTimeout(() => {
            if (signUp(data)) {
                navigate("/auth/sign-in");
            }
            signUpForm.reset();
            setFocus("fullName");
            setLoading(false);
        }, 2000);
    };
    return (
        <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-6 p-6">
            <div className="flex w-full max-w-lg flex-col">
                <Heading size="h5" className={"font-semibold"}>
                    Create an Account
                </Heading>
                <Heading size="p" className="text-muted-foreground">
                    Sign up to get started with our app!
                </Heading>
            </div>
            <form
                onSubmit={signUpForm.handleSubmit(onSubmit)}
                className="flex w-full max-w-lg flex-col gap-6"
            >
                <FieldSet className={"gap-4"}>
                    <FieldGroup>
                        <Controller
                            name="fullName"
                            control={signUpForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="fullName">
                                        Full Name
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <User />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            id="fullName"
                                            placeholder="Harshit Jain"
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
                            name="email"
                            control={signUpForm.control}
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
                            control={signUpForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
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
                            password={signUpForm.watch("password")}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Controller
                            name="role"
                            control={signUpForm.control}
                            render={({ field, fieldState }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FieldLabel>Role</FieldLabel>
                                    <div className="grid grid-cols-2 gap-2">
                                        {userRoles.map((role, idx) => (
                                            <FieldLabel key={idx}>
                                                <Field orientation="horizontal">
                                                    <FieldContent>
                                                        <FieldTitle
                                                            className={
                                                                "text-foreground"
                                                            }
                                                        >
                                                            {role.label}
                                                        </FieldTitle>
                                                        <FieldDescription>
                                                            {role.description}
                                                        </FieldDescription>
                                                    </FieldContent>
                                                    <RadioGroupItem
                                                        value={role.label}
                                                        id={`role-${role.label}`}
                                                    />
                                                </Field>
                                            </FieldLabel>
                                        ))}
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </RadioGroup>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>
                <Button isLoading={loading} disabled={loading} type="submit">
                    Sign Up with Email
                </Button>
            </form>

            <Heading size="p" className="text-center">
                Already have an account?{" "}
                <NavLink
                    className="font-medium text-primary decoration-wavy underline-offset-4 hover:underline active:underline"
                    to="/auth/sign-in"
                >
                    Sign In
                </NavLink>
            </Heading>
        </div>
    );
}

export default SignUp;
