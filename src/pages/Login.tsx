import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type FormFields = z.infer<typeof schema>

const Login = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            email: "demo@email.com",
            password: "password",
        },
        resolver: zodResolver(schema),
    })

    const [successMessage, setSuccessMessage] = useState<string>("")

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields): Promise<void> => {
        try {
            const response: Response = await fetch(
                "https://expenses-tracker-be.2024-josephp.dev.io-academy.uk/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Invalid credentials")
            }

            if (result.username) {
                sessionStorage.setItem("username", result.username)
            }

            if (result.user_id) {
                sessionStorage.setItem("user_id", result.user_id)
            }

            if (result.token) {
                sessionStorage.setItem("token", result.token)
                setSuccessMessage("Login successful!")
                navigate("/home")
            }

        } catch (error) {
            console.error(error)

            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"

            setError("root", { message: errorMessage })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {errors.root && <div className="text-red-500 text-center mb-4">{errors.root.message}</div>}
                {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="emailInput" className="block mb-1">Email</label>
                        <input
                            {...register("email")}
                            id="emailInput"
                            autoComplete="email"
                            type="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="passwordInput" className="block mb-1">Password</label>
                        <input
                            {...register("password")}
                            id="passwordInput"
                            type="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                    </div>

                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md mb-4 hover:bg-blue-600 transition"
                    >
                        {isSubmitting ? "Loading..." : "Submit"}
                    </button>
                    <div className="flex justify-end w-full">
                        <a href="/register" className="text-blue-500 hover:text-blue-600">Register</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login