import express from "express";
import path from "path";
import * as dictionaryService from "./dictionaryAPI.mjs";
const app=express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.set("views", path.join(process.cwd(), "template", "views"));
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
  res.render("index", {definition: "", word: "", note: "Please enter something."});
})

app.post("/submit", async (req, res) => {
  const word = req.body.key;
  try {
    const definition = await dictionaryService.getWordDefinition(word);
    if(!word.includes(' '))
    res.render("index", { word, definition });
    else
    res.render("index", {
      definition: "",
      word: "",
      note: "A word can't have spaces.",
    });
  } catch (error) {
    res.render("index", {
      definition: "",
      word: "",
      note: "Word was not found.",
    });
  }
});


app.listen(port, ()=>{
  console.log(`Server has been started in port ${port}`);
})