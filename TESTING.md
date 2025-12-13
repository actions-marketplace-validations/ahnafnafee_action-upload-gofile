# Testing

This guide describes how to test the `action-upload-gofile` action locally.

## Prerequisites

-   Node.js (v16 or higher recommended for testing the script logic directly)
-   A Gofile API Token (optional, but required for authenticated uploads)
-   A file to upload

## Testing API Logic Directly

You can test the core logic by running a test script that uses the `Gofile` class directly.

1. Create a `test-local.js` file:

    ```javascript
    const Gofile = require("./gofile");

    // Replace with your actual token
    const token = "YOUR_API_TOKEN";

    // Replace with a path to a real file
    const path = "./package.json";

    const gofile = new Gofile({
        token: token,
        path: path,
    });

    gofile.on("complete", (url, qr) => {
        console.log("Upload Complete!");
        console.log("URL:", url);
        console.log("QR Code:", qr);
    });

    gofile.on("error", (err) => {
        console.error("Upload Failed:", err.message);
    });

    gofile.execute();
    ```

2. Run it:
    ```bash
    node test-local.js
    ```

## Testing with `act` (Optional)

If you have [act](https://github.com/nektos/act) installed, you can simulate the GitHub Actions environment.

1. Create a `.secrets` file with your token:

    ```
    GOFILE_TOKEN=your_token_here
    ```

2. Run workflow:
    ```bash
    act -s GOFILE_TOKEN=your_token_here
    ```
