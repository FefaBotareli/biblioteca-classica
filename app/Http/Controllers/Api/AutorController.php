<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Autor;
use Illuminate\Http\Request;

class AutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Autor::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'data_nascimento' => 'required|date',
        ]);

        $autor = Autor::create($request->all());

        return response()->json($autor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Autor $autor)
    {
        return $autor;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Autor $autor)
    {
        $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'data_nascimento' => 'sometimes|required|date',
        ]);

        $autor->update($request->all());

        return $autor;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Autor $autor)
    {
        $autor->delete();
    }
}
