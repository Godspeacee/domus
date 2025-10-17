"use client";

import {
  Box,
  Button,
  TextArea,
  TextField,
  Flex,
  Select,
  Callout,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { Controller, useForm } from "react-hook-form";
import { createPropertySchema } from "../../vallidationSchma";
import axios from "axios";
import { z } from "zod";
import { PropertyCategory } from "@/app/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/app/component/ErrorMessage";
import Spinner from "@/app/component/Spinner";

interface CloudinaryResult {
  public_id: string;
}

type PropertyFormData = z.infer<typeof createPropertySchema>;

const NewPropertyPage = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      images: [],
    },
  });

  const images = watch("images") || [];
  const categoryOptions = Object.entries(PropertyCategory);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/propertise", data);
      router.push("/propertise/list");
    } catch (error) {
      console.error(error);
      setError("Failed to create property");
      setSubmitting(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" mb="4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className=" space-y-3" onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root placeholder="Title" {...register("title")} />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <TextArea placeholder="Description" {...register("description")} />

        {/* Upload and Preview Section */}
        <Box>
          <ErrorMessage>{errors.images?.message}</ErrorMessage>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <CldUploadWidget
                uploadPreset="cslcuwh2"
                options={{ maxFiles: 5 }}
                onSuccess={(result) => {
                  if (result.event !== "success") return;
                  const info = result.info as CloudinaryResult;

                  // get previous images safely
                  const prevImages = getValues("images") || [];
                  const updated = [...prevImages, info.public_id];

                  //  update form value and validate
                  setValue("images", updated, { shouldValidate: true });
                  field.onChange(updated);
                }}
              >
                {({ open }) => (
                  <Button type="button" onClick={() => open()}>
                    Upload Images
                  </Button>
                )}
              </CldUploadWidget>
            )}
          />
        </Box>

        {/* Preview uploaded images (responsive) */}
        {images.length > 0 && (
          <div className="mt-4">
            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-3">
              {images.map((id: string) => (
                <div
                  key={id}
                  className="relative rounded-lg overflow-hidden h-52 shadow"
                >
                  <CldImage
                    src={id}
                    alt="property image"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = images.filter(
                        (img: string) => img !== id
                      );
                      setValue("images", updated, { shouldValidate: true });
                    }}
                    className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            {/* Mobile horizontal scroll */}
            <div className="md:hidden mt-2">
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth p-2">
                {images.map((id: string) => (
                  <div
                    key={id}
                    className="flex-shrink-0 w-[80vw] h-56 snap-center relative rounded-lg overflow-hidden shadow"
                  >
                    <CldImage
                      src={id}
                      alt="property image"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = images.filter(
                          (img: string) => img !== id
                        );
                        setValue("images", updated, { shouldValidate: true });
                      }}
                      className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Currency and price */}
        <Flex gap="3">
          <Box maxWidth="70px">
            <ErrorMessage>{errors.currency?.message}</ErrorMessage>
            <TextField.Root placeholder="Currency" {...register("currency")} />
          </Box>
          <TextField.Root
            placeholder="Price"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
        </Flex>

        {/* Address, state, area */}
        <ErrorMessage>{errors.address?.message}</ErrorMessage>
        <TextField.Root placeholder="Address" {...register("address")} />
        <Flex gap="3">
          <ErrorMessage>{errors.state?.message}</ErrorMessage>
          <TextField.Root placeholder="State" {...register("state")} />
          <ErrorMessage>{errors.area?.message}</ErrorMessage>
          <TextField.Root placeholder="Area" {...register("area")} />
        </Flex>

        {/* Category */}
        <Flex gap={"3"}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <ErrorMessage>{errors.category?.message}</ErrorMessage>
                <Select.Trigger placeholder="Select category..." />
                <Select.Content>
                  {categoryOptions.map(([key, label]) => (
                    <Select.Item key={key} value={label}>
                      {label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            Post new property {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default NewPropertyPage;
