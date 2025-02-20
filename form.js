import { validateForm } from "../utils/validation.js";

export class Form {
    constructor() {
        this.form = document.createElement("form");
        this.form.innerHTML = `
            <label>Name: <input type="text" id="name"></label>
            <span class="error" id="nameError"></span><br><br>

            <label>Email: <input type="email" id="email"></label>
            <span class="error" id="emailError"></span><br><br>

            <label>Password: <input type="password" id="password"></label>
            <span class="error" id="passwordError"></span><br><br>

            <button type="submit">Register</button>
        `;

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const errors = validateForm(name, email, password);

        document.getElementById("nameError").textContent = errors.name || "";
        document.getElementById("emailError").textContent = errors.email || "";
        document.getElementById("passwordError").textContent = errors.password || "";

        if (!errors.name && !errors.email && !errors.password) {
            alert("Registration successful!");
            localStorage.setItem("user", JSON.stringify({ name, email }));
        }
    }

    render(parent) {
        parent.appendChild(this.form);
    }
}
