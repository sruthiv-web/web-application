

//loginpage
const loginForm=document.getElementById("loginForm");
if(loginForm){
const message=document.getElementById("message");
loginForm.addEventListener("submit",async function(event){
    event.preventDefault();
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value.trim();
    message.textContent="";
    try{
        response=await fetch("/api/login",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                email:email,
                password:password
            })

        });
        const data=await response.json();
        if(response.ok){
            message.textContent=data.message;
            message.style.color="blue";
            window.location.href="/user";
        }
        else{
            message.textContent=data.message;
            message.style.color="red";
        }
    }
    catch(error){
        console.error(error);
        message.textContent="something went wrong.please try again";
    }
});
}

//signup page
 const signupForm=document.getElementById("signupForm");
 if(signupForm){
    signupForm.addEventListener("submit",async function(event){
        event.preventDefault();
        const name=document.getElementById("name").value.trim();
        const email=document.getElementById("email").value.trim();
        const password=document.getElementById("password").value.trim();
        const confirmPassword=document.getElementById("confirmPassword").value;
        const message=document.getElementById("message");
        message.textContent="";
        if(password !== confirmPassword){
            message.textContent="passwords do not match";
            return;
        }
        try{
            const response=await fetch("/api/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    password:password
                })
            });
            const data=await response.json();
            if(response.ok){
                message.textContent=data.message;
                message.style.color="blue";
                document.getElementById("signupForm").reset();
            }
            else{
                message.textContent=data.message;
                message.style.color="red";
            }
        }
        catch(error){
            console.error(error);
            message.textContent="something went wrong.please try again";
        }
    });
 }



 // Admin login

const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
       
        const email = document.getElementById("adminEmail").value.trim();
        const password = document.getElementById("adminPassword").value;
        const message = document.getElementById("message");
        message.textContent = "";
        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            if (response.ok) {
                message.textContent = data.message;
                message.style.color="blue";
                window.location.href = "/admin/dashboard";
            } else {
                message.textContent = data.message;
                message.style.color="red";
            }

        } catch (error) {
            console.error(error);
            message.textContent =
                "Something went wrong. Please try again";

        }

    });

}

window.addEventListener("pageshow", function () {

    const adminLoginForm = document.getElementById("adminLoginForm");

    if (adminLoginForm) {
        adminLoginForm.reset();
    }

});

// Load users in admin dashboard

const usersTableBody = document.getElementById("usersTableBody");
let allUsers=[];
if (usersTableBody) {

    async function loadUsers() {

        try {

            const response = await fetch("/api/admin/users");

            const data = await response.json();

            if (!response.ok) {
                usersTableBody.innerHTML = `
                    <tr>
                        <td colspan="3">${data.message}</td>
                    </tr>
                `;
                return;
            }
              allUsers=data.users;
              // Total users
             document.getElementById("totalUsers").textContent = allUsers.length;

             // New registrations today
          const today = new Date().toDateString();

         const newUsers = allUsers.filter(user =>
         new Date(user.createdAt).toDateString() === today
        );

         document.getElementById("newRegistrations").textContent = newUsers.length;
            usersTableBody.innerHTML = "";

            data.users.forEach(user => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                    <td><button class="editUserBtn" data-id="${user._id}">
                    Edit
                    </button>
                    <button class="deleteUserBtn" data-id="${user._id}">Delete</button>
                    </td>
                `;

                usersTableBody.appendChild(row);

            });

        } catch (error) {

            console.error(error);

            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="3">Failed to load users</td>
                </tr>
            `;
        }
    }

    loadUsers();
}


const userSearch = document.getElementById("userSearch");

if (userSearch) {

    userSearch.addEventListener("input", function () {

        const searchText = userSearch.value.toLowerCase().trim();

        const filteredUsers = allUsers.filter(user =>
            user.name.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText)
        );

        usersTableBody.innerHTML = "";

        filteredUsers.forEach(user => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td><button class="editUserBtn" data-id="${user._id}">Edit</button>
                <button class="deleteUserBtn" data-id="${user._id}">Delete</button>
                </td>
            `;

            usersTableBody.appendChild(row);

        });

    });

}
const addUserBtn = document.getElementById("addUserBtn");

if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
        window.location.href = "/admin/add-user";
    });
}

//Add user form
const addUserForm = document.getElementById("addUserForm");

if (addUserForm) {

    addUserForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("message");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match";
            message.style.color="red";
            return;
        }

        try {

            const response = await fetch("/api/admin/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {

                message.textContent = data.message;
                message.style.color="blue";
                addUserForm.reset();

            } else {

                message.textContent = data.message;
                message.style.color="red";
            }

        } catch (error) {

            console.error(error);

            message.textContent = "Something went wrong";
        }

    });

}
const cancelBtn = document.getElementById("cancelBtn");

if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        window.location.href = "/admin/dashboard";
    });
}


document.addEventListener("click", function (event) {

    if (event.target.classList.contains("editUserBtn")) {

        const userId = event.target.dataset.id;

        window.location.href = `/admin/edit-user/${userId}`;
    }

});

//connect update userform
const editUserForm = document.getElementById("editUserForm");

if (editUserForm) {

    editUserForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const userId = document.getElementById("userId").value;
        const name = document.getElementById("editName").value.trim();
        const email = document.getElementById("editEmail").value.trim();
        const message = document.getElementById("message");

        try {

            const response = await fetch(`/api/admin/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email
                })
            });

            const data = await response.json();

            if (response.ok) {

                message.textContent = data.message;
                message.style.color="blue";
                
                setTimeout(() => {
                    window.location.href = "/admin/dashboard";
                }, 800);

            } else {

                message.textContent = data.message;
                message.style.color="red";

            }

        } catch (error) {

            console.error(error);

            message.textContent = "Something went wrong";
        }

    });

}


document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("deleteUserBtn")) {
        return;
    }
    const userId = event.target.dataset.id;
    
    const confirmed = confirm(
        "Are you sure you want to delete this user?"
    );
    
    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(`/api/admin/users/${userId}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            window.location.reload();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong");
    }

});

//admin logout
const adminLogoutBtn = document.getElementById("adminLogoutBtn");

if (adminLogoutBtn) {

    adminLogoutBtn.addEventListener("click", async function () {

        try {

            const response = await fetch("/api/admin/logout", {
                method: "POST"
            });

            const data = await response.json();

            if (response.ok) {
                window.location.replace("/admin/login");
            } else {
                alert(data.message);
            }

        } catch (error) {

            console.error(error);
            alert("Something went wrong");

        }

    });

}

const adminPages = [
    "/admin/dashboard",
    "/admin/add-user"
];

if (
    window.location.pathname.startsWith("/admin/") &&
    window.location.pathname !== "/admin/login"
) {
    window.addEventListener("pageshow", async function () {
        try {
            const response = await fetch("/api/admin/status", {
                cache: "no-store"
            });

            if (!response.ok) {
                window.location.replace("/admin/login");
            }
        } catch (error) {
            console.error(error);
            window.location.replace("/admin/login");
        }
    });
}

// Prevent logged-in user from seeing login page after back button
window.addEventListener("pageshow", async function () {
    if (window.location.pathname === "/") {
        try {
            const response = await fetch("/api/auth/status", {
                cache: "no-store"
            });

            if (response.ok) {
                window.location.replace("/user");
            }
        } catch (error) {
            console.error(error);
        }
    }
});