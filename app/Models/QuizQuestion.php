<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class QuizQuestion extends Model
{
    protected $table = 'quizquestion';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'lessonId',
        'question',
        'options',
        'correctAnswer',
        'explanation',
    ];

    protected $casts = [
        'correctAnswer' => 'integer',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'qz_' . Str::random(20);
            }
        });
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lessonId');
    }
}
