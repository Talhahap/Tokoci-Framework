<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ComputerCase;
use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CasingController extends Controller
{
    public function index()
    {
        $data=[
            'title' => "Case",
            'casing' => ComputerCase::with("brand")->get(),
            'merk' => Brand::all()
        ];

        return view('admin/case',$data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'caseImage' => 'image|mimes:png,jpg,jpeg',
        ]);

        $casing = new ComputerCase;
        if ($request->file('caseImage')) {
            $gambar = $request->file('caseImage');
            $CasingGambarName = Str::random(20) . '.' . $gambar->getClientOriginalExtension();
            $gambar->move(public_path('uploads/gambar/casing'), $CasingGambarName);
            $casing->caseImage = $CasingGambarName;
        }

        $casing->brandId = $request->brand;
        $casing->caseName = $request->nama;
        $casing->caseType = $request->type;
        $casing->caseFanSlot = $request->fanSlot;
        $casing->caseDescription = $request->deskripsi;
        $casing->caseWarranty = $request->garansi;
        $casing->casePrice = $request->harga;
        $casing->caseStock = $request->stok;
        $casing->save();
        
        return redirect()->route('admin.case')->with(['success' => 'Tambah Data Berhasil']);
    }

    public function edit(string $id)
    {
        $data = ComputerCase::with("brand")->where('caseId', $id)->get();
        return $data->toJson();
    }

    public function update(Request $request)
    {
        $request->validate([
             'caseImage' => 'image|mimes:png,jpg,jpeg',
        ]);

        $casing = ComputerCase::find($request->idUpdate);
        
        if ($request->file('caseImage')) {
            File::delete('uploads/gambar/casing/'.$casing->caseImage);
            $gambar = $request->file('caseImage');
            $CasingGambarName = Str::random(20) . '.' . $gambar->getClientOriginalExtension();
            $gambar->move(public_path('uploads/gambar/casing'), $CasingGambarName);
            $casing->caseImage = $CasingGambarName;
        }else{
            $casing->caseImage = $request->imageAwal;
        }

        $casing->brandId = $request->brand;
        $casing->caseName = $request->nama;
        $casing->caseType = $request->type;
        $casing->caseFanSlot = $request->fanSlot;
        $casing->caseDescription = $request->deskripsi;
        $casing->caseWarranty = $request->garansi;
        $casing->casePrice = $request->harga;
        $casing->caseStock = $request->stok;
        $casing->save();

        return redirect()->route('admin.case')->with(['success' => 'Edit Data Berhasil']);
    }

    public function destroy(string $id)
    {
        $ComputerCase = ComputerCase::find($id);
        File::delete('uploads/gambar/casing/'.$ComputerCase->caseImage);
        ComputerCase::destroy($id);
        return redirect()->route('admin.case')->with(['success' => 'Hapus Data Berhasil']);
    }
}