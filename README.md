# Form generator library
## What is this ?

A simple library for dynamically generating forms from a JSON object.

## Why was it created?

To be able to easily create a dynamically validated form.

## Possible configuration items

Form generator object initialization:

##### The form is not validable:
##
```javascript
<script src="dist/FormGenerator.js.gz" type="text/javascript"></script>

<form id="form-register" class="form" ></form>
<script type="text/javascript">
const schemeRegistrationForm = [
    {
      id: "fr-email",
      type: "email",
      name: "email",
      label: "Adres e-mail",
      autofocus: true,
    },
    {
      type: "submit",
      label: "Zarejestruj",
    },
];

// Initialization method.
const formRegistrationGenerator = FormGenerator.initialize(
    "form-register",
    schemeRegistrationForm
);

// Form building method.
formRegistrationGenerator.handleBulidDynamicForm();

// Method fired when the form is built.
formRegistrationGenerator.handleOnLoadForm((form) => {
    console.log('form loaded');
});

// Method fired after calling the save form.
formRegistrationGenerator.handleOnSubmitForm((form, params) => {
    console.log("submit form", form, params);
});
</script>
```
##### Validable form:
##
```javascript
<script src="dist/FormGenerator.js.gz" type="text/javascript"></script>
<script src="dist/FormValidator.js.gz" type="text/javascript"></script>

<form id="form-register" class="form" data-validate></form>
<script type="text/javascript">
// Initialize the validation library.
FormValidator.initialize();

const schemeRegistrationForm = [
    {
      id: "fr-email",
      type: "email",
      name: "email",
      label: "Adres e-mail",
      required: true,
      autofocus: true,
    },
    {
      type: "submit",
      label: "Zarejestruj",
    },
];

// Initialization method.
const formRegistrationGenerator = FormGenerator.initialize(
    "form-register",
    schemeRegistrationForm
);

// Form building method.
formRegistrationGenerator.handleBulidDynamicForm();
// Method fired when the form is built.
formRegistrationGenerator.handleOnLoadForm((form) => {
    console.log('form loaded');
});

// Method fired after calling the save form.
formRegistrationGenerator.handleOnSubmitForm((form, params) => {
    console.log("submit form", form, params);
});
</script>
```
