export const createEventFormData = (e, defaultImg) => {
  const formData = new FormData();

  if (e.target.elements.inputEventImg.files[0]) {
    formData.append("img", e.target.elements.inputEventImg.files[0]);
  } else {
    formData.append("img", defaultImg);
  }

  formData.append("title", e.target.elements.inputTitle.value);
  formData.append("description", e.target.elements.inputDescription.value);
  formData.append("date", e.target.elements.inputDate.value);
  formData.append("duration", e.target.elements.inputDuration.value || 120);
  formData.append("location", e.target.elements.inputLocation.value || "TBD");
  formData.append("isVirtual", e.target.elements.inputIsVirtual.checked);
  formData.append("virtualLink", e.target.elements.inputVirtualLink.value);
  formData.append(
    "organizer",
    e.target.elements.inputOrganizer.value || "Unknown organizer"
  );
  formData.append(
    "maxAttendees",
    e.target.elements.inputMaxAttendees.value || 100
  );

  return formData;
};
