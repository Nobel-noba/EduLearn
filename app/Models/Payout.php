<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payout extends Model
{
    protected $table = 'payout';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = 'requestedAt';
    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'instructorId',
        'amount',
        'method',
        'details',
        'status',
        'adminNote',
        'requestedAt',
        'processedAt',
    ];

    protected $casts = [
        'amount' => 'float',
        'requestedAt' => 'datetime',
        'processedAt' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'pay_' . Str::random(20);
            }
        });
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructorId');
    }
}
