const { execSync } = require('child_process');
const {chdir} = require('process');
const {parse} = require('yaml');
const os = require('os');

const s3_dir = process.argv[2];

const region = process.argv[3];

const aws_command = `aws --region ${region} s3 sync ./build s3://${s3_dir}/ --delete`;

const resp = execSync(aws_command).toJSON();
console.log(resp.toString());
