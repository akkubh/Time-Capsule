# Time Capsule
“A message from the past you… for the future you.”

# ⏳ TimeCapsuleYou

**"Make Anything, But Make It You" – Time travel through your thoughts.**

TimeCapsuleYou is a personalized digital time capsule that lets users write messages, memories, or hopes for the future and have them unlocked on a future date. Built with Python and SQL, this project combines nostalgia, self-reflection, and a touch of AI to create an emotionally resonant, human-like experience.

---

## 🧠 Inspiration

Built under the hackathon theme** “Make Anything, But Make It You”**, this project reflects personal memories, emotions, and moments — turning tech into a mirror of your unique self.

---

## 🌟 Features

- 📝 Write a message or record an audio to your future self
- 📅 Choose a date when the message will be unlocked
- 🔐 Messages are encrypted and stored securely
- 📧 Email notifications or web unlock on the chosen date

---

## 🧰 Tech Stack

| Layer         | Tech Used                          |
|---------------|------------------------------------|
| **Frontend**  | HTML, CSS, Bootstrap/Tailwind, JS  |
| **Backend**   | Python, Flask                      |
| **Database**  | SQLite (for demo), PostgreSQL (optional) |
| **AI (Optional)** | OpenAI GPT-4 API for reflections |
| **Voice** (Optional) | gTTS, Whisper, or ElevenLabs |
| **Scheduler** | APScheduler / Cron jobs            |
| **Deployment**| Render / Railway / Heroku          |

---

## 📁 Project Structure

| File/Folder             | Description                                              |
|-------------------------|----------------------------------------------------------|
| `app.py`                | Main Flask app with routes and server logic              |
| `config.py`             | Configuration and DB URI                                 |
| `requirements.txt`      | List of dependencies                                     |
| `README.md`             | You're here! Project overview and setup                  |
| `templates/`            | HTML templates (home, submit, unlock pages)              |
| `static/`               | CSS, images, and JavaScript assets                       |
| `database/`             | DB files and schema                                      |
| `utils/`                | Helper functions and DB utilities                        |

---

## 🧪 Sample Use Case
1. User visits the site and writes a heartfelt message to themselves.
2. Picks a future date – say, 1 year from now.
3. Message is saved securely in the database.
4. On that future date:

4.1 The message is unlocked
   
4.2 An optional AI summary appears: “1 year ago, you were hopeful about…”

4.3 It can be read out loud using text-to-speech

4.4 The user receives an email with their original message

---

## 💡 Future Scope
1. ✉️ Add email notifications for capsule opening

2. ☁️ Integrate cloud storage (e.g., Firebase, AWS S3)

3. 📱 Create a mobile-friendly PWA

4. 🧬 Use AI to generate letters/messages based on mood

---
