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
        Schema::create('monitors', function (Blueprint $table) {
            $table->uuid('monitorId')->primary();
            $table->foreignUuid('brandId')->references('brandId')->on('brands')->onDelete('cascade');
            $table->string('monitorName',255);
            $table->string('monitorResolution',255);
            $table->string('monitorSize',255);
            $table->string('monitorPanel',255);
            $table->string('monitorRefreshRate',255);
            $table->string('monitorResponseTime',255);
            $table->string('monitorGamut',255);
            $table->string('monitorPort',255);
            $table->text('monitorDescription');
            $table->string('monitorWarranty',255);
            $table->string('monitorPrice', 255);
            $table->string('monitorStock',255);
            $table->string('monitorImage', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitors');
    }
};