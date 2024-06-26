// import notesData from "../data/notesData.js";
import { insertNotes } from "./mainNotes.js";
import { removeNote } from "./mainNotes.js";

class NotesGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // this.notes = notesData;
  }

  connectedCallback() {
    this.loadNotes()
      .then((response) => {
        if (response.error) {
          this.showErrorMessage(response.error);
        } else {
          this.renderNotes(response.data);
        }
      })
      .catch((error) => {
        this.showErrorMessage(error);
      });
    this.formListen();
  }
  showErrorMessage(error) {
    this.shadowRoot.innerHTML = `<p>${error}</p>`;
  }

  loadNotes() {
    return fetch("https://notes-api.dicoding.dev/v2/notes")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load data from API");
        }
        return response.json();
      })
      .catch(error => {
        throw new Error("Error while requesting data from API");
      });
  }
  

  renderNotes(data) {
    const notesContainer = document.createElement("div");
    notesContainer.id = "notes-container";
    if (data && Array.isArray(data)){
      data.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.innerHTML = `
                  <div class="note-content">
                      <h2>${note.title}</h2>
                      <p>${note.body}</p>
                      <p>Created at: ${note.createdAt}</p>
                      <p>Archived: ${note.archived}</p>
                      <button class="hapus" style="background-color: red " id="${note.id}">Hapus</button>
                  </div>
              `;
             const remove = noteElement.querySelector(".hapus");
             remove.addEventListener("click", () => {
              removeNote(note.id);
            });
        notesContainer.appendChild(noteElement);
      });
    }else {
      console.error("Data is not an array");
    }
    

    const style = document.createElement("style");
    style.textContent = `
        #notes-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
            justify-content: space-between;
        }

        .note-content{
            background-color: #a8cd9f;
            color: #ffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            box-sizing: border-box;
        }
        button{
          border: 0;
          padding: 10px;
          margin: 0 5px 0 0;
          border-radius: 5px;
          cursor: pointer;
          color: white;
        }
        `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(notesContainer);
  }

  formListen() {
    document.addEventListener("newNoteAdded", (event) => {
      const { title, body } = event.detail;
      const data = { title, body };
      insertNotes(data);
    });
  }
}

customElements.define("notes-grid", NotesGrid);
export {NotesGrid};