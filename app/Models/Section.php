<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Section extends Model
{
    protected $table = 'section';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'title',
        'order',
        'courseId',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'sec_' . Str::random(20);
            }
        });
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'courseId');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'sectionId')->orderBy('order', 'asc');
    }
}
