import { useState } from "react"
import AddExpense from "../components/AddExpense.tsx"
import NavBar from "../components/NavBar"
import ExpensesTable from "../components/ExpensesTable.tsx"

const Home = () => {

    const [refreshKey, setRefreshKey] = useState<number>(0)

    const refreshExpenses = () => {
        setRefreshKey((prev) => prev + 1)
    }

    return (
        <div className="home">
            <NavBar />
            <h1 className="text-3xl font-semibold m-4">Welcome, {sessionStorage.username}</h1>
            <div className="flex w-full">
                <ExpensesTable refreshKey={refreshKey} />
                <AddExpense onExpenseAdded={refreshExpenses} />
            </div>

        </div>
    )
}

export default Home