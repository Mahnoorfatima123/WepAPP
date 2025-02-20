import { fetchUsers } from "../services/api.js";

export class UserList {
    constructor() {
        this.button = document.createElement("button");
        this.button.textContent = "Fetch Users";
        this.button.addEventListener("click", () => this.loadUsers());

        this.loading = document.createElement("span");
        this.loading.textContent = "Loading...";
        this.loading.className = "loading";
        this.loading.style.display = "none";

        this.list = document.createElement("ul");
    }

    async loadUsers() {
        this.loading.style.display = "inline";
        try {
            const users = await fetchUsers();
            this.list.innerHTML = users.map(user => `<li>${user.name} - ${user.email}</li>`).join("");
        } catch (error) {
            this.list.innerHTML = "<li>Error fetching users</li>";
        } finally {
            this.loading.style.display = "none";
        }
    }

    render(parent) {
        parent.appendChild(this.button);
        parent.appendChild(this.loading);
        parent.appendChild(this.list);
    }
}

