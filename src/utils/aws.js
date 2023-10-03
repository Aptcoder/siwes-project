import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const createPresignedUrl = async (key) => {
    const s3Client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    })

    const command = new PutObjectCommand({
        Bucket: 'be-practice',
        Key: key,
    })

    return getSignedUrl(s3Client, command, { expiresIn: 3600 })
}
