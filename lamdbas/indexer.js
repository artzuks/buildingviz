/*
This function is responsible for taking in an event from sqs and transforming the 
data which is then placed into cloudsearch.

The maximum number of events taken from SQS is 10.
*/

let AWS = require('aws-sdk')

var csd = new AWS.CloudSearchDomain({
  endpoint: 'doc-buildingviz-nsfrepxkockt7y2xw7lagwavvy.us-east-1.cloudsearch.amazonaws.com',
  apiVersion: '2013-01-01'
});

/*
Maps the data from NYC opendata into a document that is sent to cloudsearch
for indexing

commented out fields currently are not being mapped into the index
*/
function mapPermitToSchema(permit){
    let resp = {
        type:'add',
        id:permit.job__,
        fields: {
            id_t: permit.bin__,
            bldg_type_t:permit.bldg_type,
            block_t:permit.block,
            borough_lit: permit.borough,
            city_lit: permit.city,
            community_board_t:permit.community_board,
            dobrundate_d: new Date(Date.parse(permit.dobrundate)).toISOString(),
            filing_date_d: new Date(Date.parse(permit.filing_date)).toISOString(),
            filing_status_lit: permit.filing_status,
            house_t: permit.house__?permit.house__:"",
            job_t: permit.job__,
            //"job_doc___": "03",
            job_start_date_d: new Date(Date.parse(permit.job_start_date)).toISOString(),
            job_type_lit : permit.job_type,
            //"lot": "00019",
            owner_s_business_name_lit: permit.owner_s_business_name,
            //"owner_s_first_name": "JOHN",
            //"owner_s_house__": "440",
            //"owner_s_house_street_name": "WEST NYACK ROAD",
            //"owner_s_last_name": "SWIRES",
            //"owner_s_phone__": "7186651222",
            //"owner_s_zip_code": "10994",
            //"permit_sequence__": "02",
            //"permit_si_no": "1916248",
            permit_status_lit: permit.permit_status,
            permit_type_lit: permit.permit_type,
            permittee_s_business_name_lit: permit.permittee_s_business_name,
            //"permittee_s_first_name": "THOMAS",
            //"permittee_s_last_name": "GECSEDI",
            //"permittee_s_license__": "0001306",
            //"permittee_s_license_type": "MP",
            //"permittee_s_phone__": "7188217275",
            //"site_fill": "NONE",
            state_lit: permit.state,
            street_name_t: permit.street_name,
            work_type_lit: permit.work_type,
            //"zip_code": "11217"
        }
    };
    if (permit.gis_latitude && permit.gis_longitude){
        resp.fields.gis_census_tract_t= permit.gis_census_tract;
        resp.fields.gis_council_district_t= permit.gis_council_district;
        resp.fields.gis_location_latlon= permit.gis_latitude + " , " + permit.gis_longitude;
        resp.fields.gis_latitude_t= permit.gis_latitude;
        resp.fields.gis_longitude_t= permit.gis_longitude;
        resp.fields.gis_nta_name_lit= permit.gis_nta_name;
        resp.fields.gis_nta_name_t = permit.gis_nta_name;
    }
    if (permit.expiration_date){
        resp.fields.expiration_date_d = new Date(Date.parse(permit.expiration_date)).toISOString();
    }
    if (permit.issuance_date){
        resp.fields.issuance_date_d = new Date(Date.parse(permit.issuance_date)).toISOString();
    }
    return resp;
}

/*
function uploads documents to cloudsearch
*/
async function uploadDoc(docs){
    return new Promise((resolve,reject)=>{
        var params = {
          contentType: 'application/json', /* required */
          documents: JSON.stringify(docs) /* required */
        };
        csd.uploadDocuments(params, function(err, data) {
          if (err){ 
              console.log(err, err.stack); // an error occurred
              reject(err);
          }else{
              console.log(data);           // successful response
              resolve(data)
          }     
        });    
    })
    
}

exports.handler = async (event) => {
    let docs = [];
    for (let i = 0 ; i < event.Records.length;++i){
        docs.push(mapPermitToSchema(JSON.parse(event.Records[i].body)));
    }
    let indexResp = await uploadDoc(docs)
    const response = {
        statusCode: 200
    };
    return response;
};
