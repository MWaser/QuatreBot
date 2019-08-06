var steem = require("steem");
//steem.api.setOptions({ url: 'wss://steemd-int.steemit.com' });
steem.api.setOptions({ url: 'https://api.steemit.com' });
console.log('Starting up watcher . . . .');
var voter = require('child_process').fork(`${__dirname}/vote.js`);
// voter.send({ author: 'chbartist', identifier: 'what-people-get-wrong-about-the-growth-mindset-and-its-impact', vote: 1 });
class Article {
    constructor(author, identifier, created, vote) {
        this.author = author;
        this.identifier = identifier;
        this.created = created;
        this.vote = vote;
    }
}
class Author {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}
var authors = [];
authors.push(new Author("mark-waser", 1));
authors.push(new Author("digital-wisdom", 1));
authors.push(new Author("jwaser", 1));
authors.push(new Author("herpetologyguy", 1));
authors.push(new Author("morgan.waser", 1));
authors.push(new Author("davidjkelley", 1));
authors.push(new Author("technoprogressiv", 1));
authors.push(new Author("handyman", 1));
// authors.push(new Author("", 0.5));
// authors.push(new Author("", 0.5));
// authors.push(new Author("", 0.5));
// authors.push(new Author("", 0.5));
// authors.push(new Author("", 0.5));
// authors.push(new Author("", 1));
// authors.push(new Author("", 1));
authors.push(new Author("anomadsoul", 0.5)); // 5-105; 5/week
authors.push(new Author("anyx", 1)); // ** rare, high
authors.push(new Author("brittuf", 1)); // ** 72-100; 3/week  
authors.push(new Author("buggedout", 1)); // ** rare, high
authors.push(new Author("buildteam", 0.5)); // ** 50-60; 2/week
authors.push(new Author("busy.org", 1)); // ** rare, high
authors.push(new Author("buzzi", 1)); // ** new, huge
authors.push(new Author("chainwise", 1)); // ** 0-359; 1/week
authors.push(new Author("chbartist", 1)); // recently 92-196, 1-2/day
authors.push(new Author("conformity", 1)); // ** 100; maybe gone
authors.push(new Author("crypt0lizard", 0.5)); // ** 200; maybe gone   
authors.push(new Author("crypto.piotr", 1)); // ** 35-188; 2-3/month
authors.push(new Author("dahaz159", 1)); // ** rare; huge
authors.push(new Author("deathcross", 0.5)); // 17-80; 2/day
authors.push(new Author("dtube", 1)); // ** 133-300; 1/week
authors.push(new Author("epicdice", 1)); // 74-167; 1/week
authors.push(new Author("etcmike", 1)); // ** 38-103; 4/week
authors.push(new Author("fatkat", 1)); // 56-122; vacation?
authors.push(new Author("finprep", 0.5)); // 7-147; 3-4/week
authors.push(new Author("firepower", 0.5)); // 15-97; 2/day
authors.push(new Author("fyrstikken", 0.5)); // new; 39-169; 3/week
authors.push(new Author("good-karma", 1)); // ** rare; high
authors.push(new Author("hatu", 1)); // ** 173-238; 2/week                  
authors.push(new Author("heimindanger", 1)); // ** rare, high
authors.push(new Author("intrepidphotos", 0.5)); // 36-86; 1/week
authors.push(new Author("jackmiller2", 0.5)); // 22-95; 3/week; new
authors.push(new Author("jamesgoddard", 0.5)); // 17-60; 1-2/week
authors.push(new Author("jellenmark", 1)); // ** rare, high
authors.push(new Author("jrcornel", 0.75)); // ** 47-74; 1/day
authors.push(new Author("kevinwong", 0.5)); // 29-223; maybe gone
authors.push(new Author("majes.tytyty", 1)); // ** 29-100; 2/day
authors.push(new Author("mehta", 1)); // ** 50-106; 1/day
authors.push(new Author("minnowbooster", 0.5)); // rare; 50-100
authors.push(new Author("muratkbesiroglu", 0.5)); // ** 68-81; 4/week
authors.push(new Author("ncquote", 0.5)); // new; 10-117; 2/week
authors.push(new Author("nicholasmerten", 0.5)); // 12-68; 4/week
authors.push(new Author("null.promoted", 1)); // ** new, 3-4/week; 1-185
authors.push(new Author("oendertuerk", 1)); // ** 40-70; 1/day
authors.push(new Author("oracle-d", 0.5)); // 32-189; 1/week
authors.push(new Author("privex", 1)); // ** rare; high
authors.push(new Author("probit", 1)); // ** rare; high
authors.push(new Author("roadofrich", 0.5)); // 10-169; 1/day
authors.push(new Author("rest100", 1)); // ** 168-200; 1/week
authors.push(new Author("roger.remix", 0.5)); // 31-119; 2/week
authors.push(new Author("smartsteem", 1)); // ** rare; high
authors.push(new Author("steem-bounty", 1)); // ** 101-157; 1/week
authors.push(new Author("steeminfobot", 1)); // ** 55-190; 1/week
authors.push(new Author("steem.organic", 0.5)); // 1-188; 1/day
authors.push(new Author("steempress", 1)); // ** rare, high
authors.push(new Author("steemvoter", 1)); // rare; high
authors.push(new Author("sweetsssj", 1)); // ** rare; high
authors.push(new Author("the4thmusketeer", 1)); // ** 52-162; 1/week
authors.push(new Author("threespeakshorts", 0.5)); // 19-65; 1/week
authors.push(new Author("trafalgar", 1)); // ** rare; high
authors.push(new Author("transisto", 1)); // ** 127-152; 1/week
authors.push(new Author("volentix", 1)); // ** 92-340; vacation?
authors.push(new Author("zaku", 0.5)); // 13-205; 2/day
authors.push(new Author("zer0hedge", 1)); // 2-171; 1/day
var authorExists = function (name) {
    for (var i = 0, len = authors.length; i < len; i++) {
        var str = authors[i].name;
        if (str === name)
            return authors[i].score;
    }
    return 0;
};
var authorScore = 0;
var articles = [];
var retries = 0;
var articleIsNew = function (author, identifier) {
    for (var i = 0, len = articles.length; i < len; i++) {
        var auth = articles[i].author;
        var id = articles[i].identifier;
        if (auth === author && id === identifier)
            return false;
    }
    return true;
};
try {
    steem.api.streamOperations(function (err, result) {
        try {
            if (err == null) {
                if (result[0] == "comment") {
                    if (result[1].parent_author == "") {
                        var nowLocal = new Date();
                        var nowUtc = new Date(nowLocal.getTime() + (nowLocal.getTimezoneOffset() * 60000));
                        var now = nowUtc.valueOf() / 1000;
                        console.log(nowLocal.toString() + "-" + result[1].author + "/" + result[1].permlink);
                        authorScore = authorExists(result[1].author);
                        if (authorScore > 0) {
                            var heldScore = authorScore;
                            steem.api.getContent(result[1].author, result[1].permlink, function (err, result) {
                                var created = (new Date(Date.parse(result.created))).valueOf() / 1000;
                                if ((now - created) < 880) {
                                    if (articleIsNew(result.author, result.permlink)) {
                                        articles.push(new Article(result.author, result.permlink, created, heldScore));
                                        console.log("NEW GOOD ARTICLE! ");
                                    }
                                    else {
                                        console.log("OLD GOOD ARTICLE! ");
                                    }
                                }
                                else {
                                    console.log("OLD GOOD " + result.author + "/" + result.permlink + "-" + result.created);
                                }
                            });
                        }
                        if (articles.length > 0) {
                            for (let art of articles) {
                                console.log("WAITING! " + (now - art.created).toString() + " // " + art.author + " - " + art.identifier + " - " + art.vote);
                            }
                            if ((now - articles[0].created) >= 885) {
                                voter = require('child_process').fork(`${__dirname}/vote.js`);
                                voter.send({ author: articles[0].author, identifier: articles[0].identifier, vote: articles[0].vote });
                                articles.shift();
                            }
                        }
                        else {
                            console.log("Empty queue");
                        }
                    }
                }
            }
            else {
                console.log("Caught Stream ERROR! " + JSON.stringify(err));
                process.send({ message: "Caught Stream ERROR! " + JSON.stringify(err) });
            }
        }
        catch (ex) {
            console.log("UNCAUGHT ERROR! " + JSON.stringify(ex));
            process.send({ message: "UNCAUGHT ERROR! " + JSON.stringify(ex) });
        }
    });
}
catch (ex) {
    console.log("outer SO ERROR! " + JSON.stringify(ex));
    process.send({ message: "outer SO ERROR! " + JSON.stringify(ex) });
}
//# sourceMappingURL=watch.js.map