import { Request, Response, Router } from "express";
import { checkAuth, checkLoginAuth } from "../middleware/auth";
import { User } from "../types/user";

const pageRouter = Router();

let user: User[] = [
  {
    username: "admin",
    password: "admin12345",
  },
];

pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).render("index");
}); // Page routes

pageRouter.get("/login", checkLoginAuth, (req: Request, res: Response) => {
  res.status(200).render("login");
});

pageRouter.post("/login", (req: Request<{}, {}, User>, res: Response) => {
  const { username, password } = req.body;
  const found = user.find(
    (el) => el.username === username && el.password === password
  );
  if (found) {
    res.cookie("authToken", "authenticated", {
      maxAge: 30 * 1000,
      httpOnly: true,
      signed: true,
    });
    res.redirect("/profile");
  } else {
    res.redirect("/login");
  }
});

pageRouter.get("/profile", checkAuth, (req: Request, res: Response) => {
  res.status(200).render("profile");
});

export default pageRouter;
