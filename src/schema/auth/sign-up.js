import z from "zod/v4";
import { userRoles } from "@/constants/roles";
import { zEmail, zEnum, zPassword, zString } from "@/utils/zod.utils";

export const signUpSchema = z
    .strictObject({
        fullName: zString("Full Name"),
        email: zEmail(),
        password: zPassword(),
        role: zEnum(
            "Role",
            userRoles.map((role) => role.label)
        ),
    })
    .strip();
