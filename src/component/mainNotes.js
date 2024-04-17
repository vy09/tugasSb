export const insertNotes = (data) => {
  showLoadingSpinner();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("https://notes-api.dicoding.dev/v2/notes", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to insert notes");
      }
      const notesGrid = document.querySelector("notes-grid");
      if (notesGrid) {
        notesGrid.loadNotes();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((error) => {
      showResponseMessage(error.message);
    });
};

export const removeNote = (noteId) => {
  showLoadingSpinner();
  const options = {
    method: "DELETE",
  };
  fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to remove note");
      }
      const notesGrid = document.querySelector("notes-grid");
      if (notesGrid) {
        notesGrid.loadNotes();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((error) => {
      showResponseMessage(error.message);
    });
};

const showResponseMessage = (message = "Check your internet connection") => {
  alert(message);
};

const showLoadingSpinner = () => {
  document.getElementById("loadingSpinner").style.display = "block";
};
