import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/inertia-react";

export default function Index(props) {
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
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Student
                </h2>
            }
        >
            <Head title="Student" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="overflow-x-auto relative p-6 bg-white border-b border-gray-200">
                    <h1 className="text-2xl font-bold mb-4">Student Table</h1>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="`col`" className="py-3 px-6">
                                    First Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Last Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Sex
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Phone Number
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.students.map((student) => {
                                return (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        key={student.id}
                                    >
                                        <td className="py-4 px-6">
                                            {student.first_name}
                                        </td>
                                        <td className="py-4 px-6">
                                            {student.last_name}
                                        </td>
                                        <td className="py-4 px-6">
                                            {student.sex === 1
                                                ? "Male"
                                                : student.sex === 2
                                                ? "Female"
                                                : "N/A"}
                                        </td>
                                        <td className="py-4 px-6">
                                            {student.phone_number}
                                        </td>
                                        <td className="py-4 px-6">
                                            {student.email}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="p-6 bg-white border-b border-gray-200">
                    <h1 className="text-2xl font-bold mb-4">Insert Student</h1>
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
                                        setData("sex", e.target.value)
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
            </div>
        </AuthenticatedLayout>
    );
}
