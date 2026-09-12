<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    protected $table = 'order';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'userId',
        'totalAmount',
        'platformFee',
        'instructorShare',
        'status',
        'paymentMethod',
        'transactionRef',
    ];

    protected $casts = [
        'totalAmount' => 'float',
        'platformFee' => 'float',
        'instructorShare' => 'float',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'ord_' . Str::random(20);
            }
            if (empty($model->transactionRef)) {
                $model->transactionRef = 'TXN-' . date('Ymd') . '-' . strtoupper(Str::random(8));
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'orderId');
    }
}
