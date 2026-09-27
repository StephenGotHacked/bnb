# 🌿 Bingo Ni Busseng

A simple and interactive **Office Bingo** web game created for fun, training, and surviving the shift one tile at a time.

## 🎯 About

**Bingo Ni Busseng** is a browser-based 5×5 bingo game inspired by office life, customer service training, Cigna Healthcare terminology, workplace moments, and inside jokes from the training environment.

Players watch for randomly selected events and mark the matching tile on their Bingo card. Complete a full horizontal, vertical, or diagonal line to get Bingo.

## ✨ Features

- 🌿 Nature-inspired green interface
- 🎯 5×5 Bingo card
- 🌱 Center FREE SPACE
- 🎲 Randomized Bingo card every game
- ⏱️ Automatic event rotation every **5 seconds**
- 📊 Live countdown and timer progress bar
- 📝 Message history
- 👁️ Hoverable message descriptions
- ☑️ Interactive Bingo tiles
- 🎉 Horizontal, vertical, and diagonal Bingo detection
- 🔄 Play Again functionality
- 👤 Player name input
- 📱 Responsive layout
- 💻 Runs entirely in the browser
- 🚀 Suitable for static hosting such as GitHub Pages

## 🕹️ How to Play

1. Enter your name.
2. Click **START GAME**.
3. Watch the current event displayed in the center.
4. If the event matches a tile on your Bingo card, mark that tile.
5. The game automatically moves to another event after 5 seconds.
6. Use the message history to review events that have already appeared.
7. Complete a full:
   - Horizontal line
   - Vertical line
   - Diagonal line
8. Click **BINGO!** when you complete a line.
9. Enjoy your victory and play again. 🌿

## 🧩 Current Game Events

The game currently contains **24 events**.

### 🌱 Training / Workplace Events

| Tile | Message |
|---|---|
| Opening Spiel | "Hi, thank you for calling Cigna Healthcare. How may I help you?" |
| Busseng | Bio Break Madam (BBM) |
| Julian | October 2, 2026 |
| Alex | Sleepwell |
| Faiz | Habibi |
| Riza | OG R__ |
| Verendale | AMAZINGGGG!!! |
| Jan | .... |
| Jay | Girling Pie |
| Kean | Scammer |
| Rex | Mga 8080 |

### 📚 Cigna / Benefits / Tools

| Tile | Message |
|---|---|
| In-Network Benefits | Based on medical necessity and contracted rates |
| Out-Network Benefits | Based on medical necessity and maximum reimbursable charge |
| MRC2 | Based on medicare rate |
| Work Assist | Tool for transcript and summarize the call |
| ViPr | Tool for navigating CPT, Diagnosis, HCPCS code |
| CED | Tool for navigating the Eligibility of the member |
| CPF | Tool for navigating the participation of the provider |
| PTrack | Tool for third party as Payers |
| TPA Excel file | Tool for third party as Alliances |
| PXDX List | Tool for verifying the corresponding CPT code that matches the Diagnosis code |
| Choice Funds | Has additional funds designed to pick up customer responsibility |
| Accumulators | The amount is subject to change |
| Closing Spiel | "It's my pleasure to help you with your concern..." |

## 🧠 Game Logic

The Bingo card contains all **24 events** plus one center **FREE SPACE**, resulting in a 5×5 card.

The center tile is automatically considered checked.

A Bingo is detected when all five tiles in any of these lines are checked:

- Any horizontal row
- Any vertical column
- Main diagonal
- Reverse diagonal

## ⏱️ Event Timer

Each event stays active for **5 seconds**.

The timer includes:

- A numerical countdown
- A visual progress bar
- Automatic event switching
- Automatic stopping when Bingo is detected

Once an event appears, its corresponding tile becomes available for the player to mark.

## 🛠️ Built With

- **HTML5** — Page structure
- **CSS3** — Interface, layout, animations, and responsive design
- **Vanilla JavaScript** — Game logic, timer, randomization, history, and Bingo detection
- **GitHub Pages** — Static website hosting

No frameworks, backend, or database are required.

## 📁 Project Structure

```text
bnb/
├── images/
│   ├── opening.jpe
│   ├── paul.png
│   ├── motik.png
│   ├── tigas.png
│   ├── habibi.png
│   ├── ogriz.png
│   ├── amazing.png
│   ├── jan.png
│   ├── jay.png
│   ├── kean.png
│   ├── rex.png
│   ├── disclaimer.jpg
│   ├── tools.jpg
│   └── che.jpg
├── index.html
├── script.js
├── style.css
└── README.md
```

## 🖼️ Image Usage

The JavaScript currently references the following image assets:

```text
images/opening.jpe
images/paul.png
images/motik.png
images/tigas.png
images/habibi.png
images/ogriz.png
images/amazing.png
images/jan.png
images/jay.png
images/kean.png
images/rex.png
images/disclaimer.jpg
images/tools.jpg
images/che.jpg
```

Several events intentionally share the same image, such as the Cigna/benefits events using `disclaimer.jpg` and the tool-related events using `tools.jpg`.

## 🌐 Repository

Source code:

**https://github.com/StephenGotHacked/bnb**

## 👨‍💻 Creator

Created by **Stephen Condino**.

Trainer displayed in the game:

**Ms. Cherry Lang Sakalam**

## 📜 License

This is a personal/fun office training project.

The project is intended for personal and non-commercial use. Content, names, images, and references included in the game may be specific to the creator's training environment.

---

🌱 **Bingo Ni Busseng**

*Stay alert. Stay green. Get Bingo.*
