// "use client";

// import { motion } from "framer-motion";
// import { Edit, Eye, Link as LinkIcon } from "lucide-react";
// import Link from "next/link";

// interface Tag {
//   id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   products?: any[];
// }

// interface TagTableProps {
//   tags: Tag[];
// }

// export function TagTable({ tags }: TagTableProps) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-slate-50 dark:bg-slate-800/50">
//           <tr>
//             <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
//               Tag Name
//             </th>
//             <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
//               Products
//             </th>
//             <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
//               Created At
//             </th>
//             <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//           {tags.map((tag) => (
//             <motion.tr
//               key={tag.id}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
//               className="group"
//             >
//               <td className="px-6 py-4">
//                 <span className="font-medium">{tag.name}</span>
//               </td>
//               <td className="px-6 py-4">
//                 {tag.products?.length || 0} products
//               </td>
//               <td className="px-6 py-4">
//                 {new Date(tag.createdAt).toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4">
//                 <div className="flex items-center justify-end gap-3">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <Link
//                       href={`/admin/tags/${tag.id}/link`}
//                       className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
//                     >
//                       <LinkIcon className="h-5 w-5" />
//                     </Link>
//                   </motion.div>
//                 </div>
//               </td>
//             </motion.tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { Edit, Eye, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  products?: any[];
}

interface TagTableProps {
  tags: Tag[];
}

export function TagTable({ tags }: TagTableProps) {
  return (
    <div>
      {/* Table View for Larger Screens */}
      <div className="hidden sm:hidden overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                Tag Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                Products
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                Created At
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {tags.map((tag) => (
              <motion.tr
                key={tag.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="group"
              >
                <td className="px-6 py-4">
                  <span className="font-medium">{tag.name}</span>
                </td>
                <td className="px-6 py-4">
                  {tag.products?.length || 0} products
                </td>
                <td className="px-6 py-4">
                  {new Date(tag.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={`/admin/tags/${tag.id}/link`}
                        className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                      >
                        <LinkIcon className="h-5 w-5" />
                      </Link>
                    </motion.div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for Mobile Screens */}
      <div className="block sm:block">
        {tags.map((tag) => (
          <motion.div
            key={tag.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-950 shadow rounded-lg mb-4 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-lg">{tag.name}</h2>
              <span className="text-sm text-slate-500">
                {new Date(tag.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-3">
              {tag.products?.length || 0} products
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/tags/${tag.id}/link`}
                className="p-2 text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                <LinkIcon className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
