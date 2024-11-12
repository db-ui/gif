# GIF - Generate Icon Fonts

If you have custom icons and want to use them for [foundations](https://www.npmjs.com/package/@db-ui/foundations) and/or in [components](https://www.npmjs.com/package/@db-ui/components), you need to generate a `woff2` file.

## Generate

For this run:

```shell
npx @db-ui/gif --src ./my-path-to/icons --fontName my-name
```

We search for all `**/*.svg` files inside the `src` directory and create a new icon font with the provided name. You can preview all generated icons here: `./my-path-to/icons/fonts/all/index.html`.

> **_NOTE:_** We use four different sizes for components (16, 20, 24, 32) to show more or less details. You can do the same by providing another file with a size suffix for example "icon_file_name_16.svg".

For more information run:

```shell
npx @db-ui/gif --help
```

## How to use

In your app you need to include some of the generated files:

```html
./my-path-to/icons/fonts/my-name.woff2 ./my-path-to/icons/fonts/font-face.css
```

> **_NOTE:_** In case you put the files in a separate folder of your `public` directory be aware to adopt the path in your generated `font-face.css` file: `url("/{YOUR_FOLDER}}/my-name.woff2?t=1698750286189") format("woff2");`
> > **_NOTE:_** The source files need to provide the following attributes: width, height and viewbox to generate the icon font correctly

Now you can use your icons with your `font-family: my-name`, e.g.:

```html
<!--example.html-->
<i class="my-name">icon_file_name</i>
```

### SCSS

When using `scss` you can also use `@forward` to include the generated files:

```scss
@forward "public/font-face";
```

### data-icon

If you like to use a custom icon in one of our components you can do it by overwriting the default font-family like this:

```html
<!--example.html-->
<p class="icon-family-my-name" data-icon="icon_file_name">Test</p>

<!-- or -->
<p data-icon-family="my-name" data-icon="icon_file_name">Test</p>
```

### CSS

You can overwrite custom-icons for our components with CSS as well:

```css
.db-button {
	--db-icon-font-family: "my-name";
}
```
