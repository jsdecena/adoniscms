import env from '#start/env'
import {
  S3Client,
  PutObjectCommand,
  // GetObjectCommand
} from '@aws-sdk/client-s3'
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as fs from 'fs'

const uploader = async (filename: string, filePath: string, contentType: string) => {
  // Configure AWS SDK S3 client
  const s3Client = new S3Client({
    region: env.get('AWS_REGION', 'ap-southeast-1'),
    endpoint: env.get('AWS_ENDPOINT', 'https://s3.ap-southeast-1.amazonaws.com'),
    credentials: {
      accessKeyId: env.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
    },
  })

  // const expiresInSec = 2592000; // 30 days, adjust as needed

  const putObjectParams = {
    Bucket: env.get('AWS_BUCKET_NAME', 'bleeprewards-upload'),
    Key: filename,
    Body: fs.readFileSync(filePath),
    ContentType: contentType,
    ContentDisposition: 'inline',
  }

  try {
    // Upload the file to S3
    await s3Client.send(new PutObjectCommand(putObjectParams))

    // const getObjectParams = {
    //   Bucket: 'bleeprewards-upload', // SG AWS S3 bucket name
    //   Key: filename, // Specify the key/path where you want to store the file in S3
    //   Expires: expiresInSec,
    //   ResponseContentType: contentType,
    // }

    // Generate the URL
    // const s3Url = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams));

    return {
      data: {
        message: 'Upload file success.',
        filename,
        url: `https://d3v4n5w4bf8679.cloudfront.net/${filename}`,
      },
    }
  } catch (err) {
    console.error('Error: ', err)
    return {
      data: {
        message: 'Upload file failed.',
        filename,
        url: '',
      },
    }
  }
}

export default uploader
