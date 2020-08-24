# Project Name

my-app-notable

> Coding Challenge from Notable Health

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)

## Usage

- Install dependencies
- Start server with script 'yarn start'
- Populate database with script 'yarn populate'

## Requirements

- Node 14.8.0
- MongoDB

### Installing Dependencies

From within the root directory:

```sh
yarn add
```

## CRUD API Routes

'GET': /doctors

'GET': /appointments/doctor/:doctorID/date/:date

'DELETE': /appointments/doctor/:doctorID/delete/:apptID

'POST': /appointments/doctor/:doctorID/insert
