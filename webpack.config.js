module.exports = {
    entry: {
        index: "./js/index.js",
        home: "./js/home.js",
        video: "./js/video.js",
        exercices: "./js/exercices.js",
        article: "./js/article.js",
        partage: "./js/partage.js"
    },
    output: {
        path: __dirname,
        filename: "./dist/[name].bundle.js"
    }
};