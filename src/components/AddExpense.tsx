import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver} from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"

const schema = z.object({
    date: z.date(),
    description: z.string(),
    category: z.string(),
    amount: z.string(),
})

type FormFields = z.infer<typeof schema>

type Categories = {
    id: number,
    name: string,
}

const AddExpense = () => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({
        resolver: zodResolver(schema)
    })

    const [successMessage, setSuccessMessage] = useState<string>("")

    const [categories, setCategories] = useState<Categories[]>([])

    const getCategories = async () => {
        try {
            const response: Response = await fetch (
                "https://expenses-tracker-be.2024-josephp.dev.io-academy.uk/categories",
                {
                    method: "GET",
                }
            )
            if (!response.ok) {
                throw new Error("Error fetching categories.")
            }
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields): Promise<void> => {
        try {
            const headers = new Headers()
            headers.append("Authorization", "Bearer " + sessionStorage.getItem("token"))
            const response = await fetch (
                "https://expenses-tracker-be.2024-josephp.dev.io-academy.uk/expenses",
                {
                    method: "POST",
                    headers: headers,
                }
            )
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
            if (response.status === 201) {
                setSuccessMessage("Successfully created expense")
            }
        } catch (error) {
            console.error(error)

            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"

            setError("root", { message: errorMessage })
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto py-6 px-6">
            <div className="w-full bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Add Expense
                </h2>

                {errors.root && <div className="text-red-500 text-center mb-4">{errors.root.message}</div>}
                {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

                <form className="flex flex-col gap-y-4">

                    <div className="flex flex-col">
                        <label htmlFor="date" className="text-gray-700 font-medium mb-1">Date</label>
                        <input
                            {...register("date")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="date"
                            name="date"
                            id="date"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-700 font-medium mb-1">Description</label>
                        <input
                            {...register("description")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Enter expense details"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="category" className="text-gray-700 font-medium mb-1">Category</label>
                        <select
                            {...register("category")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="category"
                            id="category"
                            defaultValue="Select category"
                        >
                            {/*MAP OUT CATEGORIES HERE*/}
                            {
                                categories.length > 0 ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))
                                ) : <option>No categories</option>
                            }
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="amount" className="text-gray-700 font-medium mb-1">Amount</label>
                        <input
                            {...register("amount")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="amount"
                            id="amount"
                            placeholder="Enter amount"
                        />
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-all hover:shadow-lg"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;