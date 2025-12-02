import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Language } from "@/types/language";
import { Globe } from "lucide-react";
import Link from "next/link";

export default function LanguageSwitcher({ language }: { language: Language }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 rounded-md p-2 hover:bg-accent">
          <Globe className="h-5 w-5 hover:text-primary" />
          <span>{language === "zh-CN" ? "中文" : "English"}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link className="w-full" href="/zh-CN">
            中文
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/en">
            English
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
