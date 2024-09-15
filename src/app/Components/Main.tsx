import {ChildrenProps} from "@/app/types";

export default function Main({children}:ChildrenProps) {
  return (
     <main className="mx-auto px-4">
         {children}
     </main>
  );
}
