// import { createClient } from 'redis'; //舊式要用require   import 係新式，如果係packagel.json加返"type":"module" 就可以用import 但要全部一齊轉

const { createClient } = require("redis"); //係node js 度駁redis 而不是在react駁
//redis果邊開Image果時要開返個port 6379 畀人駁入黎 否則佢係密封的  你係駁唔到入去

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const fetch = require("node-fetch"); //javascript係無fetch依個api 依個係browser先有 node js無 所以要import

// const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");
const { MongoClient, ObjectId } = require("mongodb");
const { attr } = require("cheerio/lib/api/attributes");
const uri = "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
const TelegramBot = require("node-telegram-bot-api");
const token = "5269332171:AAEZYtD2f2rdEs-eavddMt9H2bnESaJllJc";
const bot = new TelegramBot(token, { polling: true });
const puppeteer = require('puppeteer');

const chatId = 5257799319;


// bot.onText(/\/start$/, (msg)=>{
//     console.log(msg)
//     const chatId = msg.chat.id
//     // bot.sendMessage(chatId,"Hello world")
//     bot.sendPhoto(chatId,"google.png",{
//         update: "success"
//     })
// });

const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
// (async () => {
//     await redisClient.connect();
// })();

const url = "https://dj1jklak2e.28car.com/sell_lst.php";

let db = null;

async function initizeDB() {
    try {
        await client.connect();
        db = await client.db("28car");     //等如use crew 
    } catch (error) {
        console.log(error);
    }
}

