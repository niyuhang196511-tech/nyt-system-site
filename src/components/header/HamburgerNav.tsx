import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from '@/components/ui/accordion'
import { Menu } from 'lucide-react'
import { Language } from '@/types/language'
import { getLanguage } from '@/lib/getLanguage'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function MobileMenu({ language }: { language: Language }) {
    const dict = await getLanguage(language)

    const productClassify = dict.product.classify
    const newClassify = dict.new.classify

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-accent md:hidden">
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
                                    className="block py-4 px-4 text-base border-b hover:bg-muted/50"
                                >
                                    {dict.home.title}
                                </Link>
                            </li>

                            <li>
                                <Accordion
                                    type="single"
                                    collapsible
                                    defaultValue="products"
                                >
                                    <AccordionItem value="products">
                                        <AccordionTrigger className="py-4 px-4 flex justify-between items-center w-full border-b">
                                            <span className="text-base">
                                                {dict.product.title}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="flex flex-col gap-5 p-4">
                                                {productClassify.map((item) => {
                                                    return (
                                                        <li key={item.label}>
                                                            <Link
                                                                href={`/products`}
                                                                className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors"
                                                            >
                                                                {item.label}
                                                            </Link>
                                                            <p className="text-sm text-gray-600 mt-1 leading-6">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="block py-4 px-4 text-base border-b hover:bg-muted/50"
                                >
                                    {dict.about.title}
                                </Link>
                            </li>

                            <li>
                                <Accordion
                                    type="single"
                                    collapsible
                                    defaultValue="news"
                                >
                                    <AccordionItem value="news">
                                        <AccordionTrigger className="py-4 px-4 flex justify-between items-center w-full border-b">
                                            <span className="text-base">
                                                {dict.new.title}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="flex flex-col gap-5 p-4">
                                                {newClassify.map((item) => {
                                                    return (
                                                        <li key={item.label}>
                                                            <Link
                                                                href={`/products`}
                                                                className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors"
                                                            >
                                                                {item.label}
                                                            </Link>
                                                            <p className="text-sm text-gray-600 mt-1 leading-6">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="block py-4 px-4 text-base border-b hover:bg-muted/50"
                                >
                                    {dict.contact.title}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
