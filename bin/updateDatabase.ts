#!/usr/bin/env node

"use strict";
const Scraper = require("images-scraper");

const fs = require("fs");
const path = require("path");
const jsonConcat = require('json-concat');

const google = new Scraper({
    puppeteer: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        headless: true,
    },
    tbs: {isz: "m"},
});
const queryValues = [
    "Tafel",
    "Harry Potter",
    "Handy",
    "Black Widow",
    "Stift",
    "Kartenspiel",
    "Pickel",
    "Fuß",
    "Finger",
    "Fußball",
    "Avengers",
    "Corona",
    "Hamburg",
    "Baum"
];

interface Item {
    query: string, items: [url: string, source: string, title: string]
}

const terms: Array<Item> = [];

async function initialize() {
    for (const query of queryValues) {
        if (
            !fs.existsSync(path.join(__dirname, "../terms/" + query + ".json"))
        ) {
            const response = await google.scrape(query, 20);

            fs.mkdir(
                path.join(__dirname, "../terms"),
                {recursive: true},
                (err: any) => {
                    fs.writeFile(
                        path.join(__dirname, "../terms/" + query + ".json"),
                        JSON.stringify(response, null, 2),
                        (err: any) => {
                            if (err) {
                                console.error("Error writing", err);
                            } else {
                                console.log("Successfully created " + query);
                            }
                        }
                    );
                    terms.push({query: query, items: response})
                }
            );

        } else {

            const buffer = fs.readFileSync(
                path.join(__dirname, "../terms/" + query + ".json"),
            );
            const message = JSON.parse(buffer.toString());
            terms.push({query: query, items: message});

        }
    }
}
initialize().then(
    fs.mkdir(
        path.join(__dirname, "../src/data"),
        {recursive: true},
        (err: any) => {
            fs.writeFile(
                path.join(__dirname, "../src/data/result.json"),
                JSON.stringify(terms, null, 2),
                (err: any) => {
                    if (err) {
                        console.error("Error writing", err);
                    } else {
                        console.log("Successfully created file");
                    }
                }
            );
        }
    )
);


