<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Certificate extends Model
{
    protected $table = 'certificate';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = 'issuedAt';
    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'certificateCode',
        'userId',
        'courseId',
        'issuedAt',
    ];

    protected $casts = [
        'issuedAt' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'cert_' . Str::random(20);
            }
            if (empty($model->certificateCode)) {
                $model->certificateCode = 'CERT-' . date('Y') . '-' . strtoupper(Str::random(6));
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'courseId');
    }
}
