# Searchable Dropdown Web Component

A custom web component that transforms a standard `<select>` element into a searchable dropdown. It allows users to filter and search through options in real-time, improving usability, especially for large sets of options. The component is easy to integrate and customizable through CSS.

## Features

- **Searchable Options:** Filter options dynamically as the user types in the input field.
- **Customizable Design:** Style the component using the provided CSS classes or your own.
- **Lightweight and Easy to Integrate:** Just include the web component in your HTML and wrap it around a `<select>` element.

## CSS and Component Import

To use the component, ensure you include the CSS from the `dist` folder, as the package only includes the Web Component JavaScript when imported into your project. 

```html
<link rel="stylesheet" href="path/to/dist/style.min.css">
<script type="module" src="path/to/index.min.js"></script>
```

Alternatively, you can import the package directly in your JavaScript/TypeScript files:

```javascript
import '@salvadorsru/searchable-select';
```

> **Note:** Importing the package via JavaScript **does not include the CSS**. You will need to manually include the CSS from the `dist` folder in your project.

## Use example

```html
<searchable-select>
    <input type="text" aria-label="Search countries" placeholder="Where are you from?">
    <select name="countries" id="countries" hidden="hidden">
        <option value="1">Argentina</option>
        <option value="2">Brazil</option>
        <option value="3">Canada</option>
        <option value="4">France</option>
        <option value="5">Germany</option>
        <option value="6">Japan</option>
    </select>
</searchable-select>

```