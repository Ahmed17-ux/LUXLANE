<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Editor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name'=>'user_houssam',
            'email' => 'houssamhd@gmail.com',
            'password' => Hash::make('houssamhd@gmail.com'),
        ]);

        Admin::factory()->create([
            'firstname'=>'admin',
            'lastname' => 'ladmin',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr( fake()->phoneNumber(),10),
            'email' => 'adminhd@gmail.com',
            'password' => Hash::make('adminhd@@'),
        ]);

        Editor::factory()->create([
            'firstname'=>'editor',
            'lastname' => 'leditor',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr( fake()->phoneNumber(),10),
            'email' => 'editorhd@gmail.com',
            'password' => Hash::make('editorhd@@'),
        ]);

        User::factory()->times(50)->create();

    }
}
