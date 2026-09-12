<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class LessonProgress extends Model
{
    protected $table = 'lessonprogress';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = null;
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'id',
        'userId',
        'lessonId',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'prog_' . Str::random(20);
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lessonId');
    }
}
