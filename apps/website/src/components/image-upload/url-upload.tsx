"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { ImagedUploadSchema } from "./form";

const UrlUpload = () => {
  const {
    control,
    formState: { errors, isDirty },
  } = useFormContext<z.infer<ImagedUploadSchema>>();

  return (
    <>
      <FormField
        control={control}
        name="image_url"
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image Url</FormLabel>
            <FormControl>
              <Input
                placeholder="https://"
                {...field}
                value={field.value ?? undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="image_attributes.alt"
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image Alt Text</FormLabel>
            <FormControl>
              <Input {...field} required />
            </FormControl>
            <FormDescription>A short description of the image</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default UrlUpload;
