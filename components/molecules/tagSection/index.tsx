"use client";

import { ProductList } from "../products/ProductList";
import DealHeading from "../dealsHeading";

interface TagSectionProps {
  title: string;
  subHeading?: string;
  tag: string;
  pageSize?: number;
}

export function TagSection({ title, subHeading = "", tag, pageSize = 12 }: TagSectionProps) {
  return (
    <>
      <section className="w-[80%] sm:w-[90%] mx-auto bg-gray-50 dark:bg-gray-900">
        <DealHeading Heading={title} subHeading={subHeading} />
      </section>
      <div className="bg-tert pt-10 w-[100%]">
        <ProductList pageSize={pageSize} tags={tag} />
      </div>
    </>
  );
}