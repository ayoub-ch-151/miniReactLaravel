<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    protected $fillable = ['first_name', 'last_name', 'birth_date', 'country'];

    // Accessor for full name
    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    // Relation to movies with pivot role and explicit pivot table name
    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'movie_actor')
                    ->withPivot('role')
                    ->withTimestamps();
    }
}
