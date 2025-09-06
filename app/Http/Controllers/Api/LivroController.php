<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Livro;
use Illuminate\Http\Request;

class LivroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Livro::with('autor')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'ano_publicacao' => 'required|digits:4',
            'edicao' => 'required|string|max:50',
            'autor_id'=> 'required|integer|exists:autors,id'
        ]);

        $livro = Livro::create($request->all());
        return response()->json($livro->load('autor'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Livro $livro)
    {
        return $livro->load('autor');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Livro $livro)
    {
        $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'ano_publicacao' => 'sometimes|required|digits:4',
            'edicao' => 'sometimes|required|string|max:50',
            'autor_id' => 'sometimes|required|integer|exists:autors,id'
        ]);

        $livro->update($request->all());

        return $livro->load('autor');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Livro $livro)
    {
        livro->delete();
        return response()->noContent();
    }
}
