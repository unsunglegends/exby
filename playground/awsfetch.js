/* const  AWS = require ('aws-sdk/clients/s3')

const s3 = new AWS( )

async function listAllObjectsFromS3Bucket ( prefix, satellite, index ) {

  let isTruncated = true
  let marker
  let map1



    const params = { Bucket: 'spatial-production', Prefix: '', Delimiter: '/', }


    try {

      const response = await s3.listObjectsV2( params ).promise()

      map1 = await Promise.all( response.Contents.map( async( item ) => 'https://s3.eu-west-2.amazonaws.com/spatial-production/' ))

     


    } catch( error ) {

      throw error

    }

  
  return map1

}

 listAllObjectsFromS3Bucket( '5c9af8dec14509578799c4e9','sentinel-s2-l1c','ndvi' ).then(( data ) => {
 console.log( data )
 } )
 */
/* export default listAllObjectsFromS3Bucket */
var AwsS3 = require ('aws-sdk/clients/s3');
const GeoTIFF = require('geotiff');
const turf = require('turf')
const s3 = new AwsS3 ();
const lodash = require('lodash')
const geoblaze =  require('geoblaze')
const array = []
const moment = require('moment')
const listDirectories = params => {
  return new Promise ((resolve, reject) => {
    const s3params = {
      Bucket: 'spatial-production',
      Prefix: "",
      Delimiter: '/',
    };
    s3.listObjects (s3params, (err, data) => {
      if (err) {
        reject (err);
      }
      /* console.log(data.CommonPrefixes)
      console.log(data.CommonPrefixes.length) */
      resolve (data);
    });
  });
};
async function listAllObjectsFromS3Bucket ( prefix, satellite, index ) {

    let isTruncated = true
    let marker
    let map1
  
    while( isTruncated ) {
  
      const params = { Bucket: 'spatial-production', Prefix: `${ prefix }${ satellite }/${ index }` }
  
  
      try {
  
        const response = await s3.listObjects( params ).promise()
  
        map1 = await Promise.all( response.Contents.map( async( item ) => `${ item.Key }` ))
       
        isTruncated = response.IsTruncated
  
  
      } catch( error ) {
  
        throw error
  
      }
  
    }
    return map1
  
  }
listDirectories().then(async (data)=>{
   data.CommonPrefixes.forEach(async (res)=>{
       const satllitetype = 'sentinel-s2-l1c'
       const index ='ndvi'
      /*  console.log(`${ res.Prefix }${ satllitetype }/${ index }`) */
       
       listAllObjectsFromS3Bucket(res.Prefix,satllitetype,'ndvi').then(async(res2)=>{
         /* console.log(res2) */
         res2.forEach((list)=>{
         const params = { Bucket: 'spatial-production', Key: `${ list }` }
  
         s3.headObject(params, async function (error, response) {
          if(error) {
           console.log(error)
          } else {
            try{
              const date = response.LastModified; //Last modified date
              const url = `https://s3.eu-west-2.amazonaws.com/spatial-production/${ list }`
              const georaster = await geoblaze.load(url)
              const area = await lodash.round((georaster.xmax - georaster.xmin) * (georaster.ymax - georaster.ymin)/100000,2)
              const polygonId=list.split('/')
              const tmpdate = date.toString()
              function convert(str) {
                var mnths = { 
                    Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
                    Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
                },
                date = str.split(" ");
            
                return [ date[3], mnths[date[1]], date[2] ].join("-");
            }
            const dat =convert(tmpdate)
           console.log(dat) 
              const record = [dat,polygonId[0],area]   
array[array.length] = record
 //console.log(array)
              const createCsvWriter = await require('csv-writer').createArrayCsvWriter;
              const csvWriter = createCsvWriter({
                   header: ['Time', 'PolygonId','Area'],
                  path: './file.csv'
              });
 

csvWriter.writeRecords(array)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
            } catch(e){

            }
          }
       })
      })
        /*  if (res2.length!=0){  
        const someUrl=res2[0]
        const georaster = await geoblaze.load(someUrl)
        const bbox = await turf.bboxPolygon([georaster.xmin, georaster.ymin, georaster.xmax, georaster.ymax])
        console.log(bbox.geometry.coordinates)
        const area1 =await turf.area(bbox)
        
        const area = lodash.round((georaster.xmax - georaster.xmin) * (georaster.ymax - georaster.ymin)/1000000,2)

        console.log(area,area1) */
        /* const tiff = await GeoTIFF.fromUrl(res2[0]);
        const image = await tiff.getImage(); 
        const width = image.getWidth();
        const height = image.getHeight();
        const tileWidth = image.getTileWidth();
        const tileHeight = image.getTileHeight();
        const samplesPerPixel = image.getSamplesPerPixel();
        // when we are actually dealing with geo-data the following methods return
        // meaningful results:
        const origin = image.getOrigin();
        const resolution = image.getResolution();
        const bbox1 = image.getBoundingBox();
        const bbox = bbox1.map((rew)=>rew/10000)
        const bboxPolygon = turf.bboxPolygon(bbox);
        
        const [red] = await image.readRasters();
        const area = await turf.area(bboxPolygon)
        const hects = await lodash.round( area / 9000000, 2 )
        console.log(bbox)
       
           console.log(res.Prefix,res2.length,hects,res2) */
         
        })
       //console.log(`https://s3.eu-west-2.amazonaws.com/spatial-production/${res.Prefix}${satllitetype}/ndvi`)
   })
}).catch((e)=>{
    console.log(e)
})