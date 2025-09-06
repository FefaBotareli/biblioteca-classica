<?php

namespace App\Models;
use App\Models\Autor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
     use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'titulo',
        'subtitulo',
        'ano_publicacao',
        'edicao',
        'autor_id',
    ];

    public function autor()
    {
        return $this->belongsTo(Autor::class);
    }


}
