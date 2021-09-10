# slash-create Vercel Test
This is a test server for slash-create using Vercel.

## Installation
```sh
npx degit Snazzah/slash-create-template slash-commands
cd slash-commands
npm i -g yarn
yarn
cp .env.example .env # this copies the .env file, edit variables in this file!
# Create and edit commands in the `commands` folder
yarn start
```

### Using PM2
```sh
npm i -g pm2
# Follow the installation process above
pm2 start pm2.json
pm2 dump # recommended
```
