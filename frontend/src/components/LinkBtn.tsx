import Link from "next/link";

type BtnProps = {
  title: string;
  path: string;
};

export function LinkBtn({ title, path }: BtnProps) {
  return (
    <Link
      className="border border-slate-300 px-2 py-1 rounded  hover:bg-slate-700 focus-within:bg-slate-700 outline-none flex justify-center w-1/2"
      href={path}
    >
      {title}
    </Link>
  );
}
