
# ECM-frontend

Evaluation-Contract management App is a project to manage the contracts. 

You can create contract with desired documents. Also you can edit(update) or delete contracts and see a list of your contracts in home page.

Also it has a user-managemnet app that you can define new users to system or edit your profile.

This is the fontend of [ECM-backend](https://github.com/MohammadRezaAsgari/ECM-backend), so if you've not deployed the backend, go to the repo and deploy it first.


## Deployment

After cloning the repository you need to install node.js 
Then install the "serve" package globally

```bash 
  npm install -g serve
```

Then run the following command at root directory to serve the html files

```bash 
  npx -s serve .
```
You'll be able to access the website at localhost:3000 and also Your-local-network-IP:3000

## Notes
- This frontend is talking to this backend -> [ECM-backend](https://github.com/MohammadRezaAsgari/ECM-backend). To send requests to it, you should set the BackEnd_URL variable at first line of app.js located in /assets/js/app.js
- This project has an existing admin user with username = 'superuser' and password = '12345678' 
