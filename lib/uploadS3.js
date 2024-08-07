

import AWS from 'aws-sdk';
import { uuid } from "uuidv4";


const s3 = new AWS.S3({
  accessKeyId:process.env.MY_APP_AWS_ACCESS_KEY,
  secretAccessKey:process.env.MY_APP_AWS_SECRET_ACCESS_KEY,
  region:process.env.MY_APP_AWS_REGION,
});

export const uploadToS3 = async (file, pathS3) => {
  const fileKey = `${pathS3}${uuid()}-${file.name}`;

 
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const params = {
    Bucket: process.env.MY_APP_S3_BUCKET_NAME,
    Key: fileKey,
    Body: buffer, 
    ContentType: file.type,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // URL pública da imagem no S3
  } catch (err) {
    console.error('Error uploading to S3:', err);
    throw new Error('Failed to upload image to S3!');
  }
};

export const deleteImgS3 = async(url)=>{
  
function getKeyFromUrl(url) {
  const urlObj = new URL(url);
  return decodeURIComponent(urlObj.pathname.substring(1)); 
}
  
const fileKey = getKeyFromUrl(url);

const params = {
  Bucket: process.env.MY_APP_S3_BUCKET_NAME,
  Key: fileKey,
};

s3.deleteObject(params, function(err, data) {
  if (err) {
    console.log("Error deleting object", err);
  } else {
    console.log("Object deleted successfully", data);
  }
})}