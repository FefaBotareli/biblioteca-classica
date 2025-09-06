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
       // Cria a tabela 'autors'
        Schema::create('autors', function (Blueprint $table) {
            $table->id(); 
            $table->string('nome'); 
            $table->string('pseudonimo')->nullable(); 
            $table->date('data_nascimento'); 
            $table->date('data_morte')->nullable(); 
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('autors');
    }
};
