const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js"); 
const methodoverride = require("method-override")
const ejsmate = require("ejs-mate")

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected successfully");
}

main().catch((err) => {
  console.log(err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); 
app.use(methodoverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname,"/public")))

app.get("/", (req, res) => {
  res.send("hi I am root and this is my page");
});

//index route
app.get("/listings", async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//create route
app.post("/listings", async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).send("Error creating listing");
  }
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params; 
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params; 
  const listing = await Listing.findById(id); 
});

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body);
  res.redirect("/listings");
});

//delete route
app.delete("/listings/:id", async (req, res)=> {
    let {id} = req.params;
    console.log(id)
    const deletedpost = await Listing.findByIdAndDelete(id);
    console.log(deletedpost)
    res.redirect("/listings")
});



app.listen(8000, () => {
  console.log("server started");
});

// app.get("/testListing", async (req, res) => {
// try {
// let sampleListing = new Listing({
// title: "My villa",
// description: "This is the villa which I own",
// image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", // Ensure this is a string
// price: 234,
// location: "bijni",
// country: "India"
// });
//
// await sampleListing.save();
// console.log("listing is saved");
// res.send("saved");
// } catch (error) {
// console.log(error);
// res.status(500).send("Error saving listing");
// }
// });
