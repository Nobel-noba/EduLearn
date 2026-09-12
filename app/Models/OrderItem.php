<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class OrderItem extends Model
{
    protected $table = 'orderitem';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'orderId',
        'courseId',
        'price',
        'platformFee',
        'instructorNet',
    ];

    protected $casts = [
        'price' => 'float',
        'platformFee' => 'float',
        'instructorNet' => 'float',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'item_' . Str::random(20);
            }
        });
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'orderId');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'courseId');
    }
}
