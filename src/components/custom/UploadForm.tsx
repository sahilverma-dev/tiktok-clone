import { userStore } from "@/services/zustand";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "../ui/button";

// icons
import { CgSpinner as SpinnerIcon } from "react-icons/cg";
import { IoMdClose as CloseIcon } from "react-icons/io";

import { FC } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { addVideo } from "@/services/appwrite/utils/addVideo";
import { AppwriteException } from "appwrite";

interface Props {
  close: () => void;
}

const formSchema = z.object({
  caption: z
    .string()
    .min(5, "Caption should be atleast 5 characters long")
    .max(255, "Caption should be atmost 255 characters long"),
  video: z
    .instanceof(File)
    .or(z.null())
    .refine((file) => file !== null, {
      message: "Please select a video",
    })
    .refine(
      (file) => {
        if (file) return file?.size <= 50 * 1024 * 1024;
        return true;
      },
      {
        message: "File size should be less than 50 MB",
      }
    ),
});

const UploadForm: FC<Props> = ({ close }) => {
  const { user } = userStore();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
      video: null,
    },
  });

  const { isPending, mutate: uploadMutation } = useMutation<
    unknown,
    unknown,
    { caption: string; video: File },
    unknown
  >({
    mutationFn: ({ caption, video }) =>
      addVideo({
        caption,
        userId: user?.$id as string,
        video,
      }),
    onSuccess: () => {
      toast.success("Video uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      close();
    },
    onError: (e) => {
      const error = e as AppwriteException;
      console.log(error);
      toast.error(error?.message || "Failed to upload video");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { caption, video } = values;
    if (!video) {
      toast.error("Please select a video");
      return;
    }
    // file size should be less than 50 MB
    if (video && video.size > 50 * 1024 * 1024) {
      toast.error("File size should be less than 50 MB");
      return;
    }

    uploadMutation({ caption, video });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="absolute left-0 h-[400px] top-[-400px] bg-white text-black w-full p-4 rounded-t-xl -z-10"
    >
      <Button
        variant={"secondary"}
        size={"icon"}
        onClick={close}
        className="absolute top-4 right-4 rounded-full bg-black/80 hover:bg-black backdrop-blur"
      >
        <CloseIcon />
      </Button>
      {user ? (
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">Upload a Tiktok</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="grid gap-4">
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid gap-2">
                          <Label htmlFor="caption">Caption</Label>
                          <Input
                            id="caption"
                            className="w-full h-14 px-4 text-base rounded-lg"
                            placeholder="Add a caption"
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
                  name="video"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid gap-2">
                          <Label htmlFor="video">Video</Label>
                          <Input
                            id="video"
                            type="file"
                            accept="video/*"
                            className="w-full h-14 px-4 text-base rounded-lg"
                            placeholder="Select your video"
                            onChange={(e) => {
                              field.onChange(e.target.files?.[0]);
                            }}
                            disabled={isPending}
                            multiple={false}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-14 text-base rounded-full gap-2"
                >
                  {isPending && (
                    <SpinnerIcon className="animate-spin text-xl" />
                  )}
                  Upload
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">Seems like you're new here</h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1200px-TikTok_logo.svg.png"
            alt=""
            className="h-20"
          />
          <p className="text-base">Sign up to get started</p>
          <Link
            to={"/login"}
            className={cn([
              buttonVariants({}),
              "w-full h-14 text-base rounded-full gap-2",
            ])}
          >
            Login
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default UploadForm;
