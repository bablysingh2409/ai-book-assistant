'use client'
import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload, Image as ImageIcon } from 'lucide-react';
import { UploadSchema } from '@/lib/zod'
import { BookUploadFormValues } from '@/lib/types';
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {ACCEPTED_IMAGE_TYPES, DEFAULT_VOICE,ACCEPTED_PDF_TYPES} from '@/lib/constants';
import  FileUploader  from '@/components/FileUploader';
import  VoiceSelector  from '@/components/VoiceSelector';
import  LoadingOverlay  from '@/components/LoadingOverlay';


function UploadForm() {
 const [isSubmitting,setIsSubmitting] = useState(false);
 const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form=useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
        title: '',
        author: '',
      voice: DEFAULT_VOICE,
    },
  });

  const onSubmit = async (data: BookUploadFormValues) => {
    setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setIsSubmitting(false)
      console.log('Form submitted:', data)
  }
  if(!isMounted) return null


  return (
    <>
    {isSubmitting && <LoadingOverlay />}
    <div className="new-book-wrapper">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Book PDF File Uploader */}
            <FileUploader
            control={form.control}
            name="bookFile"
            label="Book PDF File"
            acceptTypes={ACCEPTED_PDF_TYPES}
            icon={Upload}
            placeholder="Click to upload PDF"
            hint="PDF file (max 50MB)"
            disabled={isSubmitting}
            />

            {/* Book Image Uploader */}
            <FileUploader
            control={form.control}
            name="bookImage"
            label="Cover Image (Optional)"
            acceptTypes={ACCEPTED_IMAGE_TYPES}
            icon={ImageIcon}
            placeholder="Click to upload cover image"
            hint="Leave empty to auto-generate from PDF"
            disabled={isSubmitting}
            />

            {/* Title Input */}
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                    <Input
                    className='form-input' 
                    placeholder="ex: Rich Dad Poor Dad"
                    {...field}
                    disabled={isSubmitting}
                     />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Author Input */}
            <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="form-label">Author</FormLabel>
                <FormControl>
                    <Input
                    className='form-input' 
                    placeholder="ex: Robert Kiyosaki"
                    {...field}
                    disabled={isSubmitting}
                     />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Voice Selector */}
            <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                <FormControl>
                <VoiceSelector
                    disabled={isSubmitting}
                    value={field.value}
                    onChange={field.onChange}
                />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />


            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="form-btn">
               Begin Synthesis
            </Button>
        </form>
        </Form>

    </div>
    </>
  )
}

export default UploadForm

