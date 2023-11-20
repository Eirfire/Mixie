import { Button } from "@/src/common/components/ui/button";
import { Input } from "@/src/common/components/ui/input";
import { User } from "@/src/server/db/types";
import ImageUploadDialog from "@components/elements/ImageUploadDialog";
import { DialogTrigger } from "@components/ui/dialog";
import { Textarea } from "@components/ui/textarea";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

const Profile = () => {
  const { getValues, register, setValue, control } = useFormContext<User>();

  const setImages = (images: any) => {
    const image = images[0];
    setValue("image", image.url);
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <ImageUploadDialog
          title="Edit Profile Picture"
          description="upload a new profile picture"
          setImage={setImages}
          Trigger={
            <DialogTrigger asChild>
              <Button
                ariaLabel="edit or upload an image"
                variant={"secondary"}
                type="button"
                unstyled={true}
              >
                <Image
                  src={getValues("image") || ""}
                  alt={getValues("userName") || "Profile picture"}
                  width={100}
                  height={100}
                  priority
                  className="m-auto h-24 w-24 rounded-full lg:h-48 lg:w-48"
                />
              </Button>
            </DialogTrigger>
          }
        >
          <div>
            <div className="flex items-center">
              <div className="w-1/2 border-t border-grey dark:border-white"></div>
              <span className="mx-2">OR</span>
              <div className="w-1/2 border-b border-grey dark:border-white"></div>
            </div>
            <Input
              {...register("image", {
                required: true,
              })}
              required
              label="Image Url"
              placeholder="https://"
            />
          </div>
        </ImageUploadDialog>

        <div className="flex flex-col gap-2">
          <Input
            id="displayName"
            label="Name"
            {...register("name", { required: true })}
          />
          <Input
            id="userName"
            label="User Name"
            {...register("userName", { required: true })}
          />
        </div>
      </div>

      <Textarea
        id="bio"
        label="Bio"
        control={control}
        defaultValue={getValues("bio") || ""}
      />
    </div>
  );
};

export default Profile;