<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Director extends Model
{
    protected $fillable = ['first_name', 'last_name', 'birth_date'];

    // Accessor for full name
    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    // Relation to movies
    public function movies()
    {
        return $this->hasMany(Movie::class);
    }
}
