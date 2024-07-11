import aws, { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multerConfig from '../utils/multerConfig'; 
import mimeTypes  from 'mime-types';


dotenv.config();


class S3Storage {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'sa-east-1',
        });
    }

    async saveFile(filename: string): Promise<void> {
        const originalPath = path.resolve(multerConfig.directory, filename);
   
        const ContentType = mimeTypes.lookup(originalPath);

        if(!ContentType) {
            throw new Error("Arquivo não encontrado!");
        }

        const fileContent = await fs.promises.readFile(originalPath);

        this.client.putObject({
            Bucket: 'exames-usuarios',
            ACL: 'public-read',
            Key: filename,
            Body: fileContent,
            ContentType
        })
        .promise();

        await fs.promises.unlink(originalPath);
    }

    async deleteFile(filename: string): Promise<void> {
        this.client.deleteObject({
            Bucket: 'exames-usuarios',
            Key: filename
        })
        .promise();
    }
}

export default S3Storage;