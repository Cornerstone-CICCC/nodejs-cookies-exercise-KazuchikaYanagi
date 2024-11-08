"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.use((0, cookie_parser_1.default)("secret"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // process form data
// Routes
app.use("/", page_routes_1.default);
// Start server
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
