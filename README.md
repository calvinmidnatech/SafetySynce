# SafetySync Data Viewer

This project is a simple web application for visualizing JSON data using Firebase Storage and Chart.js. The code was generated with OpenAI Codex.

## Features

- Fetches a JSON file from Firebase Storage (with a local fallback).
- Visualizes the data as a bar chart using Chart.js.
- Lightweight setup for quick loading times.

## Getting Started

1. Update `src/main.js` with your Firebase configuration and the path to your JSON data file in Firebase Storage.
2. Host the `src` folder on any static server (e.g., GitHub Pages, Firebase Hosting) or open `index.html` directly in the browser.

The provided sample JSON in `data/sample.json` is used if Firebase is not configured.

## Reference

This project is inspired by the SafetySync viewer at [midnatech](https://midnatech.com/newSafetySync?database=border_states_1).
