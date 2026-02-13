import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { News } from "@/types/news";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";
import Link from "next/link";
import { Locale } from "@/types/locale";
import dayjs from "dayjs";
import { YEAR_MONTH_DAY_HOUR_MINUTE_SECOND } from "@/constants/format";

interface IProps {
  title: string;
  description: string;
  cover: string;
  news: News[];
  locale: Locale;
}

export default function LatestNews({
  title,
  description,
  cover,
  news,
  locale,
}: IProps) {
  const newItems = news.map((item) => (
    <Item key={item.id} variant="outline" className="mb-2.5" asChild>
      <Link href={`/${locale}/news/${item.id}`}>
        <ItemContent>
          <ItemTitle>{item.title}</ItemTitle>
        </ItemContent>
        <ItemContent>
          <ItemDescription>
            {dayjs(item.date).format(YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  ));

  return (
    <section className="mx-auto px-4 py-6 xl:container">
      <h2 className="mb-6 text-3xl font-extrabold tracking-tight">{title}</h2>
      <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
        {description}
      </p>

      <div className="grid gap-x-6 xl:grid-cols-2">
        <div className="hidden w-full items-center xl:flex">
          <Image
            className="w-full"
            src={cover}
            alt={title}
            width={600}
            height={300}
          />
        </div>
        <ScrollArea className="hidden h-[500px] w-full xl:block">
          {newItems}
        </ScrollArea>
        <div className="xl:hidden">{newItems}</div>
      </div>
    </section>
  );
}
