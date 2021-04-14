const express = require("express")
const nunjucks = require("nunjucks")
const videos = require("./data")

const server = express()

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
})

server.get("/", function (req, res) {
  const about = {
    avatar_url: "https://avatars.githubusercontent.com/u/6643122?v=4",
    name: "Mayk Brito",
    role: "Instrutor - RocketSeat",
    description:
      'Programador full-stack, focado em trazer o melhor ensino para iniciantes em programação. Colaborador da <a href="https://rocketseat.com.br" target="_blank">Rocketseat </a>',
    links: [
      { name: "Github", url: "https://github.com/maykbrito" },
      { name: "Twitter", url: "https://twitter.com/maykbrito" },
      { name: "LinkedIn", url: "https://linkedin.com/in/maykbrito" },
    ],
  }
  return res.render("about", { about })
})

server.get("/portifolio", function (req, res) {
  return res.render("portifolio", { items: videos })
})

server.get("/video", function (req, res) {
  const id = req.query.id

  const video = videos.find(function (video) {
    if (video.id == id) {
      return true
    }
  })

  if (!video) {
    return res.send(id)
  }

  return res.render("video", { video })
})

server.listen(5000, function () {
  console.log("server is running")
})
