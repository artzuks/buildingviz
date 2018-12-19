/*
This function is responsible for fetching data from NYC opendata for a time range
and placing the permits into a sqs queue for processing.

The function will time out if it receives a request that is greater than a year
because of the speed at which the NYC opendata api returns

*/


var https = require('https');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

/*
This function takes in the start and end time of when the permits should be filed
It also takes in the limit and offset in the data set that you wish to get back
*/
async function getPermits(start,end,offset,limit){
  return new Promise((resolve,reject ) => {
    console.log('sending request to get permits ', start, end,offset,limit)
    const options = {
            host: 'data.cityofnewyork.us',
            path: '/resource/83x8-shf7.json?$limit=' + limit + '&$offset=' + offset +
                   "&$where=" + encodeURIComponent("filing_date between '" + start +"' and '" + end +"'")
                 + "&$$app_token=CPY5bSHYeai7igs8WfzssXyP4"  

        };
        var data = "";
        const req = https.get(options, (res) => {
          //console.log(res);
          res.on('data',(d)=>{
            data += d;
          })
          
          res.on('end',()=>{
            //console.log(data);
            resolve(JSON.parse(data));
          })
        });

        req.on('error', (e) => {
          reject(e.message);
        });
  })
}

/*
 The function is responsible for pushing messages to the sqs queue which are 
 processed downstream
*/
async function pushToQueue(res){
  return new Promise((resolve,reject)=>{
      var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
        //console.log('sending doc to queue');
        var params = {
           MessageBody: JSON.stringify(res),
           QueueUrl: "https://sqs.us-east-1.amazonaws.com/317105563430/buildingviz-index"
        };
        
        
        sqs.sendMessage(params, function(err, data) {
          if (err) {
              reject(err);
              console.log("Error", err);
          } else {
              resolve(data.MessageId)
              //console.log("Success", data.MessageId);
          }
        });
  });  
}

async function waitForPromises(promises){
  return new Promise((resolve,reject)=>{
    Promise.all(promises)
    .then((res)=>{
      resolve(res);
    })
    .catch((e)=>{
      reject(e);
    })
  })
}

/*
If no start and end range are provided, the function will index the last 2 days of permit data
The functionality pages through the NYC opendata api and creates promises to push the docs to 
a SQS queue.

Status code is 200 unless the function crashes or timesout
*/
exports.handler = async (event) => {
    // TODO implement
    let limit = 10000;
    let start = new Date();
    let end = new Date();
    start.setDate(start.getDate() - 2);
    start = start.toISOString().substring(0,10);
    end = end.toISOString().substring(0,10);
    if (event.start && event.end){
      start = event.start;
      end = event.end;
    }
    
    let offset = 0;
    let results = [];
    do {
      results = await getPermits(start,end,offset,limit);
      let promises = [];
      console.log('processing ',results.length,' docs');
      console.log('last doc', results[results.length-1]);
      for (let i = 0; i<results.length;++i){
        promises.push(pushToQueue(results[i]));
      }
      let queuePushes = await waitForPromises(promises);
      offset = offset + results.length;
      
    }while (results.length === limit)
    
    const response = {
        statusCode: 200
    };
    return response;
};
