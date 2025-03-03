import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ExpensesTable = () => {
    type Expense = {
        id: number,
        date: string,
        description: string,
        category_name: string,
        amount: number
    }

    const navigate = useNavigate()
    const [expenses, setExpenses] = useState<Expense[]>([])

    const getData = async () => {
        try {
            const headers = new Headers()
            headers.append("Authorization", "Bearer " + sessionStorage.getItem("token"))
            const response = await fetch(
                "https://expenses-tracker-be.2024-josephp.dev.io-academy.uk/expenses",
                {
                    method: "GET",
                    headers: headers,
                }
            )
            if (!response.ok) {
                navigate("/login")
                throw new Error(`Error: ${response.status}`)
            }
            const data = await response.json()
            setExpenses(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
        <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Expenses
            </h2>            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg shadow-sm">
                    <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-6 py-3 text-left font-semibold">Date</th>
                        <th className="px-6 py-3 text-left font-semibold">Description</th>
                        <th className="px-6 py-3 text-left font-semibold">Category</th>
                        <th className="px-6 py-3 text-left font-semibold">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <tr key={expense.id} className="border-b even:bg-gray-100 hover:bg-gray-200 transition">
                                <td className="px-6 py-4">{expense.date}</td>
                                <td className="px-6 py-4">{expense.description}</td>
                                <td className="px-6 py-4">{expense.category_name}</td>
                                <td className="px-6 py-4 font-semibold text-gray-700">£{expense.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-6 text-gray-500">
                                No expenses found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default ExpensesTable