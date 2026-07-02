import {z} from 'zod'
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES, MAX_FILE_SIZE, MAX_IMAGE_SIZE } from './constants'

// File validation helpers
// const fileSchema = (acceptedTypes: string[], maxSize: number, fieldName: string) =>
//   z.instanceof(File)
//     .refine((file) => file.size <= maxSize, `${fieldName} size must be less than ${maxSize / (1024 * 1024)}MB.`)
//     .refine((file) => acceptedTypes.includes(file.type), `Only supported formats for ${fieldName} are accepted.`)

// const optionalFileSchema = (acceptedTypes: string[], maxSize: number, fieldName: string) =>
//   z.union([
//     z.instanceof(File)
//       .refine((file) => file.size <= maxSize, `${fieldName} size must be less than ${maxSize / (1024 * 1024)}MB.`)
//       .refine((file) => acceptedTypes.includes(file.type), `Only supported formats for ${fieldName} are accepted.`),
//     z.null(),
//     z.undefined()
//   ]).optional()

export const UploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  author: z.string().min(1, 'Author name is required').max(100, 'Author name is too long'),
  persona: z.string().min(1, 'Please select a voice'),
  pdfFile: z.instanceof(File,{message:'PDF file is required'})
  .refine((file) => file.size <= MAX_FILE_SIZE, `PDF file size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`)
  .refine((file) => ACCEPTED_PDF_TYPES.includes(file.type), `Only PDF files are accepted.`),
  coverImage: z.instanceof(File).optional()
  .refine((file) =>!file || file.size <= MAX_IMAGE_SIZE, `Image size must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB.`)
  .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), `Only .jpg, .jpeg, .png and .webp formats are supported.`)
})
