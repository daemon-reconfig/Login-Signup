# Auth App

A small authorisation app that is built on nextjs14. This project was an assessment for 2nd Technical Round of Unilance.

## Installation

Clone the repository by either downloading it's zip file or using terminal

```bash
git clone git@github.com:daemon-reconfig/Login-Signup.git
```
Then copy paste the following

```bash
cd Login-Signup && npm i && npx prisma generate
```
This command will take you inside the directory and install all the dependencies in the package.json and generate a prisma db which I have used as my Database.

## Building
You can either run this on dev

```bash
npm run dev
```
Or build it using 
```bash
npm run build 
```

## Features
- Easy to Use and Edit.
- Is secure and keeps the passwords hashed using bcryptjs
- Has Email Verification using [Resend](https://resend.com/docs/send-with-nodejs)
- Has 2FA in it and generates tokens using crypto 
- Checks for all the loopholes an User can take advantage of.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)