import { useEffect, useState } from "react"

const Dashboard = () => {


    const [expenses, setExpenses] = useState([])


    const getData = async () => {
        try {
            const headers = new Headers()
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            const response = await fetch("https://expenses-tracker-be.2024-josephp.dev.io-academy.uk/expenses", {
                method: "GET",
                headers: headers
            })
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            const data = await response.json()
            setExpenses(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect (() => {
        getData()
    }, [])






    return (
        <div className="">
            <table className="table-auto w-1/2">
                <thead>
                <tr>
                    <th className="text-left">Date</th>
                    <th className="text-left">Description</th>
                    <th className="text-left">Category</th>
                    <th className="text-left">Amount</th>
                </tr>
                </thead>
                <tbody>
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (

                            <tr key={expense.id}>
                                <td>{expense.date}</td>
                                <td>{expense.description}</td>
                                <td>{expense.category_name}</td>
                                <td>{expense.amount}</td>
                            </tr>
                        ))
                    ) : <tr><td>No expenses found</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard