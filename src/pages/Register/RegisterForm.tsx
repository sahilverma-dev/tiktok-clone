import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// icons
import { CgSpinner as SpinnerIcon } from "react-icons/cg";
import {
  AiOutlineEye as ShowIcon,
  AiOutlineEyeInvisible as HideIcon,
} from "react-icons/ai";

// react query
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// appwrite
import { AppwriteException } from "appwrite";
import { registerUser } from "@/services/appwrite/utils/registerUser";

// form schema
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  fullName: z.string().min(3, {
    message: "Full name should be atleast 3 characters long.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const { isPending, mutate: registerMutation } = useMutation<
    unknown,
    unknown,
    {
      email: string;
      password: string;
      fullName: string;
    },
    unknown
  >({
    mutationFn: ({ email, fullName, password }) =>
      registerUser({ email, fullName, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Check your email and verify your account");
    },
    onError: (e) => {
      const error = e as AppwriteException;
      console.log(error);
      toast.error(error?.message || "Failed to Register");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password, confirmPassword, fullName } = values;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      registerMutation({ email, fullName, password });
    }
  };

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              disabled={isPending}
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="name"
                        className="w-full h-14 px-4 text-base rounded-lg"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        className="w-full h-14 px-4 text-base rounded-lg"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isPending}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <div
                        className={cn([
                          "flex items-center h-14 w-full rounded-md border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
                        ])}
                      >
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="h-full px-4 text-base py-2 w-full outline-none bg-transparent"
                          placeholder="Enter your password"
                          {...field}
                        />
                        <div className="h-full p-2 flex items-center justify-center">
                          <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="aspect-square text-xl"
                            onClick={() => {
                              setShowPassword((state) => !state);
                            }}
                          >
                            {showPassword ? <HideIcon /> : <ShowIcon />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">
                        Confirm your password
                      </Label>
                      <div
                        className={cn([
                          "flex items-center h-14 w-full rounded-md border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
                        ])}
                      >
                        <input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          className="h-full px-4 text-base py-2 w-full outline-none bg-transparent"
                          placeholder="Confirm your password"
                          {...field}
                        />
                        <div className="h-full p-2 flex items-center justify-center">
                          <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="aspect-square text-xl"
                            onClick={() => {
                              setShowPassword((state) => !state);
                            }}
                          >
                            {showPassword ? <HideIcon /> : <ShowIcon />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-500 hover:text-primary"
              >
                Login
              </Link>
              .
            </p>
          </div>

          <div className="my-5">
            <Button
              type="submit"
              className="w-full h-14 text-base rounded-full gap-2"
              disabled={isPending}
            >
              {isPending && <SpinnerIcon className="animate-spin text-xl" />}
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
