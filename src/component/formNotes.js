class Notes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.renderNotesForm();
    this.formSubmit();
  }
  renderNotesForm() {
    const Notesform = document.createElement("form");
    Notesform.innerHTML = `
            <label for="title">Judul Kegiatan:</label>
            <input type="text" placeholder="Judul kegiatanmu hari ini" id="title" name="title" required minlength="0" maxlength="500">
            <label for="body">Kegiatan:</label>
            <textarea placeholder="isi List Kegiatan" id="body" name="body" rows="4" cols="50" required minlength="0" maxlength="500"></textarea>
            <button type="submit">Tambah Catatan</button>
            <div id="error-message" style="color: red;"></div>
        `;

    const styled = document.createElement("style");
    styled.textContent = `
            #error-message {
                margin-top: 10px;
                font-size: 14px;
            }
            form {
                max-width: 500px;
                margin: 20px auto;
                padding: 20px;
                background-color: #A8CD9F;
                border-radius: 8px;
                border: 0;
                box-shadow: 0 6px 8px rgb(0, 0, 0, 0.1);
            }
            
            label {
                display: block;
                margin-bottom: 5px;
                font-size: 16px;
                color: #fff;
            }
            
            input[type="text"],
            textarea {
                width: 100%;
                padding: 5px;
                padding: 10px 5px;
                margin-bottom: 15px;
                border: none;
                border-radius: 8px;
                background-color: #fff;
                color: #333;
                font-size: 16px;
                border: 0;
            }
            
            textarea {
                resize: vertical;
                min-height: 100px;
                border: 0;
                padding: 5px;
                border-radius: 8px;
            }
            
            button[type="submit"] {
                background-color: #496989;
                color: white;
                border: none;
                border-radius: 8px;
                display: center;
                width: 100%;
                padding: 10px;
                cursor: pointer;
            }
            
            button[type="submit"]:hover {
                background-color: #496989;
            }
            
            @media screen and (max-width: 768px) {
                form {
                    max-width: 90%;
                }
                
                input[type="text"],
                textarea {
                    width: 100%;
                    display: flex;
                    align-items: center;
                }
                
                button[type="submit"] {
                    font-size: 14px;
                    padding: 8px 16px; 
                }
            }
            
            @media screen and (max-width: 480px) {
                input[type="text"],
                textarea {
                    font-size: 14px; 
                }
                
                button[type="submit"] {
                    font-size: 12px; 
                    padding: 6px 12px; 
                }
            }            
            
        `;

    this.shadowRoot.appendChild(styled);
    this.shadowRoot.appendChild(Notesform);
  }

  formSubmit() {
    const form = this.shadowRoot.querySelector("form");
    const errorMessage = this.shadowRoot.getElementById("error-message");
    const titleInput = form.querySelector("#title");
    const bodyInput = form.querySelector("#body");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.checkValidity()) {
        const formData = new FormData(form);
        const title = formData.get("title");
        const body = formData.get("body");
        const eventToAddNote = new CustomEvent("newNoteAdded", {
          detail: { title, body },
        });
        document.dispatchEvent(eventToAddNote);
        form.reset();
        errorMessage.textContent = "";
      } else {
        errorMessage.textContent = "Harap isi kedua bidang dengan benar.";
      }
    });
    titleInput.addEventListener("input", () => {
      if (!titleInput.validity.valid) {
        titleInput.setCustomValidity(
          "Judul harus terdiri dari 0 hingga 10 karakter."
        );
      } else {
        titleInput.setCustomValidity("");
      }
    });

    bodyInput.addEventListener("input", () => {
      if (!bodyInput.validity.valid) {
        bodyInput.setCustomValidity(
          "Isi harus terdiri dari 0 hingga 500 karakter."
        );
      } else {
        bodyInput.setCustomValidity("");
      }
    });
  }
}
customElements.define("notes-form", Notes);
