import { useNavigate, useParams } from "react-router-dom";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileUploader from "./ProfileUploader";
import { userStore } from "@/services/zustand";

const EditProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = userStore();

  if (user?.$id !== id) {
    navigate(`/edit-profile/${user?.$id}`, {
      replace: true,
    });
  }

  return (
    <div className="p-4">
      <ProfileUploader />
      <ProfileInfoForm />
    </div>
  );
};

export default EditProfile;
