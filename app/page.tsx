'use client';

import { useExample } from '@/hooks/queries/useExample';

export default function Home() {
  // const { data, isLoading, error, create } = useExample();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Next.js Full Stack App</h1>
      {/* <div className="grid gap-4">
        {data?.data?.map((item: any) => (
          <div key={item.id} className="p-4 border rounded">
            {JSON.stringify(item)}
          </div>
        ))}
      </div> */}
    </div>
  );
}