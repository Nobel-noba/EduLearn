<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Attachment extends Model
{
    protected $table = 'attachment';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'lessonId',
        'fileName',
        'fileUrl',
        'fileSize',
    ];

    protected $casts = [
        'fileSize' => 'integer',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'att_' . Str::random(20);
            }
        });
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lessonId');
    }
}
