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
import { loginUser } from "@/services/appwrite/utils/login-user";

// form schema
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate: loginMutation } = useMutation<
    unknown,
    unknown,
    { email: string; password: string },
    unknown
  >({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Login successful");
    },
    onError: (e) => {
      const error = e as AppwriteException;
      console.log(error);
      toast.error(error?.message || "Failed to login");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    loginMutation({ email, password });
  };

  const loginAsGuest = () => {
    form.setValue("email", "guest@mail.com");
    form.setValue("password", "12345678");
    loginMutation({ email: "guest@mail.com", password: "12345678" });
  };

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
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
                          "flex items-center h-14 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
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
                            className="aspect-square text-lg"
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
              Don't have account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-500 hover:text-primary"
              >
                Create new account
              </Link>
              .
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <Button
              type="submit"
              className="w-full h-14 text-base rounded-full gap-2"
              disabled={isPending}
            >
              {isPending && <SpinnerIcon className="animate-spin text-xl" />}
              Login
            </Button>
            <Button
              type="button"
              onClick={loginAsGuest}
              variant={"secondary"}
              className="w-full h-14 text-base rounded-full gap-2"
              disabled={isPending}
            >
              {isPending && <SpinnerIcon className="animate-spin text-xl" />}
              Login as Guest
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
