<?php

/**
 * Plugin Name: Time Block
 */

/**
 * Include the autoloader
 */
add_action('plugins_loaded', function () {
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        include __DIR__ . '/vendor/autoload.php';
    }
});

/**
 * Initialize plugin
 */
add_action('init', 'time_block', 1);

/**
 * Static accessor for plugin container
 *
 * @return array
 */
function time_block()
{
    time_block_register_asset('time-block-converter', ['jquery']);
    time_block_register_asset('time-block-block');
    register_block_type('josh/time-block', array(
        'editor_script' => 'time-block-block',
    ));
}

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('time-block-converter');
});

/**
 * Register an asset
 **
 * @since 0.0.1
 * @param string $handle
 */
function time_block_register_asset($handle, $additional_depencies = [])
{
    $_handle = str_replace('time-block-', '', $handle);
    if (file_exists(__DIR__ . "/build/$_handle.asset.php")) {
        // automatically load dependencies and version
        $assets = include __DIR__ . "/build/$_handle.asset.php";
        wp_register_script(
            $handle,
            plugins_url("/build/$_handle.js", __FILE__),
            array_merge($assets['dependencies'], $additional_depencies),
            $assets['version']
        );
    }
}
