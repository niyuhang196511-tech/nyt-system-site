import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { Language } from "@/types/language";
import { getLanguage } from "@/lib/getLanguage";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function MobileMenu({ language }: { language: Language }) {
  const dict = await getLanguage(language);

  const productCategory = dict.product.category;
  const newCategory = dict.new.category;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md p-2 hover:bg-accent md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-sm">
        {/* <SheetTitle className="text-2xl leading-12 pl-4 mb-0">
                    菜单
                </SheetTitle> */}
        <ScrollArea className="h-full">
          <nav>
            <ul className="flex flex-col">
              <li>
                <Link
                  href="/"
                  className="block border-b px-4 py-4 text-base hover:bg-muted/50"
                >
                  {dict.home.title}
                </Link>
              </li>

              <li>
                <Accordion type="single" collapsible defaultValue="products">
                  <AccordionItem value="products">
                    <AccordionTrigger className="flex w-full items-center justify-between border-b px-4 py-4">
                      <span className="text-base">{dict.product.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-5 p-4">
                        {productCategory.map((item) => {
                          return (
                            <li key={item.name}>
                              <Link
                                href={`/${language}/products/${item.id}`}
                                className="text-base font-semibold text-gray-900 transition-colors group-hover:text-primary"
                              >
                                {item.name}
                              </Link>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                {item.description}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>

              <li>
                <Link
                  href="/about"
                  className="block border-b px-4 py-4 text-base hover:bg-muted/50"
                >
                  {dict.about.title}
                </Link>
              </li>

              <li>
                <Accordion type="single" collapsible defaultValue="news">
                  <AccordionItem value="news">
                    <AccordionTrigger className="flex w-full items-center justify-between border-b px-4 py-4">
                      <span className="text-base">{dict.new.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-5 p-4">
                        {newCategory.map((category) => {
                          return (
                            <li key={category.id}>
                              <Link
                                href={`/${language}/news#${category.id}`}
                                className="text-base font-semibold text-gray-900 transition-colors group-hover:text-primary"
                              >
                                {category.name}
                              </Link>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                {category.description}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="block border-b px-4 py-4 text-base hover:bg-muted/50"
                >
                  {dict.contact.title}
                </Link>
              </li>
            </ul>
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
