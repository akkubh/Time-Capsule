function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
  }

  function closePopup(id) {
    document.getElementById(id).style.display = 'none';
  }
  
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');

      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

      if (!isOpen) {
        answer.style.display = 'block';
        btn.classList.add('active');
      }
    });
  });

// SIGNUP

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = getElementById("signupUsername").value;
    const password = getElementById("signupPassword").value;

    try {
      const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({username, password})
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! You can now log in.");
        signupForm.reset();
        closePopup("signupPopup");
        openPopup("LoginPopup");
      }
      else {
        alert(data.error || "Signup Failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error during signup");
    }   
  });
}

//LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    const username = getElementById("loginUsername").value;
    const password = getElementById("loginPassword").value;

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({username, password})
      });

      const data = await res.json();

      if (res.ok) {
        alert("Logged in");
        signupForm.reset();
        closePopup("loginPopup");

        loadCapsule();
      }
      else {
        alert(data.error || "Login Failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error during login");
    }   
  })
}

// LOGOUT
async function logoutUser() {
  try {
    const res = await fetch("/logout", {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();

    if (res.ok) {
      alert("Logged out.");
      location.reload();
    }
    else {
      alert(data.error || "Logout failed");
    }
  } catch (err) {
    console.error(err);
    alert("Network error during logout");
  }
}

const logoutBtn = document.getElementById("logoutButton");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}

// CREATING CAPSULE

const createForm = document.getElementById("createCapsuleForm");
if (createForm) {
  createFormform.addEventListener("submit", async function (e) {
    e.preventDefault();

    const message = document.getElementById("capsuleMessage").value;
    const unlockDate =document.getElementById("capsuleUnlockDate").value;
    const moodSelect = moodSelect.value;
    if (mood == "custom") {
      mood = document.getElementById("customMood").value;
    }
    
    if (!message || !unlockDate || !mood) {
      alert ("Please fill out all fields.");
      return;
    }

     try {
      const res = await fetch("/create_capsule", {
        method: "POST",
        headers: { "content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
          message: message,
          unlockDate: unlockDate,
          mood: modd
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.note || "Capsule saved!");
        createForm.reset();
        loadCapsules();
      }
      else {
        alert(data.error || "Failed to save capsule.");
      }
     } catch (err) {
    console.error(err);
    alert("Network error during capsule creation.");
    }
  });
}

//CUSTOM MOOD INPUT
document.getElementById("capsuleMood").addEventListener("change", function () {
  const customMood = document.getElementById("customMoodContainer");
  if (this.value === "custom") {
    customMood.style.display = "block";
  } else {
    customMood.style.display = "none";
  }
});

//LOAD CAPSULE
async function loadCapsules() {
  try {
    const res = await fetch("/view_capsule", {
      method: "POST",
      credentials: "include"
    });
    const data = await res.json();

    const container = document.getElementById("capsules-container");
    container.innerHTML = "";

    if (!Array.isArray(data)) {
      container.innerHTML = "<p>You must be logged in to view your capsules.</p>";
      return;
    }

    if (data.length === 0) {
      container.innerHTML = "<p>No capsules yet. Create one above!</p>";
      return;
    }

    data.forEach(capsule => {
      const card = document.createElement("div");
      card.className = "capsule-card";

      card.innerHTML = `
        <p><strong>Created:</strong> ${capsule.created_at}</p>
        <p><strong>Status:</strong> ${capsule.unlock_status ? "🔓 Unlocked" : "🔒 Locked"}</p>
        <p><strong>Time Left:</strong> ${capsule.time_left}</p>
        ${capsule.unlock_status ? `<p><strong>Message:</strong> ${capsule.message}</p>` : ""}
        <button onclick="deleteCapsule(${capsule.id})">Delete</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load capsules.");
  }
}

// DELETE CAPSULE
async function deleteCapsule(id) {
  if (!confirm("Are you sure you want to delete this capsule?")) return;

  try {
    const res = await fetch("/delete_capsule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ capsule_id: id })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Capsule deleted.");
      loadCapsules();
    } else {
      alert(data.error || "Failed to delete.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error during delete.");
  }
}

