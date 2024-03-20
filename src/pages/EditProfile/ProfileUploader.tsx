import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "@/interfaces";
import { updateUserProfileImage } from "@/services/appwrite/utils/updateUserProfile";
import { userStore } from "@/services/zustand";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

// icons
import { CgSpinner as SpinnerIcon } from "react-icons/cg";
import { GrUploadOption as UploadIcon } from "react-icons/gr";
import { toast } from "sonner";

const ProfileUploader = () => {
  const { user, login } = userStore();

  const [file, setFile] = useState<File>();

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // max size 8 mb
    if (acceptedFiles[0].size > 8 * 1024 * 1024) {
      toast.error("File size should be less than 8 MB");
      return;
    }
    setFile(acceptedFiles[0]);
  }, []);

  const { isPending, mutate } = useMutation<User>({
    mutationFn: () => updateUserProfileImage(user?.$id as string, file as File),
    onSuccess: (data) => {
      toast.success("Profile photo updated");
      login(data);
    },
    onError: () => {
      toast.error("Failed to update profile photo");
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  const upload = () => {
    mutate();
  };

  return (
    <div className="w-full ">
      <Label>Profile Photo</Label>
      <div className="w-full flex items-center gap-4 py-2">
        <div {...getRootProps()} className="flex items-center gap-4">
          <input {...getInputProps()} />

          <div className="cursor-pointer flex items-center gap-4">
            <img
              src={file ? URL.createObjectURL(file) : user?.avatar}
              alt="image"
              className="h-24 w-24 rounded-full object-cover object-top"
            />
            <p className=" small-regular md:base-semibold">
              Change profile photo
            </p>
          </div>
        </div>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="rounded-full ml-auto"
          type="button"
          disabled={!file || isPending}
          onClick={upload}
        >
          {isPending ? (
            <SpinnerIcon className="animate-spin" />
          ) : (
            <UploadIcon />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfileUploader;
