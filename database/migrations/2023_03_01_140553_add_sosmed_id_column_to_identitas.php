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
        Schema::table('identitas', function (Blueprint $table) {
            $table->char('sosmed_id')->after('gambar');
            $table->foreignUuid('idSosmed')->foreign('idSosmed')->references('idSosmed')->on('sosmeds');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('identitas', function (Blueprint $table) {
            $table->dropColumn('sosmed_id');
        });
    }
};
