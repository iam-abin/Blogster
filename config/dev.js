module.exports = {
    googleClientID:
        "70265989829-0t7m7ce5crs6scqd3t0t6g7pv83ncaii.apps.googleusercontent.com",
    googleClientSecret: "8mkniDQOqacXtlRD3gA4n2az",

    mongoURI: "mongodb://localhost:27017/blog_advancedNode",

    cookieKey: "12312bac3123",
    accessKeyIdS3: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKeyS3: process.env.AWS_S3_SECRET_ACCESS_KEY,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
    awsRegion: process.env.AWS_REGION,
};
