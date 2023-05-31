<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IdentitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('identities')->insert([
            'shopName' => 'Toko Komputer',
            'shopAddress' => 'Jln. Toko Komputer',
            'shopPhoneNumber' => '081245782932',
            'shopEmail' => 'tokokomputer@gmail.com',
            'shopLogo' => 'tFkR0bGGp3URK6z5YMeP.png',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),    
        ]);
    }
}
