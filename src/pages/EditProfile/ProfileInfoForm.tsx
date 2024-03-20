import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/services/zustand";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/interfaces";
import { updateUserInfo } from "@/services/appwrite/utils/updateUserInfo";
import { toast } from "sonner";

// icons
import { CgSpinner as SpinnerIcon } from "react-icons/cg";

const formSchema = z.object({
  //    full name, bio
  name: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(50, { message: "Full name is too long" }),
  bio: z
    .string()
    .min(1, { message: "Bio is required" })
    .max(100, { message: "Bio is too long" }),
});

const ProfileInfoForm = () => {
  const navigate = useNavigate();
  const { user, login } = userStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: user?.bio || "",
      name: user?.full_name || "",
    },
  });

  const { isPending, mutate } = useMutation<
    User,
    unknown,
    { name: string; bio: string },
    unknown
  >({
    mutationFn: ({ bio, name }) =>
      updateUserInfo(user?.$id as string, name, bio),
    onSuccess: (data) => {
      toast.success("Profile info updated");
      navigate(`/user/${data.$id}`);
      login(data);
    },
    onError: () => {
      toast.error("Failed to update profile info");
    },
  });

  // Handler
  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    const { bio, name } = values;
    mutate({ name, bio });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="flex flex-col gap-2 w-full mt-4 max-w-5xl"
        >
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your name"
                value={user?.email}
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="bio"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="shad-textarea custom-scrollbar"
                    placeholder="Tell us a little about yourself"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => navigate(-1)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
              disabled={isPending}
            >
              {isPending && <SpinnerIcon className="animate-spin" />}
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileInfoForm;
