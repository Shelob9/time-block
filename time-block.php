<?php

/**
 * Plugin Name: Time Block
 */

/**
 * Include the autoloader
 */
add_action( 'plugins_loaded', function (){
    if( file_exists(__DIR__ . '/vendor/autoload.php')){
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
    static $container;
    if (!$container) {
        $container = [];
        /**
         * Action runs when Time Block is initialized
         *
         * @param array $container Plugin container
         */
        do_action('time_block', $container);
    }
    return $container;
}

/** Init admin UI after plugin loads */
add_action( 'time_block', function (){
    //Register assets
    add_action('init', function () {
        time_block_register_asset('time-block-admin');
    });

    //Enqueue admin assets on admin page only
    add_action('admin_enqueue_scripts', function ($hook) {
        if ('toplevel_page_custompage' != $hook) {
            return;
        }
        wp_enqueue_script('time-block-admin');
    });

    //Register menu page
    add_action('admin_menu', function () {
        add_menu_page(
            __('Time Block', 'time-block'),
            __('Time Block', 'time-block'),
            'manage_options',
            'time-block-admin',
            function () {
                wp_enqueue_script('time-block-admin');
                echo '<div id="time-block-admin"></div>';
            }
        );
    });
});



/**
 * Register an asset
 **
 * @since 0.0.1
 * @param string $handle
 */
function time_block_register_asset($handle)
{
    $_handle = str_replace('time-block-', '', $handle );
    if (file_exists(__DIR__ . "/build/$_handle.asset.php")) {
        // automatically load dependencies and version
        $assets = include __DIR__ . "/build/$_handle.asset.php";
        wp_register_script(
            $handle,
            plugins_url("/build/$_handle.js", __FILE__),
            $assets['dependencies'],
            $assets['version']
        );
        wp_enqueue_script($handle);
    }
}


