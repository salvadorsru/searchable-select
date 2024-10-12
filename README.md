# Searchable Select Web Component

A custom web component that transforms a standard `<select>` element into a searchable dropdown. It allows users to filter and search through options in real-time, improving usability, especially for large sets of options. The component is easy to integrate and customizable through CSS.

## [Live Demo](https://searchable-select.vercel.app/)

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


### Basic usage
You can statically define all the elements as follows:

```html
<searchable-select>
    <input aria-label="Search countries" placeholder="Where are you from?">
    <select name="countries" id="countries">
        <option value="1">Argentina</option>
        <option value="2">Brazil</option>
        <option value="3">Canada</option>
        <option value="4">France</option>
        <option value="5">Germany</option>
        <option value="6">Japan</option>
    </select>
</searchable-select>
```
### Dynamic input

If the input does not exist, it will be generated automatically. 
You can also modify the `aria-label` and the `placeholder` of the internal input directly from the custom element.

```html
<searchable-select 
    aria-label="Search countries" 
    placeholder="Where are you from?"
>
    <select name="countries" id="countries">
        <option value="1">Argentina</option>
        <option value="2">Brazil</option>
        <option value="3">Canada</option>
        <option value="4">France</option>
        <option value="5">Germany</option>
        <option value="6">Japan</option>
    </select>
</searchable-select>

```

### Important Considerations

The default styles hide the select element above the input to allow the display of native form validation errors. If you want to show the regular select element as a fallback in case JavaScript is disabled, make sure to add the following code to your page:


```html
<noscript>
    <style type="text/css">
        :root {
            --searchable-select-input-display: none;
            --searchable-select-position: relative;
            --searchable-select-pointer-events: auto;
            --searchable-select-opacity: 1;
        }
    </style>
</noscript>
```

## Custom Styles with CSS variables 

```
--searchable-select-border-color: // #ccc 
--searchable-select-position: // absolute 
--searchable-select-pointer-events: // none 
--searchable-select-opacity: // 0 
--searchable-select-background-color: // #fff 
--searchable-select-option-hover: // #f0f0f0 
```