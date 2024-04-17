import { NotesGrid } from "./notesGrid.js";

export const insertNotes = (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  
    fetch("https://notes-api.dicoding.dev/v2/notes", options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to insert notes");
        }
        const notesGrid = document.querySelector("notes-grid");
        if (notesGrid) {
          notesGrid.loadNotes();
          window.location.reload();
        }
      })
      .catch(error => {
        showResponseMessage(error.message);
      });
  };
  
const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
    window.location.reload();
  };
  