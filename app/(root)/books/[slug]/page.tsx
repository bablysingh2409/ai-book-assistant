import { getBookBySlug } from "@/lib/actions/book.actions";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Mic, MicOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;

  return (
    <div className="book-page-container">
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header Card */}
        <div className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <Image
              src={book.coverURL || "/images/book-placeholder.png"}
              alt={book.title}
              width={120}
              height={180}
              className="vapi-cover-image !w-[120px] !h-auto"
              priority
            />
            <div className="vapi-mic-wrapper relative">
              <button className="vapi-mic-btn vapi-mic-btn-inactive shadow-md !w-[60px] !h-[60px]">
                <MicOff className="size-7 text-[#212a3b]" />
              </button>
            </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b] mb-1">
                  {book.title}
                </h1>
                <p className="text-[#3d485e] font-medium">by {book.author}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="vapi-status-indicator">
                  <span className="vapi-status-dot vapi-status-dot-ready" />
                  <span className="vapi-status-text">Ready</span>
                </div>

                <div className="vapi-status-indicator">
                  <span className="vapi-status-text">
                    Voice: {book.persona || "Daniel"}
                  </span>
                </div>

                <div className="vapi-status-indicator">
                  <span className="vapi-status-text">0:00/15:00</span>
                </div>
              </div>
          </div>
        </div>

        {/* Transcript Area */}
        <div className="transcript-container min-h-[400px]">
          <div className="transcript-empty">
            <Mic className="size-12 text-[#212a3b] mb-4" />
            <h2 className="transcript-empty-text">No conversation yet</h2>
            <p className="transcript-empty-hint">
              click the mic button above to start talking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
