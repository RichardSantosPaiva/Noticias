# mvc

para abrir o site: "localhost:3000/" e "node app.js"
De alguma forma o deploy no vercel não funciona sempre retornando 404 ou 500, já tentei usar estas soluções para o arquivo vercel.json:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

e também:

{
      "version": 2,
      "builds": [
        {
          "src": "./index.js",
          "use": "@vercel/node"
        }
      ],
      "routes": [
        {
          "src": "/(.*)",
          "dest": "/"
        }
      ],
}
