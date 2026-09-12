<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'user';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'id',
        'name',
        'email',
        'passwordHash',
        'role',
        'avatar',
        'headline',
        'bio',
        'isSuspended',
        'walletBalance',
    ];

    protected $hidden = [
        'passwordHash',
    ];

    protected $casts = [
        'isSuspended' => 'boolean',
        'walletBalance' => 'float',
    ];

    public function getAuthPassword()
    {
        return $this->passwordHash;
    }

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = 'usr_' . Str::random(20);
            }
        });
    }

    public function courses()
    {
        return $this->hasMany(Course::class, 'instructorId');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'userId');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'userId');
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class, 'instructorId');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'userId');
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class, 'userId');
    }

    public function lessonProgress()
    {
        return $this->hasMany(LessonProgress::class, 'userId');
    }
}
