<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('student_id')->constrained('students')->onDelete('cascade');;
            $table->integer('quiz_score');
            $table->integer('assessment_score');
            $table->integer('attendance_score');
            $table->integer('practice_score');
            $table->integer('semester_score');
            $table->integer('semester_period');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scores');
    }
};
