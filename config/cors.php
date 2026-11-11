<?php

return [

    'paths' => ['*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],

    'allowed_origins_patterns' => [
        '#^http://localhost:[0-9]+$#',
        '#^http://127\.0\.0\.1:[0-9]+$#',
    ],

    'allowed_headers' => ['*'],

    // Specify any headers that you want to expose to the frontend
    'exposed_headers' => [],

    // The maximum age (in seconds) that the results of a preflight request
    // can be cached. Set to 0 to disable caching.
    'max_age' => 0,

    // Indicates whether the browser should include credentials (like cookies)
    // with requests. Set to true if your frontend and backend use cookies for authentication.
    'supports_credentials' => true,

];
