// Configuración API
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configuracion MYSQL
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "super_proyecto",
    multipleStatements: true
});
connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Conexion correcta");
    }
});
// API
// Registro de un usuario que es empresa
app.post("/user/register/company", function (req, resp) {
    console.log(req.body);
    var user = req.body.user;
    var compania = req.body.company;
    var params = [user.email, user.password];
    var sql = "INSERT INTO Usuarios (email, password) VALUES (?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            var paramsB = [
                result.insertId, compania.company_name, compania.nif,
                compania.profile_url, compania.direccion, compania.telefono,
                compania.web_url, compania.sector, compania.descripcion
            ];
            var company = "INSERT INTO Empresas (user_id, company_name, nif, profile_url, direction, telephone, web_url, sector, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(company, paramsB, function (err, result) {
                if (err) {
                    console.log(err);
                    resp.sendStatus(500);
                }
                else {
                    resp.send(result);
                }
            });
        }
    });
});
// Registro de un usuario que es inversor
app.post("/user/register/investor", function (req, resp) {
    console.log(req.body);
    var user = req.body.user;
    var inversor = req.body.investor;
    var params = [user.email, user.password];
    var sql = "INSERT INTO Usuarios (email, password) " + "VALUES (?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            var paramsB = [result.insertId, inversor.name, inversor.surname, inversor.profile_url, inversor.postal_code];
            var investor = "INSERT INTO Inversores (user_id, name, surname, profile_url, postal_code)" + "VALUES (?, ?, ?, ?, ?)";
            connection.query(investor, paramsB, function (err, result) {
                if (err) {
                    console.log(err);
                    resp.sendStatus(500);
                }
                else {
                    resp.send(result);
                }
            });
        }
    });
});
// Login de usuario si es empresa o inversor
app.post("/user/login", function (req, resp) {
    var email = req.body.email;
    var password = req.body.password;
    var sql = "SELECT * FROM Usuarios WHERE email = ? AND password = ?";
    if (email && password) {
        connection.query(sql, [email, password], function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length === 0) {
                    resp.sendStatus(401);
                    console.log("usuario y contraseña no encontrado");
                }
                else {
                    var id = result[0].user_id;
                    var role = result[0].role;
                    var userA = "SELECT * FROM Empresas WHERE Empresas.user_id = ?";
                    var userB = "SELECT * FROM Inversores WHERE Inversores.user_id = ?";
                    if (role === 'company') {
                        connection.query(userA, [id, role], function (err, result2) {
                            if (err) {
                                resp.sendStatus(500);
                            }
                            else {
                                resp.send(result2);
                            }
                        });
                    }
                    else if (role === 'investor') {
                        connection.query(userB, [id, role], function (err, result2) {
                            if (err) {
                                resp.sendStatus(500);
                            }
                            else {
                                resp.send(result2);
                            }
                        });
                    }
                    else {
                        resp.sendStatus(500);
                    }
                }
            }
        });
    }
});
// Obtener informacion sobre un usuario con user_id 
app.get("/user/:id", function (req, res) {
    var user_id = req.params.id;
    var sql = "SELECT * FROM Usuarios WHERE Usuarios.user_id = ?";
    var value = [user_id];
    connection.query(sql, value, function (err, data) {
        if (err)
            throw err;
        console.log(data);
        if (data.length > 0 && data[0].role === 'company') {
            sql = "SELECT * FROM Empresas WHERE user_id = ?";
            connection.query(sql, value, function (err, data) {
                if (err)
                    throw err;
                console.log(data);
                res.send(data);
            });
        }
        else if (data.length > 0 && data[0].role === 'investor') {
            sql = "SELECT * FROM Inversores Where user_id = ?";
            connection.query(sql, value, function (err, data) {
                if (err)
                    throw err;
                console.log("test");
                console.log(data);
                res.send(data);
            });
        }
        else {
            res.sendStatus(404);
        }
    });
});
// Modificar usuario
app.put("/user", function (req, resp) {
    var params = [req.body.email, req.body.password, req.body.user_id];
    var sql = "UPDATE Usuarios SET email = ?, password = ? WHERE user_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            resp.send(result);
        }
    });
});
// Obtener proyectos
app.get("/projects", function (req, resp) {
    var sql = "SELECT * FROM Proyectos";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Obtiene proyectos según filtros pasados por el usuario
app.get("/projects/filters", function (req, resp) {
    var sector = req.body.sector;
    var min = req.body.min;
    var max = req.body.max;
    var end_date = req.body.end_date;
    var sql = "SELECT * FROM Proyectos WHERE ";
    if (sector) {
        sql += "sector = " + sector;
    }
    if (min) {
        sql += "min < " + min;
    }
    if (max) {
        sql += "max < " + max;
    }
    if (end_date) {
        sql += "end_date < " + end_date;
    }
    connection.query(sql, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Obtener proyectos por id de proyecto
app.get("/projects/:id", function (req, resp) {
    var id = req.params.id;
    var sql = "SELECT * FROM Proyectos WHERE project_id = ?";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Obtener proyectos por id de usuario
app.get("/projects/user/:id", function (req, resp) {
    var id = req.params.id;
    var sql = "SELECT * FROM Proyectos JOIN Proyecto-Empresa ON Proyectos.project_id = Proyecto-Empresa.project_id JOIN Empresas ON Proyecto-Empresa.company_id = Empresas.company_id WHERE Empresas.user_id = ?";
    connection.query(sql, id, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Obtener proyectos favoritos asociados a inversor
app.get("/projects/investor/:id", function (req, resp) {
    var id = req.params.id;
    var sql = "SELECT *  FROM Favoritos WHERE investor_id = ?";
    connection.query(sql, id, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Obtener proyectos favoritos asociados a inversor
app.get("/projects/investor/:id", function (req, resp) {
    var id = req.params.id;
    var sql = "SELECT *  FROM Favoritos WHERE investor_id = ?";
    connection.query(sql, id, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Añadir proyecto favorito a un inversor
app.post("/projects/favorites/:id", function (req, resp) {
    var params = [req.body.investor_id, req.body.projects_id];
    var sql = "INSERT INTO Favoritos (investor_id, project_id) " + "VALUES (?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Añadir proyecto Invertido a un inversor
app.post("/projects/invested", function (req, resp) {
    var params = [req.body.projects_id, req.body.investor_id];
    var sql = "INSERT INTO `proyecto-inversor` (project_id, investor_id) VALUES (?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            console.log(result);
            resp.send(result);
        }
    });
});
// borrar proyecto Invertido a un inversor
app["delete"]("//projects/invested", function (req, resp) {
    var params = [req.body.projects_id, req.body.investor_id];
    var sql = "DELETE FROM `proyecto-inversor` WHERE project_id=? AND investor_id=?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            console.log(result);
            resp.send(result);
        }
    });
});
// Añadir proyecto
app.post("/projects", function (req, resp) {
    var params = [req.body.project_name, req.body.description, req.body.total_amount, req.body.remaining_amount, req.body.end_date, req.body.project_img_url, req.body.sector, req.body.update_];
    var sql = "INSERT INTO Proyectos (project_name, description, total_amount, remaining_amount, end_date, project_img_url, sector, update_) " + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Modificar proyecto
app.put("/projects", function (req, resp) {
    var params = [req.body.project_name, req.body.description, req.body.total_amount, req.body.remaining_amount, req.body.end_date, req.body.project_img_url, req.body.sector, req.body.update_, req.body.project_id];
    var sql = "UPDATE Proyectos SET project_name = ?, description = ?, total_amount = ?, remaining_amount = ?, end_date = ?, project_img_url = ?, sector = ?, update_ = ? WHERE project_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Borrar un proyecto
app["delete"]("/projects", function (req, resp) {
    var params = req.body.project_id;
    var sql = "DELETE FROM Proyectos WHERE project_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Relación conversación y mensajes
app.get("/conversation/:id", function (req, resp) {
    var id = req.params.id;
    var sql = "SELECT * FROM `Mensaje-Usuario` JOIN Mensajes ON `Mensaje-Usuario`.message_id = Mensajes.message_id WHERE `Mensaje-Usuario`.conversation_id = ?";
    connection.query(sql, id, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
app.get("/conversations/:user_id", function (req, res) {
    var user_id = req.params.user_id;
    var query = "\n        SELECT * \n        FROM `Mensaje-Usuario` \n        JOIN Mensajes \n        ON `Mensaje-Usuario`.message_id = Mensajes.message_id \n        JOIN `Conversaciones` \n        ON `Mensaje-Usuario`.conversation_id = `Conversaciones`.conversation_id \n        WHERE `Conversaciones`.sender = ? OR `Conversaciones`.receiver = ? \n        GROUP BY  `Conversaciones`.conversation_id, Mensajes.message_id \n        ORDER BY Conversaciones.conversation_id ASC, date DESC;";
    query += "\n        SELECT * \n        FROM Conversaciones \n        WHERE `Conversaciones`.sender = ? OR `Conversaciones`.receiver = ?;\n    ";
    query += "\n        SELECT Empresas.profile_url, Empresas.user_id, Conversaciones.conversation_id, Empresas.company_name as name\n        FROM Conversaciones \n        JOIN Empresas\n        ON Conversaciones.sender = Empresas.user_id OR Conversaciones.receiver = Empresas.user_id\n        WHERE `Conversaciones`.sender = ? OR `Conversaciones`.receiver = ? \n        GROUP BY user_id;\n    ";
    query += "\n        SELECT Inversores.profile_url, Inversores.user_id, Conversaciones.conversation_id, Inversores.name as name\n        FROM Conversaciones \n        JOIN Inversores\n        ON Conversaciones.sender = Inversores.user_id OR Conversaciones.receiver = Inversores.user_id\n        WHERE `Conversaciones`.sender = ? OR `Conversaciones`.receiver = ? \n        GROUP BY user_id;\n    ";
    connection.query(query, [user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id], function (err, data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (err)
                throw err;
            res.send(data);
            return [2 /*return*/];
        });
    }); });
});
// enviar mensaje
app.put("/conversations", function (req, res) {
    console.log(req.body);
    var m = req.body.mensaje;
    var conversation_id = req.body.conversation_id;
    var sql = "INSERT INTO Mensajes (message, user_id) VALUES (?,?)";
    connection.query(sql, [m.mensaje, m.user_id], function (err, data) {
        if (err)
            throw err;
        sql = "INSERT INTO `Mensaje-Usuario` (conversation_id, message_id) VALUES (?,?)";
        connection.query(sql, [conversation_id, data.insertId], function (err, data2) {
            if (err)
                throw err;
            res.send({ message_id: data.insertId });
        });
    });
});
// borrar conversacion
app["delete"]("/conversations", function (req, res) {
    console.log(req.body.conversation_id);
    res.send({ "done": true });
});
// Añadir conversacion nueva
app.post("/conversations", function (req, resp) {
    console.log(req.body);
    var params = [req.body.sender, req.body.receiver];
    var sql = "INSERT INTO Conversaciones (sender, receiver) " + "VALUES (?, ?)";
    sql = "SELECT * FROM Conversaciones";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Modificar mensaje
app.put("/message", function (req, resp) {
    var params = [req.body.user_id, req.body.message, req.body.date];
    var sql = "UPDATE Mensajes SET user_id = ?, message = ?, date = ? WHERE message_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
// Borrar conversación
app["delete"]("/conversation", function (req, resp) {
    var params = req.body.conversation_id;
    var sql = "DELETE FROM Conversaciones WHERE conversation_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            resp.sendStatus(500);
        }
        else {
            resp.send(result);
        }
    });
});
app.listen(4000, console.log("Servidor funcionando en puerto 4000"));
