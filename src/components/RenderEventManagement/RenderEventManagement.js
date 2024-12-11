import { Button } from "../Button/Button";
import { FieldForm } from "../FieldForm/FieldForm";

export const RenderEventManagement = ({
  h2TextContent,
  parentElement,
  res,
  handleCreate,
  handleModify,
  handleDelete,
  create = false,
  modifyAndDelete = false
}) => {
  const form = document.createElement("form");
  form.classList.add("event-management__form");

  const h2 = document.createElement("h2");
  h2.classList.add("event-management__title");
  h2.textContent = h2TextContent;
  form.append(h2);

  const divEventImg = document.createElement("div");
  divEventImg.classList.add("event-management__img-container");

  const eventImg = document.createElement("img");
  eventImg.classList.add("event-management__img");
  eventImg.src =
    res?.data?.img ||
    "https://res.cloudinary.com/cloudcloudinary0/image/upload/v1733241914/proyecto-10-devscovery/assets/ukf0bbdstpcgrlf6euzh.webp";

  const fieldsetEventImg = FieldForm({
    fieldFormClass: "event-management__img-fieldform",
    inputType: "file",
    inputClass: "event-management__img-input",
    inputName: "inputEventImg",
    inputRequired: false,
    labelTextContent: "Subir imagen",
    labelClass: "event-management__img-label"
  });

  divEventImg.append(eventImg, fieldsetEventImg);
  form.append(divEventImg);

  const inputEventImg = fieldsetEventImg.querySelector(
    ".event-management__img-input"
  );
  inputEventImg.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        eventImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const title = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--title",
    inputType: "text",
    inputClass: "event-management__input event-management__input--userName",
    inputName: "inputTitle",
    inputPlaceholder: "",
    inputRequired: false,
    labelTextContent: res?.data?.title || "",
    labelClass: "event-management__label profile__label--title"
  });

  const description = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--description",
    inputType: "text",
    inputClass: "event-management__input event-management__input--description",
    inputName: "inputDescription",
    inputRequired: false,
    labelTextContent: res?.data?.description || "",
    labelClass: "event-management__label profile__label--description"
  });

  const date = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--date",
    inputType: "date",
    inputClass: "event-management__input event-management__input--date",
    inputName: "inputDate",
    inputRequired: false,
    inputValue: res?.data?.date.split("T")[0] || "",
    labelClass: "event-management__label profile__label--date"
  });

  const duration = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--duration",
    inputType: "number",
    inputClass: "event-management__input event-management__input--duration",
    inputName: "inputDuration",
    inputRequired: false,
    labelTextContent: res?.data?.duration || "",
    labelClass: "event-management__label profile__label--duration"
  });

  const location = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--location",
    inputType: "text",
    inputClass: "event-management__input event-management__input--location",
    inputName: "inputLocation",
    inputRequired: false,
    labelTextContent: res?.data?.location || "",
    labelClass: "event-management__label profile__label--location"
  });

  const isVirtual = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--isVirtual",
    inputType: "checkbox",
    inputClass: "event-management__input event-management__input--isVirtual",
    inputName: "inputIsVirtual",
    inputRequired: false,
    labelClass: "event-management__label profile__label--isVirtual"
  });

  const virtualLink = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--virtualLink",
    inputType: "text",
    inputClass: "event-management__input event-management__input--virtualLink",
    inputName: "inputVirtualLink",
    inputRequired: false,
    labelTextContent: res?.data?.virtualLink || "",
    labelClass: "event-management__label profile__label--virtualLink"
  });

  const organizer = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--organizer",
    inputType: "text",
    inputClass: "event-management__input event-management__input--organizer",
    inputName: "inputOrganizer",
    inputRequired: false,
    labelTextContent: res?.data?.organizer || "",
    labelClass: "event-management__label profile__label--organizer"
  });

  const maxAttendees = FieldForm({
    fieldFormClass:
      "event-management__fieldset event-management__fieldset--maxAttendees",
    inputType: "number",
    inputClass: "event-management__input event-management__input--maxAttendees",
    inputName: "inputMaxAttendees",
    inputRequired: false,
    labelTextContent: res?.data?.maxAttendees || "",
    labelClass: "event-management__label profile__label--maxAttendees"
  });

  const fieldsetGroupData = [
    {
      legendText: "Título:",
      fieldset: title
    },
    {
      legendText: "Descripción:",
      fieldset: description
    },
    {
      legendText: "Fecha:",
      fieldset: date
    },
    {
      legendText: "Duración:",
      fieldset: duration
    },
    {
      legendText: "Ubicación:",
      fieldset: location
    },
    {
      legendText: "Virtual:",
      fieldset: isVirtual
    },
    {
      legendText: "Virtual link:",
      fieldset: virtualLink
    },
    {
      legendText: "Organizado por:",
      fieldset: organizer
    },
    {
      legendText: "Asistencia máxima:",
      fieldset: maxAttendees
    }
  ];

  fieldsetGroupData.forEach(({ legendText, fieldset }) => {
    const fieldsetGroup = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = legendText;

    fieldsetGroup.classList.add("event-management__fieldset-group");
    legend.classList.add("event-management__legend-fieldset-group");

    fieldsetGroup.append(legend, fieldset);
    form.append(fieldsetGroup);
  });

  if (create) {
    const createButton = Button({
      type: "submit",
      textContent: "Crear evento",
      className: "event-management__button-create"
    });
    form.addEventListener("submit", handleCreate);
    form.append(createButton);
  }

  if (modifyAndDelete) {
    const divButtons = document.createElement("div");

    const modifyButton = Button({
      type: "submit",
      textContent: "Modificar",
      className: "event-management__button event-management__button-modify"
    });
    const deleteButton = Button({
      textContent: "Eliminar",
      className: "event-management__button event-management__button-delete"
    });

    form.addEventListener("submit", handleModify);
    deleteButton.addEventListener("click", handleDelete);

    divButtons.classList.add("event-management__buttons-group");
    divButtons.append(modifyButton, deleteButton);

    form.append(divButtons);
  }

  parentElement.append(form);
};
