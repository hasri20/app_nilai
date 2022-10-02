import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/inertia-react";

const calculateGrade = (score) => {
    if (score >= 85) {
        return "A";
    } else if (score >= 75) {
        return "B";
    } else if (score >= 65) {
        return "C";
    } else {
        return "D";
    }
};

const calculateScore = ({
    quizScore,
    assesmentScore,
    attendanceScore,
    practiceScore,
    semesterScore,
}) => {
    const quizWeight = 0.25 * quizScore;
    const assessmentWeight = 0.1 * assesmentScore;
    const attendanceWeight = 0.1 * attendanceScore;
    const practiceWeight = 0.15 * practiceScore;
    const semesterWeight = 0.4 * semesterScore;

    return (
        quizWeight +
        assessmentWeight +
        attendanceWeight +
        practiceWeight +
        semesterWeight
    );
};
export default function Index(props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        student_id: "",
        quiz_score: "",
        assessment_score: "",
        attendance_score: "",
        practice_score: "",
        semester_score: "",
        semester_period: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("score.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Score
                </h2>
            }
        >
            <Head title="Score" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="overflow-x-auto relative p-6 bg-white border-b border-gray-200">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="`col`" className="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Quiz Score
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Assessment Score
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Attendance Score
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Practice Score
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Semester Score
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Semester Period
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Total Score
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Grade
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.scores.map((score) => {
                                return (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        key={score.id}
                                    >
                                        <td className="py-4 px-6">
                                            {`${score.first_name} ${score.last_name}`}
                                        </td>
                                        <td className="py-4 px-6">
                                            {score.quiz_score}
                                        </td>
                                        <td className="py-4 px-6">
                                            {score.assessment_score}
                                        </td>
                                        <td className="py-4 px-6">
                                            {score.attendance_score}
                                        </td>
                                        <td className="py-4 px-6">
                                            {score.practice_score}
                                        </td>
                                        <td className="py-4 px-6">
                                            {score.semester_score}
                                        </td>
                                        <td className="py-4 px-6">
                                            {score.semester_period}
                                        </td>
                                        <td className="py-4 px-6">
                                            {calculateScore({
                                                quizScore: score.quiz_score,
                                                assesmentScore:
                                                    score.assessment_score,
                                                attendanceScore:
                                                    score.attendance_score,
                                                practiceScore:
                                                    score.practice_score,
                                                semesterScore:
                                                    score.semester_score,
                                            })}
                                        </td>
                                        <td className="py-4 px-6">
                                            {calculateGrade(
                                                calculateScore({
                                                    quizScore: score.quiz_score,
                                                    assesmentScore:
                                                        score.assessment_score,
                                                    attendanceScore:
                                                        score.attendance_score,
                                                    practiceScore:
                                                        score.practice_score,
                                                    semesterScore:
                                                        score.semester_score,
                                                })
                                            )}
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
                    <form onSubmit={submit}>
                        <div className="grid gap-6 mb-6">
                            <div>
                                <label
                                    htmlFor="student_name"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Student name
                                </label>
                                <select
                                    id="student_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) =>
                                        setData("student_id", e.target.value)
                                    }
                                    value={data.student_id}
                                >
                                    <option value={""}>Select Student</option>
                                    {props.students.map((student) => (
                                        <option
                                            key={student.id}
                                            value={student.id}
                                        >{`${student.first_name}  ${student.last_name}`}</option>
                                    ))}
                                </select>
                                {errors.student_id && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {errors.student_id}
                                        </span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="quiz_score"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Quiz Score
                                </label>
                                <input
                                    type="number"
                                    id="quiz_score"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.quiz_score}
                                    placeholder="80"
                                    onChange={(e) =>
                                        setData("quiz_score", e.target.value)
                                    }
                                    required
                                />
                                {errors.quiz_score && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {errors.quiz_score}
                                        </span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="assessment_score"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Assessment Score
                                </label>
                                <input
                                    type="number"
                                    id="assessment_score"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="75"
                                    value={data.assessment_score}
                                    onChange={(e) =>
                                        setData(
                                            "assessment_score",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                {errors.assessment_score && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {errors.assessment_score}
                                        </span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="attendance_score"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Attendance Score
                                </label>
                                <input
                                    type="text"
                                    id="attendance_score"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="100"
                                    value={data.attendance_score}
                                    onChange={(e) =>
                                        setData(
                                            "attendance_score",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                {errors.attendance_score && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {errors.attendance_score}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="practice_score"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Practice Score
                                </label>
                                <input
                                    type="number"
                                    id="practice_score"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="90"
                                    value={data.practice_score}
                                    onChange={(e) =>
                                        setData(
                                            "practice_score",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                {errors.practice_score && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {errors.practice_score}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="semester_score"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Semester Score
                                </label>
                                <input
                                    type="number"
                                    id="semester_score"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="90"
                                    value={data.semester_score}
                                    onChange={(e) =>
                                        setData(
                                            "semester_score",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                {errors.semester_score && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {errors.semester_score}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="semester_period"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Semester Period
                                </label>
                                <select
                                    id="semester_period"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) =>
                                        setData(
                                            "semester_period",
                                            e.target.value
                                        )
                                    }
                                    value={data.semester_period}
                                >
                                    <option value={""}>Select Semester</option>
                                    <option value={"2201"}>
                                        2022 - Odd Semester
                                    </option>
                                    <option value={"2202"}>
                                        2022 - Even Semester
                                    </option>
                                </select>
                                {errors.semester_period && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {errors.semester_period}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <PrimaryButton className="mt-4" disabled={processing}>
                            Input
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
