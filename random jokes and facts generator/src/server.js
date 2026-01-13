import ExpressError from "./utils/ExpressError.js";
import express from "express";
import wrapAsync from "./utils/wrapAsync.js";
import path from "path";
import { fileURLToPath } from "url";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", "../src/views");
app.use(express.static(path.join(__dirname, "public")));

app.get("/",wrapAsync(async(req,res)=>{
    res.render("index.ejs")
}))

app.use((err, req, res, next) => {
	let { statusCode = 500, message = " something went wrong" } = err;
	console.log(err);

	res.status(statusCode).render("error.ejs", { message });
});

app.all("/*wildcard", (req, res, next) => {
	next(new ExpressError(404, "Page Not Found!"));
});

app.listen(8080, () => {
	console.log("server is working on port 8080");
	console.log("http://localhost:8080/");
});