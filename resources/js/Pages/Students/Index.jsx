import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/inertia-react";

export default function Index({ auth, students }) {
    console.log(students);
    const { data, setData, post, processing, reset, errors } = useForm({
        firstName: "",
        lastName: "",
        sex: "1",
        phoneNumber: "",
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("student.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <InputError message={errors.message} className="mt-2" />
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium"
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.firstName}
                                placeholder="John"
                                onChange={(e) =>
                                    setData("firstName", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block mb-2 text-sm font-medium"
                            >
                                Last name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.lastName}
                                placeholder="Doe"
                                onChange={(e) =>
                                    setData("lastName", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="sex"
                                className="block mb-2 text-sm font-medium"
                            >
                                Gender
                            </label>
                            <select
                                id="sex"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) =>
                                    setData("lastName", e.target.value)
                                }
                                value={data.sex}
                            >
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="0">Not known</option>
                                <option value="9">Not applicable</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium"
                            >
                                Phone number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="123-45-678"
                                value={data.phoneNumber}
                                onChange={(e) =>
                                    setData("phoneNumber", e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="student@school.com"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    <PrimaryButton className="mt-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
