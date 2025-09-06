<?php

use App\Http\Controllers\Api\AutorController;
use App\Http\Controllers\Api\LivroController;
use App\Http\Controllers\Api\GeneroController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('autores', AutorController::class);
    Route::apiResource('livros', LivroController::class);
});

