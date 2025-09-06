<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'pseudonimo',
        'data_nascimento',
        'data_morte',
    ];

    public function livros()
    {
        return $this->hasMany(Livro::class);
    }
}
