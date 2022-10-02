<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Score;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ScoreController extends Controller
{
   
    public function index()
    {

        $scores = DB::table('scores')
            ->join('students', 'scores.student_id', '=', 'students.id')
            ->select('scores.*', 'students.first_name', 'students.last_name')
            ->get();

        return Inertia::render('Scores/Index', [
            'students' => Student::all(),
            'scores' => $scores
        ]);
    }

   
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id'        => ['required','string','max:255'],
            'quiz_score'        => ['required','integer', 'between:0,100'], 
            'assessment_score'  => ['required','integer', 'between:0,100'], 
            'attendance_score'  => ['required','integer', 'between:0,100'], 
            'practice_score'    => ['required','integer', 'between:0,100'], 
            'semester_score'    => ['required','integer', 'between:0,100'], 
            'semester_period'   => ['required','integer', 'digits:4'], 
        ]);

        $score = new Score;

        $score->student_id = $request->student_id;
        $score->quiz_score = $request->quiz_score;
        $score->assessment_score = $request->assessment_score;
        $score->attendance_score = $request->attendance_score;
        $score->practice_score = $request->practice_score;
        $score->semester_score = $request->semester_score;
        $score->semester_period = $request->semester_period;

        $score->save();
 
        return redirect(route('score.index'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Score  $score
     * @return \Illuminate\Http\Response
     */
    public function edit(Score $score)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Score  $score
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Score $score)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Score  $score
     * @return \Illuminate\Http\Response
     */
    public function destroy(Score $score)
    {
        //
    }
}
