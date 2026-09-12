<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlatformSetting extends Model
{
    protected $table = 'platformsetting';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = null;
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'id',
        'commissionRate',
        'subscriptionPrice',
        'platformName',
        'supportEmail',
    ];

    protected $casts = [
        'commissionRate' => 'float',
        'subscriptionPrice' => 'float',
    ];
}
