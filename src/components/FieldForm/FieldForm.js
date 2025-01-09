export const FieldForm = ({
  fieldFormClass,
  inputType,
  inputClass,
  inputName,
  inputPlaceholder,
  inputRequired = true,
  inputValue,
  inputMaxLength,
  inputMinLength,
  inputAutocomplete,
  labelTextContent,
  labelClass
}) => {
  const fieldForm = document.createElement("fieldset");
  const input = document.createElement("input");
  const label = document.createElement("label");

  if (fieldFormClass) {
    fieldFormClass.split(" ").forEach((c) => {
      fieldForm.classList.add(c);
    });
  }

  input.type = inputType;
  if (inputType === "checkbox") input.checked = true;
  input.name = inputName;
  input.id = inputName;
  if (inputClass) {
    inputClass.split(" ").forEach((c) => {
      input.classList.add(c);
    });
  }
  if (inputPlaceholder) input.placeholder = inputPlaceholder;
  input.required = inputRequired;

  if (inputValue) input.value = inputValue;

  if (inputMaxLength) input.setAttribute("maxlength", inputMaxLength);
  if (inputMinLength) input.setAttribute("minlength", inputMinLength);

  if (inputAutocomplete) input.setAttribute("autocomplete", inputAutocomplete);

  label.textContent = labelTextContent;
  if (labelClass) {
    labelClass.split(" ").forEach((c) => {
      label.classList.add(c);
    });
  }
  label.setAttribute("for", inputName);

  fieldForm.append(input, label);
  return fieldForm;
};
