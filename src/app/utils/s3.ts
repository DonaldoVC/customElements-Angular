declare var require: any;

import {Injectable} from '@angular/core';
const AWS = require('aws-sdk');
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3 {

  s3;

  constructor() {
    this.setCredentialsAWS();
  }

  async setCredentialsAWS() {
    AWS.config.region = 'us-east-1';

    if (environment.NODE_ENV === 'DEV') {
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: environment.COGNITO_AUTH_CONFIG.IdentityPoolId,
        Logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_C6zafzMIu': localStorage.getItem('CurrentUser'),
        }
      });
    }
    if (environment.NODE_ENV === 'QA') {
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: environment.COGNITO_AUTH_CONFIG.IdentityPoolId,
        Logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_lAZM3MQZb': localStorage.getItem('CurrentUser'),
        }
      });
    }
    if (environment.NODE_ENV === 'PROD') {
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: environment.COGNITO_AUTH_CONFIG.IdentityPoolId,
        Logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_XUrBLXbtW': localStorage.getItem('CurrentUser'),
        }
      });
    }

    AWS.config.credentials.refresh(error => {
      if (error) {
        console.error(error);
      } else {
        this.s3 = new AWS.S3();
      }
    });
  }

  async upload(bucket, key, file, contentType) {
    const promiseUploadFile = new Promise((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: key,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };

      this.s3.upload(params, (err, data) => {
        if (err) {
          return reject({ error: err });
        }
        return resolve(data);
      });
    });

    return await promiseUploadFile;
  }

  async download(bucket, key) {

    const params = {
      Bucket: bucket,
      Key: key
    };

    return await this.s3.getObject(params).promise();
  }
}
