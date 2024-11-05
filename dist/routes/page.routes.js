"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const pageRouter = (0, express_1.Router)();
let user = [
    {
        username: "admin",
        password: "admin12345",
    },
];
pageRouter.get("/", (req, res) => {
    res.status(200).render("index");
}); // Page routes
pageRouter.get("/login", auth_1.checkLoginAuth, (req, res) => {
    res.status(200).render("login");
});
pageRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    const found = user.find((el) => el.username === username && el.password === password);
    if (found) {
        res.cookie("authToken", "authenticated", {
            maxAge: 30 * 1000,
            httpOnly: true,
            signed: true,
        });
        res.redirect("/profile");
    }
    else {
        res.redirect("/login");
    }
});
pageRouter.get("/profile", auth_1.checkAuth, (req, res) => {
    res.status(200).render("profile");
});
exports.default = pageRouter;
