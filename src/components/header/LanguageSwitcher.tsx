import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/types/locale";
import { Globe } from "lucide-react";
import Link from "next/link";

interface IProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 rounded-md p-2 hover:bg-accent">
          <Globe className="h-5 w-5 hover:text-primary" />
          <span>{locale === "zh-CN" ? "中文" : "English"}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link className="w-full" href="/zh-CN">
            中文
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/en-US">
            English
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
