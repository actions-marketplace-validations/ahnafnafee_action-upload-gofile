const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const util = require("util");
const EventEmitter = require("events").EventEmitter;

const UPLOAD_URL = "https://upload.gofile.io/uploadfile";
const QR_API = "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=";

const Gofile = function (parameters) {
    if (!parameters) {
        parameters = {};
    }

    this.token = parameters.token ? parameters.token.trim() : null;
    this.path = parameters.path.trim();
    if (!fs.existsSync(this.path)) {
        throw new Error("Could not find file at " + this.path);
    }


    
    // Create the required form fields
    this.formData = new FormData();
    this.formData.append("file", fs.createReadStream(this.path));
    
    // Check for folderId (not currently exposed in action inputs but good for future proofing)
    if (parameters.folderId) {
        this.formData.append("folderId", parameters.folderId);
    }
};

Gofile.prototype.execute = async function () {
    try {
        const config = {
            headers: {
                ...this.formData.getHeaders(),
                "maxContentLength": Infinity,
                "maxBodyLength": Infinity,
            },
        };

        if (this.token) {
            config.headers["Authorization"] = `Bearer ${this.token}`;
        }

        this.response = await axios.post(UPLOAD_URL, this.formData, config);

        if (this.response.data.status === "ok") {
            const data = this.response.data.data;
            const downloadPage = data.downloadPage;
            const qrUrl = QR_API + downloadPage;
            
            this.emit("complete", downloadPage, qrUrl);
        } else {
            throw new Error(`Upload failed: ${this.response.data.status}`);
        }

    } catch (error) {
        if (error.response && error.response.data) {
             this.emit("error", new Error(`API Error: ${JSON.stringify(error.response.data)}`));
        } else {
             this.emit("error", new Error(error.message || error));
        }
    }
};

util.inherits(Gofile, EventEmitter);

module.exports = Gofile;
