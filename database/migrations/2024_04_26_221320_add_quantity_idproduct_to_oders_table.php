<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            // Change the data type of 'quantity' and 'id_product' columns if needed
            $table->unsignedInteger('quantity'); // Assuming quantity is an integer
            $table->unsignedBigInteger('id_product'); // Assuming id_product is an integer

            // Define foreign key constraint
            $table->foreign('id_product')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['id_product']);

            // Drop the columns
            $table->dropColumn('quantity');
            $table->dropColumn('id_product');
        });
    }
};
