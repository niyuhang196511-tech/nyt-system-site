import { Search } from 'lucide-react'

export default function SearchComponent() {
    return (
        <button className="p-2 rounded-md hover:bg-accent">
            <Search className="w-5 h-5 hover:text-primary" />
        </button>
    )
}
