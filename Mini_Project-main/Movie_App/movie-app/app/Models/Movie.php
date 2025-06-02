<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        'title',
        'summary',
        'release_year',
        'duration',
        'genre',
        'poster_url',
        'director_id',
    ];

    // Relation to director
    public function director()
    {
        return $this->belongsTo(Director::class);
    }

    // Relation to actors with pivot role and explicit pivot table name
    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'movie_actor')
                    ->withPivot('role')
                    ->withTimestamps();
    }
}