async function getData(i) {
    try {
        const searchResult = [];
        let response = await axios({
            method: "POST",
            url,
            headers: {
                authority: "dj1jklak2e.28car.com",
                method: "POST",
                path: "/sell_lst.php",
                scheme: "https",
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                // "cookie": "isf=n; iscanvas=y; PHPSESSID=kn7t8jd5l512j48efpa7ishia3; adv_tip_verx_w=20220218084630; adv_tip_catx_w=1=53:1,54:0|2=52:1,51:0,31:1|4=140:1,146:0,148:0,150:0,145:0,149:0|7=158:3|9=151:1,159:0,163:0|10=157:0; adv_tip_wrdx_w=0:0|1:0|3:0|4:0|6:0|7:0|8:0|9:0|10:0|11:0|12:0|13:0|14:0|15:0|16:0|17:0|18:0|19:0|21:0|22:0|23:0|24:0|26:0|27:0|28:0|30:0|31:0|32:0|33:0|34:0|35:0|36:0|37:0|38:0|39:0|40:0|42:0|43:0|5:1|20:1|29:1|41:1|2:2|25:2; adv_csf_runx_w=139; adv_msb_runx_w=1361; adv_idx_run_w=496; adv_idb_run_w=1510; __cf_bm=DqOa3CLYuJUBWMCy9Nq1otpf6BJ3botVov8_yC2Ku2Q-1645672484-0-AdNQh7AsYuYQRrxYrM3CRTZrfqdiw7S8YeUzLtjehQc/JpSE73pdY0lUVmf94vYqmchD/4iTHsiWNuOmpEKeSewYFeYjFqj5mHMkMi5lzOsHS5GV2K1zrflO/gY4YwraGA==; adv_bnr_verx_w=20220224063829; cp=/sell_lst.php; ct=1645673230; adv_inr_runx_w=691; adv_bnr_strx_w=433:1,167:0,841:0,364:0,372:0,323:0,556:0,770:0,808:0,459:0,269:0,834:0,210:0,832:0,215:0,837:0,831:0,530:0,363:0,429:0,515:0,190:0,606:1,604:1,622:1,529:1,650:1,795:1,344:1,447:1,739:1,128:1,592:1,218:1,700:1,377:1,626:1,540:1,838:1,774:1,258:1,437:1,835:1,58:1,402:1,836:2; adv_bnr_runx_w=433; qc=1645673231:485d8c9c4f9fdb2ebe304c648b00b3ed:39125; xmq_scl_l=-2543px",
                origin: "https://dj1jklak2e.28car.com",
                pragma: "no-cache",
                referer: url,
                "sec-ch-ua": `" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"macOS"`,
                "sec-fetch-dest": "frame",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": 1,
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36"
            },
            data: `h_f_ty=1&h_f_do=1&h_page=${i}`,
            responseType: 'arraybuffer',
            transformResponse: [function (data) {
                return iconv.decode(Buffer.from(data), 'big5')
            }]
        });

        console.log("page:", i);

        const html = response.data
        // console.log("httttml : \n" + html)
        const $ = cheerio.load(html)
        for (let i = 0; i < 20; i++) {
            let target = "#rw_" + i;
            $(target).each(function () {   //for each/map/filter落async 佢會行但唔會等  同唔落await無分別
                // const _id = $(this).attr("title").trim().slice(-14);
                const _id = $(this).attr("title").trim().substring(10,18);
                const title = $(this).find("td table tbody tr td table tbody tr td").eq(0).text().trim();
                const brand = $(this).find("td table tbody tr td table tbody tr td b").eq(0).text();
                const model = $(this).find("td table tbody tr td table tbody tr td").eq(0).find("font").eq(2).text().trim();
                const contact = $(this).find("td table tbody tr td table tbody tr td b").eq(1).text();
                // const seats = $(this).find("td table tbody tr td table tbody tr td").eq(1).text();
                // const capacity = $(this).find("td table tbody tr td table tbody tr td").eq(2).text();
                const seats = $(this).find("td table tbody tr td table tbody tr td").eq(2).text();
                const capacity = $(this).find("td table tbody tr td table tbody tr td").eq(3).text();
                const transmission = $(this).find("td table tbody tr td table tbody tr td").eq(4).text();
                // const transmission = $(this).find("td table tbody tr td table tbody tr td").eq(3).text();
                // const year = parseInt($(this).find("td table tbody tr td table tbody tr td").eq(4).text());
                const year = parseInt($(this).find("td table tbody tr td table tbody tr td").eq(5).text());
                // const price = parseInt($(this).find("td table tbody tr td table tbody tr td").eq(5).text().replace(/,/g, "").substr(1));
                const price = parseInt($(this).find("td table tbody tr td table tbody tr td").eq(6).text().replace(/,/g, "").substr(1));
                const updateTime = $(this).find("td table tbody tr td table tbody tr td").eq(11).text().slice(0, 5);
                +" " + $(this).find("td table tbody tr td table tbody tr td").eq(11).text().slice(5);
                const vvid = $(this).find("td table tbody tr td").attr("onclick");

                let vid;
                if (vvid.length === 24) {
                    vid = vvid.slice(9, 18);
                } else {
                    vid = vvid.slice(10, 19);
                }

                // searchResult.push({
                //     _id,
                //     title,
                //     brand,
                //     model,
                //     contact,
                //     seats,
                //     capacity,
                //     transmission,
                //     year,
                //     price,
                //     updateTime,
                //     vid,
                // });
                searchResult.push({
                    _id,
                    title,
                    brand,
                    model,
                    contact,
                    seats,
                    capacity,
                    transmission,
                    year,
                    details:{price,vid}
                });
                console.log("hiiiiii :\n", searchResult);
            })
        }
        return searchResult;
    } catch (error) {

        console.log("error");
        console.log(error);
        res.json(error);
    }
}

async function drop() {
    try {
        const result = await db.collection("rawData").drop();
    } catch (error) {
        console.log("drop error",error);
    }
}

app.get("/drop", (req, res) => {
    drop();
    res.json({ success: true })
})

app.post("/set-account", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (name && email && password) {
            let data = {
                name,
                email,
                password
            }
            console.log(data);
            const resultOfInsert = await db.collection("accounts").insertOne(data);
            res.json({
                success: true
            })
        } else {
            console.log("missing Info")
            res.json({
                success: false
            })
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})
app.post("/unset-account", async (req, res) => {
    try {
        const id = req.body.id;
        console.log(id);
        if (id) {
            let query = {
                _id: ObjectId(id)
            }
            console.log(query);
            const cursor = await db.collection("accounts").deleteOne(query);
            console.log(cursor);
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})

app.get("/accounts", async (req, res) => {
    try {
        // let accounts = getAccount();
        // console.log(accounts);
        // res.json(accounts);

        const cursor = await db.collection("accounts").find({}, {});
        const accounts = await cursor.toArray();
        res.json(accounts);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

async function getAccount() {
    try {
        const cursor = await db.collection("accounts").find({}, {});
        const account = await cursor.toArray();
        return account;
    } catch (error) {
        console.log(error);
    }
}

async function update(page, totalCars){
    try{
            await page.waitForSelector(`#rw_${totalCars} > table > tbody > tr > td:nth-child(1) > table`);
            await page.click(`#rw_${totalCars} > table > tbody > tr > td:nth-child(1) > table`);
            await page.waitForSelector("body > table:nth-child(10) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr > td:nth-child(1) > input:nth-child(2)");
            await page.click("body > table:nth-child(10) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr > td:nth-child(1) > input:nth-child(2)");
            await page.waitForSelector("body > table:nth-child(9) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > font > input:nth-child(1)");
            await page.click("body > table:nth-child(9) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > font > input:nth-child(1)");
            await page.waitForSelector("#w_fn");
            await page.click("#w_fn"); 
            await page.waitForSelector("body > table:nth-child(10) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr > td:nth-child(1) > input:nth-child(4)");
            await page.click("body > table:nth-child(10) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr > td:nth-child(1) > input:nth-child(4)");
    }catch(error){
        console.log(error);
    }
}

async function autoClick() {
    const browser = await puppeteer.launch({
        // headless: true,
        headless: false,
        // defaultViewport: {width: 1920, height: 1080}
    });
    // const page = await browser.newPage();
    const account = await getAccount();
    //在主頁login 
    for (let i = 0; i < account.length; i++) {
        // const browser = await puppeteer.launch({
        //     // headless: true,
        //     headless: false,
        //     // defaultViewport: {width: 1920, height: 1080}
        // });
        const page = await browser.newPage();
        await page.goto('https://dj1jklak2e.28car.com/');
        await page.waitForSelector("#h_username");
        await page.type('input[id=h_username]', `${account[i].email}`);
        await page.type('input[id=h_password]', `${account[i].password}`);
        await (await page.$('body > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table:nth-child(1) > tbody > tr > td:nth-child(8) > input[type=image]')).press('Enter');

        //我的紀錄
        await page.waitForSelector('body > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table:nth-child(1) > tbody > tr > td:nth-child(7) > a');
        await (await page.$('body > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table:nth-child(1) > tbody > tr > td:nth-child(7) > a')).press('Enter');

        //找總車數
        await page.waitForSelector('body > table:nth-child(10) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(5) > tbody > tr');

        //way1
        let $parent = await page.$('body > table:nth-child(10) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(5) > tbody')
        //let $childs = await $parent.$$(':scope > tr');   //淨show tr
         let $childs = await page.$$("td[id^='rw_']");
        // console.log("child",$childs);
        console.log("車數",$childs.length - 1);
        // console.log("車數",$childs.length - 4);
        // if ($childs.length - 4 > 0) {
        //     await update(page, $childs.length - 4);
        //     await page.waitForSelector("body > table:nth-child(10) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(5) > tbody > tr");
        // }

        // if ($childs.length - 1 > 0) {
        //     await update(page, $childs.length - 1);
        //     await page.waitForSelector("body > table:nth-child(10) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(5) > tbody > tr");
        // }
        
        // await page.waitForSelector(`#rw_${$childs.length - 4} > table > tbody > tr > td:nth-child(1) > table`);
        await page.waitForSelector(`#rw_${$childs.length - 1} > table > tbody > tr > td:nth-child(1) > table`);
        await page.screenshot({ path: `./public/${account[i].name}28car.png` });

        autoSendPhoto(account[i].name);

        // 登出
        await page.waitForSelector("body > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr > td:nth-child(4) > a > img");
        await page.click("body > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr > td:nth-child(4) > a > img");
        // await browser.close();
    }
    await browser.close();
}

function getNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

async function fetchWeb(pages) {
    try {
        let result = [];    //盡量放係local scope
        for (let i = 1; i <= pages; i++) {
            await new Promise(resolve => setTimeout(resolve, getNum(1, 2) * 1000));    // await wait(1); 同依個寫法一樣 都係強制要佢等一陣
            let getResult = await getData(i);
            result = result.concat(getResult);
            console.log("total cars length " + result.length);
        }

        const resultOfInsert = await db.collection("rawData").insertMany(getUniqueListBy(result, "_id"));

        console.log(resultOfInsert);
        // const stages = [{
        //     $group: {
        //         _id: {
        //             brand: "$brand",
        //             model: "$model",
        //             capacity: "$capacity",
        //             transmission: "$transmission",
        //             year: "$year"
        //         },
        //         prices: { $push: "$price" },
        //         lowestPrice: { $min: "$price" },
        //         vid: { $push: "$vid" },
        //         updateTime: { $push: "$updateTime" },
        //     }
        // }, {
        //     $merge: { into: { db: "28car", coll: "sellingCars" } }
        // }]

        const stages = [{
            $sort: {"details.price":1}
            // $sort: { "_id.model": 1 ,"_id.year":-1 , "details.price":1}
            // $sort: {  "details.price":1, "_id.year":-1, "_id.model": 1 }
        },{
            $group: {
                _id: {
                    brand: "$brand",
                    model: "$model",
                    capacity: "$capacity",
                    transmission: "$transmission",
                    year: "$year"
                },
                details: { $push: "$details" },
                lowestPrice: { $min: "$details.price" },
            }
        }, {
            $merge: { into: { db: "28car", coll: "sellingCars" } }
        }]

        const aggCursor = db.collection("rawData").aggregate(stages);
        const docs = await aggCursor.toArray();  //無依句就唔幫你aggregate

    } catch (error) {
        console.log("fetch",error);
    }
};

app.post("/get-page", async (req, res) => {
    try {
        let initPages = parseInt(await redisClient.get("initPages"));
        initPages = initPages || 500;

        bot.sendMessage(chatId, `${new Date().toLocaleString()}：請稍等正在進行初始搜尋`);
        
        await drop();
        await mergeToHistory();
        await fetchWeb(initPages);
        await autoNotice();
        res.json({ success: true });
    } catch (error) {
        res.json(error);
    }
})

app.post("/price/notice", async (req, res) => {
    try {
        autoNotice();
        console.log("/price/notice")
        res.json({success:true});
    } catch (error) {
        res.json(error);
    }
})

async function autoNotice() {
    try {
        const stages = [{
            $lookup: {
                from: "sellingCars",
                localField: "_id",
                foreignField: "_id",
                as: "carNeedsUpdate"
            }
        }, {
            $unwind: "$carNeedsUpdate"
        }, {
            $match: {
                $expr: { $gt: ["$lowestPrice", "$carNeedsUpdate.lowestPrice"] }
            }
        }
        ];

        const aggCursor = await db.collection("history")?.aggregate(stages);
        const docs = await aggCursor?.toArray();

        docs ? autoSendNotice(docs) : null;

        const stages2 = [{
            $lookup: {
                from: "sellingCars",
                localField: "_id",
                foreignField: "_id",
                as: "carNeedsUpdate"
            }
        }, {
            $unwind: "$carNeedsUpdate"
        }, {
            $match: {
                $expr: { $gt: ["$lowestPrice", "$carNeedsUpdate.lowestPrice"] }
            }
        }, {
            $out: { db: "28car", coll: "notice" }
        }
        ];

        const aggCursor2 = await db.collection("history")?.aggregate(stages2);
        const docs2 = await aggCursor2?.toArray();

        await redisClient.set('updateTime', JSON.stringify(new Date()));

    } catch (error) {
        console.log("auto notice error occurs")
    }
}

async function mergeToHistory() {
    try {
        const stages = [{
            $merge: { into: { db: "28car", coll: "history" } }
        }
        ];

        const aggCursor = await db.collection("sellingCars").aggregate(stages);
        const docs = await aggCursor.toArray();

    } catch (error) {
        console.log("merge history error occurs")
    }
}

function sortCar (data){
    let isTesla, isOther;

    let isAny = data.find((ele)=>ele._id==="任何");

    if(isAny){
        isTesla = isAny.cars.filter((ele)=>ele._id.model.toLowerCase().indexOf("TESLA".toLowerCase())>=0);
        isOther = isTesla.length ===isAny.cars.length? false: true;
        data.push({
            _id:"TESLA",
            cars: [...isTesla]
        })
    }

    let anyIndex = data.findIndex((ele)=>ele._id==="任何");

    if(anyIndex>-1){
         if(isOther){
            for(let i = 0; i<data[anyIndex].cars.length;i++){
                if(data[anyIndex].cars[i]._id.model.toLowerCase().indexOf("TESLA".toLowerCase())>=0){
                    data[anyIndex].cars.splice(i,1);
                    i--;
                }
            }
        }else{
            data.splice(anyIndex,1);
        }
    }

    data.sort((a,b)=>b.cars.length-a.cars.length);
}

app.get("/brands", async (req, res) => {
    try {
        const stages = [{
            $sort: { "_id.model": 1 ,"_id.year":-1}
        }, {
            $group: {
                _id: "$_id.brand",
                cars: { $push: "$$ROOT" }
            }
        }]

        const aggCursor = db.collection("sellingCars").aggregate(stages);
        const docs = await aggCursor.toArray();  //無依句就唔幫你aggregate

        sortCar(docs);
        res.json(docs);
    } catch (error) {
        res.json(error);
    }
})

app.get("/notice", async (req, res) => {
    try {
        const cursor = await db.collection("notice").find({}, {}).sort({ "_id.model": 1, "_id.year": -1 });
        const docs = await cursor.toArray();

        // for(let i = 0;i<docs.length;i++){
        //     docs[i].lowestPrice = docs[i].carNeedsUpdate.lowestPrice;
        //     docs[i].prices = docs[i].carNeedsUpdate.prices;
        //     docs[i].updateTime = docs[i].carNeedsUpdate.updateTime;
        //     docs[i].vid = docs[i].carNeedsUpdate.vid;
        // }

        for(let i = 0;i<docs.length;i++){
            docs[i].lowestPrice = docs[i].carNeedsUpdate.lowestPrice;
            docs[i].details = docs[i].carNeedsUpdate.details;
        }

        let updateTime = JSON.parse(await redisClient.get("updateTime"));
        console.log("updateTime",updateTime);

        res.json({ data: docs, updateTime });
    } catch (error) {
        res.json(error);
    }
})

app.post("/settings/pages", async (req, res) => {
    try {
        let pages = req.body.pages;
        await redisClient.set('pages', pages);
        res.json({ success: true });
    } catch (error) {
        res.json(error);
    }
})

app.post("/settings/init", async (req, res) => {
    try {
        let initPages = req.body.initPages;
        await redisClient.set('initPages', initPages);
        res.json({ success: true });
    } catch (error) {
        res.json(error);
    }
})

// GET /settings
// POST /settgins/timeInterval/5
// POST /settings/profileUpdateInterval
// POST /settings

app.get("/settings", async (req, res) => {
    try {
        let pages = await redisClient.get("pages");
        let timeInterval = await redisClient.get("timeInterval");
        let profileUpdateInterval = await redisClient.get("profileUpdateInterval");
        let initPages = await redisClient.get("initPages");
        res.json({ success: true, pages, timeInterval, profileUpdateInterval,initPages });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

app.post("/settings/time-interval", async (req, res) => {
    try {
        let timeInterval = req.body.timeInterval;
        await redisClient.set('timeInterval', timeInterval);
        res.json({ success: true });
    } catch (error) {
        res.json(error);
    }
})

app.post("/settings/profile-update/interval", async (req, res) => {
    try {
        let profileUpdateInterval = req.body.profileUpdateInterval;
        await redisClient.set('profileUpdateInterval', profileUpdateInterval);
        res.json({ success: true });
    } catch (error) {
        res.json(error);
    }
})


async function autoFetch() {

    let pages = parseInt(await redisClient.get("pages"));
    let timeInterval = parseInt(await redisClient.get("timeInterval"));

    timeInterval = timeInterval || 30;
    pages = pages || 80;

    console.log("time interval", timeInterval);

    await drop();
    await mergeToHistory();
    await fetchWeb(pages);
    await autoNotice();

    setTimeout(() => {
        autoFetch();
    }, getNum(timeInterval-2, timeInterval +1 ) * 60 * 1000);
}

function autoSendPhoto(name) {

    bot.sendPhoto(chatId, `./public/${name}28car.png`);
    console.log("auto send");
}

async function autoSendNotice(notice) {
    if (notice.length > 0) {
        await bot.sendMessage(chatId, `${new Date().toLocaleString()} 價格調低提示：`);
        for (let i = 0; i < notice.length; i++) {
            // bot.sendMessage(chatId, `品牌: ${notice[i]._id.brand}\n型號: ${notice[i]._id.model}\n容量: ${notice[i]._id.capacity}\n波箱: ${notice[i]._id.transmission}\n年份: ${notice[i]._id.year}\n最低價格: ${notice[i].carNeedsUpdate.lowestPrice}\n車輛連結: https://www.28car.com/sell_dsp.php?h_vid=${notice[i].carNeedsUpdate.vid}&h_vw=y`)
            await bot.sendMessage(chatId, `品牌: ${notice[i]._id.brand}\n型號: ${notice[i]._id.model}\n容量: ${notice[i]._id.capacity}\n波箱: ${notice[i]._id.transmission}\n年份: ${notice[i]._id.year}\n最低價格: ${notice[i].carNeedsUpdate.lowestPrice}\n車輛連結: https://www.28car.com/sell_dsp.php?h_vid=${notice[i].carNeedsUpdate.details[0].vid}&h_vw=y`)
        }
    }
}

async function autoUpdate() {
    // const numOfCars = parseInt(await redisClient.get("numOfCars"));
    const profileUpdateInterval = parseInt(await redisClient.get("profileUpdateInterval")) || 96;
    try{
        await autoClick();
        // autoSendPhoto();
        
    }catch(error){
        console.log(error);
    }
    
    setTimeout(() => {
        console.log("autoUpdate");
        autoUpdate();
    }, getNum(profileUpdateInterval, profileUpdateInterval + 3) * 60 * 1000);
    // }, profileUpdateInterval* 60 * 1000);
    
}

app.get("/auto-fetch", async (req, res) => {
    try {
        let timeInterval = parseInt(await redisClient.get("timeInterval"));
        timeInterval = timeInterval || 30;

        console.log("auto run started");
        bot.sendMessage(chatId, `${new Date().toLocaleString()}：已成功啟動自動擷取功能`);

        setTimeout(() => {
            autoFetch();
            }, timeInterval*60*1000);
        // }, timeInterval * 1000);

        res.json({ success: true });
    } catch (error) {
        console.log(error);
    }
})

// app.get("/a", async (req, res) => {
//     try {
      
//         res.send("無error");
//     } catch (error) {
//         res.send("有error");
//     }
// })

// initizeDB().then(async () => {
//     app.listen(3200, () => {
//         console.log("Example app listening on port 3200!");
//         // getAccount();
//         // autoUpdate();
//     });
// }).catch(console.error);

async function startServer (){
    try{
        await initizeDB();
        await redisClient.connect();
        app.listen(3200, () => { //佢唔係return 個promise出黎 所以唔洗await , 佢只係做完就做果個call back func
            console.log("Example app listening on port 3200!");
            // getAccount();
            // autoUpdate();
        });
    }catch(error){
        console.log("error occurs", error);
    }
}

startServer();

     
