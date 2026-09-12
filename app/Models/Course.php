<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Course extends Model
{
    protected $table = 'course';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'id',
        'title',
        'slug',
        'subtitle',
        'description',
        'thumbnail',
        'promoVideoUrl',
        'price',
        'isFree',
        'level',
        'language',
        'status',
        'rejectionReason',
        'instructorId',
        'categoryId',
    ];

    protected $casts = [
        'price' => 'float',
        'isFree' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'crs_' . Str::random(20);
            }
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title) . '-' . Str::random(5);
            }
        });
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructorId');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId');
    }

    public function sections()
    {
        return $this->hasMany(Section::class, 'courseId')->orderBy('order', 'asc');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'courseId');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'courseId');
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class, 'courseId');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'courseId');
    }
}
