<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Media;

class SosmedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data=[
            'title' => "Sosial Media",
            'sosmed' => Media::all()
        ];

        return view('admin/sosmed',$data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $media = new Media;
        $media->mediaName = $request->nama;
        $media->medialink = $request->link;
        $media->save();

        return redirect()->route('admin.sosmed')->with(['success' => 'Tambah Data Berhasil']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = Media::find($id)->get();
        return $data->toJson();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $media = Media::find($request->mediaId);
        $media->mediaName = $request->mediaName;
        $media->medialink = $request->medialink;
        $media->save();

        return redirect()->route('admin.sosmed')->with(['success' => 'Edit Data Berhasil']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Media::destroy($id);
        return redirect()->route('admin.sosmed')->with(['success' => 'Hapus Data Berhasil']);
    }
}
