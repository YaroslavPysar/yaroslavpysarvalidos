# env-inspector

🔍 A simple CLI tool to inspect `.env` files and check for unused or missing environment variables in your JavaScript or TypeScript project.

---

## 📦 Installation

You can install it globally or use with `npx`.

```bash
npm install -g env-inspector
```

Or run directly with:

```bash
npx env-inspector
```

---

## 🚀 Usage

Make sure you have:
- a `.env` file in your project root
- your source files in the `src/` folder

Then run:

```bash
env-inspector
```

You will get an output like:

```
🔍 Inspecting environment variables...
✅ Found 5 variables in .env
📦 Used 4 variables in source files
⚠️ Unused variables in .env: DEBUG
❌ Variables used but not defined in .env: API_SECRET
```

---

## 🧠 What It Does

- Reads and parses your `.env` file.
- Recursively searches through `src/` directory.
- Detects `process.env.VARIABLE_NAME` usages.
- Compares defined and used variables.
- Reports:
  - ✅ All good
  - ⚠️ Defined but unused
  - ❌ Used but not defined

---

## ✅ Example `.env`

```
API_URL=https://api.example.com
TOKEN_SECRET=xyz123
DEBUG=true
```

---

## 👨‍💻 Example Code

```js
console.log(process.env.API_URL);
console.log(process.env.TOKEN_SECRET);
```

---

## 📄 License

MIT

---

> Made with ❤️ by Yaroslav Pysar
