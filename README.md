# Backup Service
Express service to store encrypted backups

## Getting started

#### Dependencies
* MongoDB (Installation Guide: https://docs.mongodb.com/v3.2/installation/)
* yarn

#### Setup Server
1. Install dependencies `yarn install`
2. start server `yarn start`

#### Run tests
`yarn test`

## Endpoints

### Store Backup
Endpoint: POST `/store-backup`

**Required Data:** 
```
{
    auth: {
        pubKey: <hex-public-key>,
        date: <current date in ISO format>,
        sig: <signature of date generated with the private key related to the public key>,
    },
    data: {
        keys: [
            {
                pubKey: <public key used to encrypt>,
                cipher: <encrypted symmetric encryption key>',
            }
        ],
        data: 'cipher text of data'
    }
}
```


### Get Backup
Endpoint: POST `/get-backup`

**Required Data:** 
```
{
    auth: {
        pubKey: <hex-public-key>,
        date: <current date in ISO format>,
        sig: <signature of date generated with the private key related to the public key>,
    }
}
```
