"use client";

import ContactForm from "@/components/molecules/contactForm";
import DealHeading from "@/components/molecules/dealsHeading";
import { useTags } from "@/lib/FE/hooks/useTags";
import { TagSection } from "@/components/molecules/tagSection";

export default function Home() {
  const { data: tagsData, isLoading, error } = useTags();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading tags</div>
      </div>
    );
  }

  const tags = tagsData?.data || [];
  console.log(tags);
  return (
    <section className="bg-tert w-[100%] overscroll-x-none overflow-x-hidden">
      <br />

      {tags &&
        tags?.map((tag: any) => (
          <div key={tag.id} className="mt-20">
            <TagSection title={tag.name} tag={tag.name} pageSize={6} />
          </div>
        ))}

      <section className="mt-20 w-[100%] mx-auto bg-tert">
        <DealHeading Heading="Contact Us" subHeading={""} noRadius={true} />
      </section>
      <ContactForm />
    </section>
  );
}
