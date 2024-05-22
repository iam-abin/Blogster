const AWS = require("aws-sdk");
const uuid = require("uuid/v1");

const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");

const s3 = new AWS.S3({
    region: keys.awsRegion,
    accessKeyId: keys.accessKeyIdS3,
    secretAccessKey: keys.secretAccessKeyS3,
    signatureVersion: "v4"
});

module.exports = (app) => {
    app.get("/api/upload", requireLogin, async (req, res) => {
        const key = `${req.user.id}/${uuid()}.jpeg`;
        console.log(key);

        const params = {
            Bucket: keys.awsS3BucketName,
            Key: key, // Corrected to use capital "K"
            ContentType: "image/jpeg", // Ensure ContentType is specified
            Expires: 60
        };

        s3.getSignedUrl("putObject", params, (err, url) => {
            if (err) {
                console.error("Error generating signed URL", err);
                return res.status(500).send("Error generating signed URL");
            }
            res.status(200).send({ key, url });
        });
    });
};
