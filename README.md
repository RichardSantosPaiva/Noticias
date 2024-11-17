# mvc

De alguma forma o deploy no vercel não funciona sempre retornando 404 ou 500, já tentei usar estas soluções:

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
