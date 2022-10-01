<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Student;


class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('Students/Index', [
            'students' => Student::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:255', 
            'lastName' => 'required|string|max:255', 
            'phoneNumber' => 'required|string|max:255', 
            'email' => 'required|string|max:255', 
        ]);
 
        $student = new Student;

        $student->first_name = $request->firstName;
        $student->last_name = $request->lastName;
        $student->sex = $request->sex;
        $student->phone_number = $request->phoneNumber;
        $student->email = $request->email;
        $student->date_of_birth = NOW();

        $student->save();
 
        return redirect(route('student.index'));
    }
}
