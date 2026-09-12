<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Lesson extends Model
{
    protected $table = 'lesson';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'title',
        'order',
        'type',
        'content',
        'videoUrl',
        'durationSec',
        'isFreePreview',
        'sectionId',
    ];

    protected $casts = [
        'order' => 'integer',
        'durationSec' => 'integer',
        'isFreePreview' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'les_' . Str::random(20);
            }
        });
    }

    public function section()
    {
        return $this->belongsTo(Section::class, 'sectionId');
    }

    public function quizQuestions()
    {
        return $this->hasMany(QuizQuestion::class, 'lessonId');
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class, 'lessonId');
    }

    public function progress()
    {
        return $this->hasMany(LessonProgress::class, 'lessonId');
    }
}
