<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('livros', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');

            // ->nullable() quer dizer que o campo não é obrigatório
            $table->string('subtitulo')->nullable();

            $table->integer('ano_publicacao'); 
            $table->string('edicao');

            // Cria a coluna 'autor_id' e a conecta com a coluna 'id' da tabela 'autors'.
            $table->foreignId('autor_id')->constrained('autors');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livros');
    }
};
