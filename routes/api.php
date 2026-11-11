<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\AdminEditorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', function (Request $request) {

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Email or password wrong'
        ], 401);
    }

    $token = $user->createToken('token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
        'role' => $user->role
    ]);
});

Route::middleware(['auth:sanctum', 'ability:user,index-category'])->prefix('user')->group(static function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/comments', CommentsController::class);
    Route::get('category', [CategoryController::class, 'index'])->name('category.index');
    Route::get('product',[ProductController::class,'index']);
    Route::apiResource('video', VideoController::class);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}/remove', [UserController::class, 'remove']);
    Route::post('/report',[ReportController::class,'store']);
    Route::apiResource('/order',OrderController::class);
    Route::post('/addupdateimage',[UserController::class,'AddAndUpdateImage']);
});


Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(function () {
Route::get('/', function (Request $request) {
        return $request->user();
    });

    Route::apiResources([
        'editor' => AdminEditorController::class,
        'product'=>ProductController::class,
        'users'=>UserController::class,
    ]);

    Route::get('/allreports', [ReportController::class, 'index']);
    Route::get('/countorders', [OrderController::class, 'countorders']);
    Route::put('/updatereportstatus',[ReportController::class,'updateStatus']);


} );


Route::middleware(['auth:sanctum','ability:editor'])->prefix('editor')->group(static function(){
    Route::apiResources([
        'product'=>ProductController::class,
        'category'=>CategoryController::class,

    ]);
    Route::get('/search/categories', [SearchController::class, 'searchCategories']);
    Route::put('/product/{product}', [ProductController::class, 'update']);
    Route::get('/countorders', [OrderController::class, 'countorders']);
    Route::get('/user',[UserController::class,'index']);
    Route::put('/updatereportstatus',[ReportController::class,'upadatestatus']);

    Route::prefix('product')->group(function () {
        Route::apiResource('video', VideoController::class);
    });
    Route::get('/allreports', [ReportController::class, 'index']);


    Route::get('/', function (Request $request) {
        return $request->user();
});
} );

Route::get('/allproduct',[ProductController::class,'index']);
Route::post('/signup', [SignupController::class, 'store']);



require __DIR__.'/auth.php';
