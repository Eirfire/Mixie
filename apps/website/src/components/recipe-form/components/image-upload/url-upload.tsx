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
import { recipeClientFormSchema } from "@/types/zodSchemas";
import { useFormContext } from "react-hook-form";
import * as z from "zod";


const UrlUpload = () => {
    const {
        register,
        setValue,
        getValues,
        watch,
        control,
        formState: { errors },
      } = useFormContext<z.infer<typeof recipeClientFormSchema>>();
    

  return (
    <>
    <FormField
    control={control}
    name="image_url"
    rules={{ required: true }}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Image Url</FormLabel>
        <FormControl className="flex">
          <Input placeholder="https://" {...field} />
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
        <FormControl className="flex">
          <Input {...field} />
        </FormControl>
        <FormDescription>
          A short description of the image
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</>
  )
}

export default UrlUpload