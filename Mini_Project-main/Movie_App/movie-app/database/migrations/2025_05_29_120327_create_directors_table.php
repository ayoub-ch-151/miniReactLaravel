<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDirectorsTable extends Migration
{
    public function up()
    {
        Schema::create('directors', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birth_date');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('directors');
    }
}
