import { S3Client, GetObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const getPresignedUrl = async (props: any) => {
  const {
    credentials, region, bucket, key,
  } = props;

  const s3Configuration: S3ClientConfig = {
    credentials,
    region
  };
  const s3 = new S3Client(s3Configuration);
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 }); // expires in seconds
  return url;
}

export default getPresignedUrl;
