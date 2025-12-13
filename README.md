<p align="center">
  <a href="https://gofile.io/">
    <img alt="Gofile.io Logo" src="assets/gofile-logo.png" height="auto" width="200" style="border-radius:20%">
  </a>
</p>

# 📦 action-upload-gofile

<p align="center">
   The ultimate <b>Gofile Upload</b> GitHub Action. Easily upload files to Gofile.io using this <b>uploader</b>.
</p>

<div align="center">
  <a href="https://github.com/ahnafnafee/action-upload-gofile/actions/workflows/main.yml">
		<img src="https://img.shields.io/github/actions/workflow/status/ahnafnafee/action-upload-gofile/main.yml?branch=main&logo=github&style=for-the-badge"/>
	</a>
</div>

<div align="center">
  <a href="https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on">
		<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"/>
	</a>
  <a href="https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on">
		<img src="https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0"/>
	</a>
  <a href="https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on">
		<img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white"/>
	</a>
</div>

<br />

## 📝 Description

This action serves as a robust **Gofile Uploader** for your CI/CD pipelines. If you need to **upload to Gofile** automatically, this **Gofile API upload example** demonstrates how to integrate file sharing seamlessly into your workflow.

## 📥 Inputs

| Name    | Type   | Description                        |
| ------- | ------ | ---------------------------------- |
| `token` | String | Gofile API access token [optional] |
| `file`  | File   | File to upload on Gofile           |

## 📤 Outputs

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `url`    | String | Generated URL     |
| `qrcode` | String | Generated QR Code |

## 🔐 Environment Variables

The following are _required_ as `step.env` keys

| Name           | Description                                |
| -------------- | ------------------------------------------ |
| `GOFILE_TOKEN` | API token generated from Gofile [optional] |

## 🚀 Usage

```yaml
steps:
    - name: Upload File
      id: gofile
      uses: ahnafnafee/action-upload-gofile@v3.0.0
      with:
          token: ${{ secrets.GOFILE_TOKEN }}
          file: ./example.webp

    - name: View URL and QR Code
      run: |
          echo "Gofile URL = ${{ steps.gofile.outputs.url }}" 
          echo "Gofile QR Code = ${{ steps.gofile.outputs.qrcode }}"
```

## 💻 Gofile API Upload File Example

Looking for a **Gofile API upload file example** without GitHub Actions? You can use the underlying logical approach of this action in your own Node.js scripts:

```javascript
const Gofile = require("gofile");
// Or usage with axios example provided previously
```

(Wait, I should keep the code block intact)

```javascript
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

async function uploadToGofile(filePath, token) {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
        "https://upload.gofile.io/uploadfile",
        form,
        {
            headers: {
                ...form.getHeaders(),
                Authorization: "Bearer " + token,
            },
        }
    );

    console.log("Download Page:", response.data.data.downloadPage);
}
```

## 📦 Publishing a New Version

To publish a new version of this Action:

1.  **Update Version**: Bump the version number in `package.json`.
2.  **Build**: Run the build command to update the `dist` folder:
    ```bash
    yarn run all
    ```
3.  **Commit**: Commit the changes, including the updated `dist` folder and `package.json`.
4.  **Tag**: Create a new git tag for the release (e.g., `v2.2.0`) and push it.
5.  **Release**: Create a GitHub Release pointing to the new tag.

**Note**: Ensure the major version tag (e.g., `v2`) is updated to point to the latest release commit so users on `@v2` get the update automatically.

## 👏 Credits

This action extends the wonderful work done by [@rnkdsh](https://github.com/rnkdsh) at [rnkdsh/action-upload-diawi](https://github.com/rnkdsh/action-upload-diawi)

## 🐛 Report Bugs

Report bugs at https://github.com/ahnafnafee/action-upload-gofile/issues.

If you are reporting a bug, please include:

-   Your operating system name and version.
-   Any details about your workflow that might be helpful in troubleshooting.
-   Detailed steps to reproduce the bug.

## 📄 License

-   [MIT © 2022 Ahnaf An Nafee](https://github.com/ahnafnafee/action-upload-gofile/blob/master/LICENSE)
-   [MIT © 2019 Ronak Doshi](https://github.com/rnkdsh/action-upload-diawi/blob/master/LICENSE)

## 💖 Support

If you feel generous and want to show some extra appreciation:

<p><a href="https://ko-fi.com/ahnafnafee"> <img align="left" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="ahnafnafee" /></a></p>
