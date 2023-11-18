import React from "react";
type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <div className="h-10 bg-slate-900 text-2xl flex items-center pl-5 my-5">
      {title}
    </div>
  );
}
