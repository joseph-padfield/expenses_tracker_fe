import AddExpense from "../components/AddExpense.tsx"
import NavBar from "../components/NavBar"
import Dashboard from "../components/Dashboard.tsx";

const Home = () => {

    return (
        <div className="home">
            <NavBar />
            <h1>Welcome, Joseph Padfield</h1>
            <Dashboard />
            <AddExpense />
        </div>
    )
}

export default Home