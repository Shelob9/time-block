# Time Block

See [this tweet](https://twitter.com/Josh412/status/1368225886613471233).

Generated with [wordpress-plugin](https://shelob9.github.io/wordpress-plugin/#basic).

This is a WordPress plugin with the following features:

- A timezone block
  - Give it a time and some timezones.
  - It displays the tiem in all the timezones.
- Time converter.
  - Replaces specific date strings on a site to browser's local time.

## Usage

### Install

- Aquire a ZIP file of the plugin
  - Recommended: [Download the latest version as a ZIP file](https://github.com/Shelob9/time-block/blob/main/time-block.zip?raw=true).
  - Or: [build your own ZIP from sources](#Development).
- Install
  - In wp-admin, click on "Plugins".
  - Click "Add New".
  - Click "Upload Plugin" to reveal a file uploader.
  - Upload plugin and follow on-screen instructions to activate.


### Block

This is a block that displays one time, in multiple timezones.

- In the block editor, insert a "Time Block".
- Set the "Primary Time" in the block sidebar.
- Below that setting, add one or more timezones.

### Converter

This feature replaces times listed on the page with time listed in brower's local time. This feature is in development and a bit of a pain to use.

There is no UI for these settings (yet.) You can enable this features with the `time_block_converter` filter. Return an array with:

- `query` - Required. Query (passed to [`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)) for elements that have time strings in them.
  - For example, if you had `<span class="wpem-event-date-time-text">2021-03-10 at 07:00 PM (GMT)</span>` in your markup, you would use `.wpem-event-date-time-text`
- `seperator` - Optional. Word to remove in timestring.

You would add something like this to your theme's function.php or a plugin.

```php
add_filter('time_block_converter', function () {
    return [
        'seperator' => 'at',
        'query' => '.wpem-event-date-time-text'
    ];
});
```

## Development

- Git clone:
  - `git clone git@github.com:Shelob9/time-block.git`
- Install.
  - `yarn`
- Build JS/CSS
  - `yarn build`
- Start JS/CSS for development
  - `yarn start`
- Test changed files
  - `yarn test --watch`
- Test all files once
  - `yarn test`
  - `yarn test --ci`
- Create an installable Zip file.
  - `yarn zip`

## Local Development

Feel free to supply your own local development environment of choice. [wp-env](https://developer.wordpress.org/block-editor/packages/packages-env/) will work without any configuration, if you have Docker installed:

```bash
npx wp-env start
```

- [http://localhost:8888/](http://localhost:8888/)

## Contributing

Please feel free to [open a pull request](https://github.com/Shelob9/time-block/pulls) if you would like to contribute.
