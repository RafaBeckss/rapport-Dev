require("dotenv-safe").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./database/mongooseConnect");
const swaggerFile = require("../swagger/swagger_output.json");
const swaggerUi = require("swagger-ui-express");
const usuarioRoutes = require("./routes/usuarioRoute");
const relatoRoutes = require("./routes/relatoRoutes");
const index = require("./routes/index");
const app = express();


app.use(express.json());
app.use(cors());
mongoose.connect();

app.use('/', index)
app.use("/projeto/usuario", usuarioRoutes);
app.use("/projeto/relato", relatoRoutes);
app.use("/minha-documentacao", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app

//Toda vez que eu alterar o meu código, no terminal eu vou colocar npm run swagger-autogen