import notesData from "../data/notesData";

class SearchNotes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.renderSearch();
    this.searchListener();
    this.style();
  }

  renderSearch() {
    const search = document.createElement("div");
    search.innerHTML = `
            <input 
            type="text" 
            id="searchId" 
            placeholder="Search Notes"
            />
        `;

    this.shadowRoot.appendChild(search);
  }

  searchListener() {
    const searchInput = this.shadowRoot.getElementById("searchId");

    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const notesContainer = document
        .querySelector("notes-grid")
        .shadowRoot.getElementById("notes-container");

      notesContainer.innerHTML = "";
      notesData.forEach((notes) => {
        if (
          notes.title.toLowerCase().includes(searchTerm) ||
          notes.body.toLowerCase().includes(searchTerm)
        ) {
          const notesElement = document.createElement("div");
          notesElement.classList.add("note-content");
          notesElement.innerHTML = `
                        <h2>${notes.title}</h2>
                        <p>${notes.body}</p>
                        <p>Created at: ${notes.createdAt}</p>
                        <p>Archived: ${notes.archived}</p> 
                    `;
          notesContainer.appendChild(notesElement);
        }
      });
    });
  }

  style() {
    const style = document.createElement("style");
    style.textContent = `
            #searchId {
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 8px;
                margin-bottom: 10px;
                padding: 10px;
                border: 8px;
                float: right;
                color: #0000;
                width: 100%;
                height: 34px;
                float: none;
                padding-right: 70px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                margin-top: 35px;
            }

            #searchInput:focus {
                border: 8px;
                padding: 7px;
                color: #0000;
                height: 34px;    
            }
        `;

    this.shadowRoot.appendChild(style);
  }
}

customElements.define("search-notes", SearchNotes);
