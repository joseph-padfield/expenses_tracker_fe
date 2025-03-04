import { Pencil, Trash } from "lucide-react"

type Expense = {
    id: number,
    date: string,
    description: string,
    category_name: string,
    amount: number
}

const EditDeleteButton = ({ expense, onDelete }: { expense: Expense; onDelete: (id: number) => void }) => {

    const handleDeleteClick = () => {
        const isConfirmed = window.confirm(`Are you sure you want to delete "${expense.description}"?`)
        if (isConfirmed) {
            onDelete(expense.id)
        }    }

    return (
        <div className="inline-flex">
            <button className="bg-blue-300 hover:bg-blue-600 text-white py-1 px-2 rounded-l">
                <Pencil strokeWidth={0.8} size={20} />
            </button>
            <button className="bg-red-300 hover:bg-red-600 text-white py-1 px-2 rounded-r"
            onClick={handleDeleteClick}>
                <Trash strokeWidth={0.8} size={20} />
            </button>
        </div>
    )
}

export default EditDeleteButton