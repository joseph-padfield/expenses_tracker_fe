import { Link } from 'react-router-dom'

const NavBar = () => {

    const handleClick = (e) => {
        localStorage.removeItem("token")
    }


    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">Expense Tracker</h1>
                <div className="space-x-4">
                    <Link to="/">Dashboard</Link>
                    <Link to="/">Add Expense</Link>
                    <Link to="/login" onClick={handleClick}>Logout</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar