
LowestPriceCollection
{
    type:"私家車"
    brand:"富豪 VOLVO"
    cc:"2000cc",
    year:2020,
    lastPrice:280000
}

db.LowestPriceCollection.find(
    type:"私家車"
    brand:"富豪 VOLVO"
    cc:"2000cc",
    year:2020,
    lastPrice:{
        $lt:270000
    }
}
)

SearchResultCollection
query result
{
    type:"私家車"
    brand:"富豪 VOLVO"
    cc:"2000cc",
    year:2020,
    price:270000
}

db.history.aggregate([{
    $group:{
        _id:{"_id.brand":"豐田",
        "_id.model":"bB 1.5",
        "_id.capacity":"1500cc",
        "_id.year":2011},
    }
}])

db.history.aggregate([{
    $match:{
        _id:{"brand":"豐田",
        "model":"bB 1.5",
        "capacity":"1500cc",
        "transmission":"自動波",
        "year":2011},
    },
},{
    $set:{kit:47}
}])

db.sellingCars.aggregate([
            {
                $group:{
                    _id:{
                        brand: "$brand",
                        model:"$model",
                        capacity:"$capacity",
                        transmission:"$transmission",
                        year:"$year"
                    },
                    cars:{$push:"$price"},
                    lowestPrice:{$min:"$price"},
                }
            },{
                $out: { db: "28car", coll: "sellingCars" }
            }
        ])

db.history.aggregate([{
    $lookup:{
        from: "sellingCars",
        localField:"_id",
        foreignField: "_id",
        as: "carNeedsUpdate"
    }
    },{
        $unwind: "$carNeedsUpdate"
    },{
        $match:{lowestPrice:{$gt:"$carNeedsUpdate.lowestPrice"}}
}])

db.history.aggregate([{
    $lookup:{
        from: "sellingCars",
        localField:"_id",
        foreignField: "_id",
        as: "carNeedsUpdate"
    }
    },{
        $unwind: "$carNeedsUpdate"
    },{
        $match:{
            lowestPrice:
        }
    }])

    ,{
        $group:{
            _id:null,
            sum:{$sum:1}
        }
    }



db.history.aggregate([{
    $lookup:{
        from: "sellingCars",
        localField:"_id",
        foreignField: "_id",
        as: "carNeedsUpdate"
    }
    },{
        $unwind: "$carNeedsUpdate"
    },{
        $limit:2
    }
}])

db.history.aggregate([{
    $lookup:{
        from: "sellingCars",
        localField:"_id",
        foreignField: "_id",
        as: "carNeedsUpdate"
    }
    },{
        $unwind: "$carNeedsUpdate"
    },{
        $match:{
            $expr:{$gt:["$lowestPrice","$carNeedsUpdate.lowestPrice"]}
        }
    },{
        $group:{
            _id:null,
            sum:{$sum:1}
        }
    }
])

//ok
db.history.aggregate([{
    $lookup:{
        from: "sellingCars",
        localField:"_id",
        foreignField: "_id",
        as: "carNeedsUpdate"
    }
    },{
        $unwind: "$carNeedsUpdate"
    },{
        $match:{
            $expr:{$gt:["$lowestPrice","$carNeedsUpdate.lowestPrice"]}
        }
    }
])

//test
db.history.aggregate([{
    $lookup:{
        from: "sellingCars",
        localField:"_id",
        foreignField: "_id",
        as: "carNeedsUpdate"
    }
    },{
        $unwind: "$carNeedsUpdate"
    },{
        $match:{
            $expr:{$gt:["$lowestPrice","$carNeedsUpdate.lowestPrice"]}
        }
    },{
        $lookup:{
        from: "monitoring",
        localField:"_id",
        foreignField: "_id",
        as: "carNeedsNotice"
    }
    },{
        $unwind: "$carNeedsNotice"
    }
])

 db.history.find({lowestPrice:1},{})

 db.history.updateOne(
     {"_id.brand": "豐田","_id.model":"RUMION 1.8S","_id.capacity":"1800cc","_id.transmission":"自動波","_id.year":2008},
     {$set:{lowestPrice:2,cars:[46000]}}
 )

 db.history.updateOne(
     {"_id.brand": "任何","_id.model":"TESLA MODEL X 90D","_id.capacity":"888cc","_id.transmission":"自動波","_id.year":2016},
     {$set:{lowestPrice:700000,cars:[70000]}}
 )

 db.sellingCars.updateOne(
     {"_id.brand": "平治","_id.model":"E300 AVANTGARDE","_id.capacity":"3498cc","_id.transmission":"自動波","_id.year":2015},
     {$set:{lowestPrice:2,prices:[2]}}
 )

  db.sellingCars.updateOne(
     {"_id.brand": "平治","_id.model":"CLS63 AMG","_id.capacity":"5461cc","_id.transmission":"自動波","_id.year":2011},
     {$set:{lowestPrice:2,prices:[2]}}
 )

  db.sellingCars.updateOne(
     {"_id.brand": "平治","_id.model":"A250 SPORT AMG","_id.capacity":"1991cc","_id.transmission":"自動波","_id.year":2014},
     {$set:{lowestPrice:2,prices:[2]}}
 )

  db.sellingCars.updateOne(
     {"_id.brand": "平治","_id.model":"C200 AMG","_id.capacity":"1991cc","_id.transmission":"自動波","_id.year":2017},
     {$set:{lowestPrice:2,prices:[2]}}
 )

 $unset:{cars:""}

   db.sellingCars.updateOne(
     {"_id.brand": "平治","_id.model":"A250 SPORT AMG","_id.capacity":"1991cc","_id.transmission":"自動波","_id.year":2014},
     {$unset:{cars:""}}
 )

  db.history.find(
     {"_id.brand": "任何","_id.model":"TESLA MODEL X 90D","_id.capacity":"888cc","_id.transmission":"自動波","_id.year":2016},
     {}
 )

 const stages = [{
                $group:{
                    _id:null,
                    prices:{$push:"$price"},
                    lowestPrice:{$min:"$price"},
                }
            },{
                $out: { db: "28car", coll: "sellingCars" }
            }]

db.sellingCars.aggregate([{
                $group:{
                    _id:_id
                }
            }])

db.sellingCars.aggregate([{
  $group:{
    _id: "$_id.brand"
  }
}])

db.sellingCars.aggregate([{
                $match:{
                    "_id.brand":"寶馬","_id.model":"X3 XDRIVE28iA","_id.capacity":"2000cc","_id.transmission":"自動波","_id.year":2013
                }
            },{
                $out: { db: "28car", coll: "monitoring" }
            }])

db.sellingCars.find({
                    "_id.brand":"寶馬","_id.model":"X3 XDRIVE28iA","_id.capacity":"2000cc","_id.transmission":"自動波","_id.year":2013
                },{})


db.sellingCars.aggregate([{
            $match: {
                "_id.brand": "三菱", "_id.model": "LANCER", "_id.capacity": "2000cc", "_id.transmission": "自動波", "_id.year": 2010
            }
        }, {
            $merge:{into:{ db: "28car", coll: "monitoring" }}
        }])

db.sellingCars.aggregate([{
            $match: {
                "_id.brand": "寶馬", "_id.model": "M2 COUPE", "_id.capacity": "2979cc", "_id.transmission": "自動波", "_id.year": 2017
            }
        }, {
            $merge:{into:{ db: "28car", coll: "monitoring" }}
        }])

{"_id.model":"M2 COUPE"}
{"_id.model":"DISCOVERY SPORT SE 7S"}
