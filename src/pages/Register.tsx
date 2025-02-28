import { SubmitHandler, useForm} from "react-hook-form"
import { z } from "zod"
import { zodResolver} from "@hookform/resolvers/zod"
import { useState } from "react"

const schema = z.object({
    "name": z.string(),
    "email": z.string().email(),
    "password": z.string().min(8)
})

type FormFields = z.infer<typeof schema>

const Register = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(schema)
    })

    const [successMessage, setSuccessMessage] = useState<string>("")

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields): Promise<void> => {
        try {
            const response: Response = await fetch (
                "https://expenses-tracker-be.2024-josephp.dev.io-academy.uk/users/register",
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
                throw new Error(result.error || "Invalid input")
            }
        } catch (error) {
            console.error(error)

            const errorMessage = error instanceof Error ? error.message : "Unexpected error"

            setError("root", {message: errorMessage})
        }
        setSuccessMessage("Successfully registered")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {errors.root && <div className="text-red-500 text-center mb-4">{errors.root.message}</div>}
                {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="nameInput" className="block mb-1">Name</label>
                        <input
                            {...register("name")}
                            id="nameInput"
                            autoComplete="name"
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                    </div>

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
                        <a href="/login" className="text-blue-500 hover:text-blue-600">Back to login</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register