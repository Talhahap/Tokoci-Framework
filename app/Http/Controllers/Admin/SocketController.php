<?php

namespace App\Http\Controllers\Admin;

use App\Exports\SocketExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\ProcessorSocket;
use Maatwebsite\Excel\Facades\Excel;

class SocketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => "Socket",
            'socket' => ProcessorSocket::all()

        ];

        return view('admin/socket', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama'  => 'unique:processor_sockets,processorSocketName',
        ], [
            'nama.unique'  => 'Nama Socket Sudah Digunakan !!',
        ]);

        $socket = new ProcessorSocket;
        $socket->processorSocketName = $request->nama;
        $socket->save();

        return redirect()->route('admin.socket')->with(['success' => 'Tambah Data Berhasil']);
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
        $data = ProcessorSocket::where('processorSocketId', $id)->get();
        return $data->toJson();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'nama'  => Rule::unique('processor_sockets', 'processorSocketName')->ignore($request->processorSocketId, 'processorSocketId'),
        ], [
            'nama.unique'  => 'Nama Socket Sudah Digunakan !!',
        ]);


        $socket = ProcessorSocket::find($request->processorSocketId);
        $socket->processorSocketName = $request->nama;
        $socket->save();

        return redirect()->route('admin.socket')->with(['success' => 'Edit Data Berhasil']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ProcessorSocket::destroy($id);
        return redirect()->route('admin.socket')->with(['success' => 'Hapus Data Berhasil']);
    }

    // Contoh export excel
    public function export(){
        return Excel::download(new SocketExport, 'socket.xlsx');
    }
}
