import "dotenv/config"
import { errorHandler, middleware, supertokens, ensureSuperTokensInit } from "@instapark/auth";
import listingsRouter from "./routes/listings.route";
import { API_ENDPOINTS } from "@instapark/constants";
import { uploadthingExpress } from "./uploadthing/uploadthing-express";
import mongoose from "mongoose";
import express from "express"
import cors from "cors"

/**
 * TODO:
 * 1. Rate limiting
 * 2. VerifySession()
 * 3. GraphQL Integration
 */
async function init() {

    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: [process.env.FRONTEND_URL!],
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders(), "x-uploadthing-package", "x-uploadthing-version"],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    await mongoose.connect("mongodb://localhost:27017/instapark-listings")

    app.get(
        "/",
        (req, res) => {
            res.send("Listings server is up and Running")
        })

    app.use(
        API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.PREFIX,
        listingsRouter);

    app.use(
        API_ENDPOINTS.LISTINGS_SERVER.ROUTES.UPLOADTHING.PREFIX,
        uploadthingExpress);

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();