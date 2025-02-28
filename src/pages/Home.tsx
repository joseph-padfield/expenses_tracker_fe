import AddExpense from "../components/AddExpense.tsx"
import NavBar from "../components/NavBar"

const Home = () => {

    return (
        <div className="home">
            <NavBar />
            <h1>Home</h1>
            <AddExpense />
        </div>
    )
}

export default Home