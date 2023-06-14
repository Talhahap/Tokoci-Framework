<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Identity;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart.items', []);
        $identitas = Identity::all();
        $user = DB::table('users')->where('customerId', session()->get('id.customer'))->first();;
        
        $data=[
            'title'     => "Profile",
            'identitas' => $identitas[0],
            'countCart' => count($cart),
            'user'      => $user
        ];

        return view('front/profile',$data);
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
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = User::find($request->id);

        $user->customerName = $request->nama;
        $user->customerEmail = $request->email;
        $user->customerPhoneNumber = $request->telp;

        $user->save();
        return redirect()->route('profile')->with(['success' => 'Edit Profil Berhasil']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}