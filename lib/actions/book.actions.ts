'use server';

import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "../types";
import { generateSlug, serializeData } from "../utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/bookSegment.model";


export const getBookBySlug = async (slug: string) => {
    try {
        await connectToDatabase();

        const book = await Book.findOne({ slug }).lean();

        if (!book) {
            return { success: false, error: 'Book not found' };
        }

        return {
            success: true,
            data: serializeData(book)
        }
    } catch (e) {
        console.error('Error fetching book by slug', e);
        return {
            success: false, error: e
        }
    }
}


export const getAllBooks = async () => {
  try {
    await connectToDatabase();
    const books = await Book.find().sort({ createdAt: -1 }).lean();
    return {
      success: true,
      data:serializeData(books)
    };
  } catch (error) {
    console.error('Error fetching all books:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

export const checkBookExists = async (title: string) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(title);
    const existingBook = await Book.findOne({ slug }).lean();

    if (existingBook) {
      return {
        book: serializeData(existingBook),
        exists: true
      };
    }
    return {
        exists: false
    }
  }
  catch (e) {
    console.error('Error checking book exists:', e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error"
    }
  }
}

export const createBook = async (data: CreateBook) => {
  try {
    await connectToDatabase();
    const slug=generateSlug(data.title);

    const existingBook = await Book.findOne({ slug }).lean();

    if (existingBook) {
      return {
        success: true,
        data:serializeData(existingBook),
        alreadyExists: true
      };
    }

    const book=await Book.create({...data,slug,totalSegments:0});

    return {
      success: true,
      data: serializeData(book),
    };

  }
  catch (e) {
    console.error('Error creating book:', e);
    return {
        success: false,
        error:e instanceof Error ? e.message : "Unknown error"
    }
  } 
}

export const savedBookSegments = async (bookId: string, clerkId: string, segments:TextSegment[])=>{
   try {
    await connectToDatabase();
    console.log('saving book segments....');

    const segmentsToInsert= segments.map(({text,segmentIndex,pageNumber,wordCount})=>({
        clerkId,bookId,content:text,segmentIndex,pageNumber,wordCount
    }));

    await BookSegment.insertMany(segmentsToInsert);
    await Book.findByIdAndUpdate(bookId,{totalSegments:segments.length});

    console.log('book segments saved successfully');

    return {
        success:true,
        data:{segmentsCreated:segments.length},
    }

   }catch(e){
    console.error('Error saving book segments:', e);
    await BookSegment.deleteMany({ bookId });
    await Book.findByIdAndDelete(bookId);
    console.log(`Deleted book and segments and book due to failure to save segments`);
    return {
        success:false,
        error:e instanceof Error ? e.message : "Unknown error"
    }
   }
} 

