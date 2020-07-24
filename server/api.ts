// Configuración API

import { resolve } from "path";

let express = require("express");
let bodyParser = require('body-parser');
let app = express();
let cors = require('cors');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion MYSQL

let mysql = require("mysql");
let connection = mysql.createConnection
(
    {
        host: "localhost",
        user: "root",
        password: null,
        database: "super_proyecto",
        multipleStatements: true
    }
);

connection.connect(function(err)
{
    if(err) { console.log (err); }
    else { console.log ("Conexion correcta") }
}
);

// API

// Registro de un usuario que es empresa
app.post("/user/register/company",
    function(req, resp)
    {
        let params = [req.body.email, req.body.password];
        let sql = "INSERT INTO Usuarios (email, password) VALUES (?, ?)";
       
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err);
                    resp.sendStatus(500); 
                } else{
                    let paramsB = [result.insertId, req.body.company_name, req.body.nif, req.body.logo_url, req.body.direction, req.body.telephone, req.body.web_url, req.body.sector, req.body.description];
                    let company = "INSERT INTO Empresas (user_id, company_name, nif, logo_url, direction, telephone, web_url, sector, description)" + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    
                    connection.query(company, paramsB, function (err, result)
                    {
                        if(err){
                            console.log(err); 
                            resp.sendStatus(500);
                        }
                        else
                        {
                            resp.send(result);
                        }
                    }
                    );
                }   
            }
        );
    }
    );

// Registro de un usuario que es inversor
app.post("/user/register/investor",
    function(req, resp)
    {
        let params = [req.body.email, req.body.password];
        let sql = "INSERT INTO Usuarios (email, password) " + "VALUES (?, ?)";
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    
                    let paramsB = [result.insertId, req.body.name, req.body.surname, req.body.profile_url, req.body.postal_code];
                    let investor = "INSERT INTO Inversores (user_id, name, surname, profile_url, postal_code)" + "VALUES (?, ?, ?, ?, ?)";
                    connection.query(investor, paramsB, function (err, result)
                    {
                        if(err){
                            console.log(err); 
                            resp.sendStatus(500);
                        }
                        else
                        {
                            resp.send(result);
                        }
                    }
                    );
                }   
            }
        );
    }
    );

// Login de usuario si es empresa o inversor
app.post("/user/login",
    function(req, resp)
    {
        let email = req.body.email;
        let password = req.body.password;
        
        let sql = "SELECT * FROM Usuarios WHERE email = ? AND password = ?"
        if(email && password){
            connection.query(sql, [email, password], function(err, result){
                if(result[0].password != password){
                    resp.send('Email o contraseña incorrecto');

                } else if(err){
                    console.log(err);

                } else{
                    
                    let id = result[0].user_id;
                    let role = result[0].role;
                    
                    let userA = "SELECT * FROM Empresas WHERE Empresas.user_id = ?";
                    let userB = "SELECT * FROM Inversores WHERE Inversores.user_id = ?";

                    connection.query(userA, [id, role], function (err, result)
                    {
                        if(role === 'company')
                        {
                            resp.send(result); 
                            
                        } else if(err){
                            console.log(err);

                        } else {
                            
                            connection.query(userB, [id, role], function (err, result)
                            {
                                if(err){
                                    console.log(err); 
                                    resp.sendStatus(500);
                                } else{
                                    if(role === 'investor'){
                                        resp.send(result);
                                    } else{
                                        resp.sendStatus(404);
                                    }
                                }
                            }
                            );
                        }
                    }
                    );
                }
            }
            );
        }   
    }
    );

// Obtener informacion sobre un usuario con user_id 
app.get("/user/:id", (req,res) => {
    let user_id = req.params.id
    let sql = "SELECT * FROM Usuarios WHERE Usuarios.user_id = ?"
    let value = [user_id]
    connection.query(sql, value, (err, data) => {
        if (err) throw err
        console.log(data)
        if (data.length > 0 && data[0].role === 'company'){
            sql = "SELECT * FROM Empresas WHERE user_id = ?"
            connection.query(sql, value, (err, data) => {
                if (err) throw err
                console.log(data)
                res.send(data)
            })
        } else if (data.length > 0 && data[0].role === 'investor'){
            sql = "SELECT * FROM Inversores Where user_id = ?"
            connection.query(sql, value, (err, data) => {
                if (err) throw err
                console.log("test")
                console.log(data)
                res.send(data)
            })
        } else {
            res.sendStatus(404)
        }
    })
})    



// Modificar usuario
app.put("/user",
    function(req, resp)
    {
        let params = [req.body.email, req.body.password, req.body.user_id];
        let sql = "UPDATE Usuarios SET email = ?, password = ? WHERE user_id = ?";
        connection.query(sql, params, function (err, result)
            {
                if(err){
                console.log(err); 
                } else{
                resp.send(result);
                }    
            }
        );       
    }
    );

// Obtener proyectos
app.get("/projects",
    function(req, resp)
    {
        let sql = "SELECT * FROM Proyectos";
        connection.query(sql, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }
            }
        ); 
    }
    );

// Obtener proyectos por id de proyecto
app.get("/projects/:id",
    function(req, resp)
    {
        let id = req.params.id;
        let sql = "SELECT * FROM Proyectos WHERE project_id = ?";
        connection.query(sql, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }
            }
        ); 
    }
    );
    
// Obtener proyectos por id de usuario
app.get("/projects/user/:id",
    function(req, resp)
    {
        let id = req.params.id;
        let sql = "SELECT project_id FROM Proyectos JOIN IN Proyecto-Empresa ON Proyectos.project_id = Proyecto-Empresa.project_id JOIN IN Empresas ON Proyecto-Empresa.company_id = Empresas.company_id JOIN IN Usuarios ON Empresas.user_id = Usuarios.user_id JOIN IN Inversores ON Inversores.user_id = Usuarios.user_id WHERE Usuarios.user_id = ?";
        connection.query(sql, id, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }
            }
        ); 
    }
    );

// Obtener proyectos favoritos asociados a inversor
app.get("/projects/investor/:id",
    function(req, resp)
    {
        let id = req.params.id;
        let sql = "SELECT *  FROM Favoritos WHERE investor_id = ?";
        connection.query(sql, id, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }
            }
        ); 
    }
    );

// Añadir proyecto favorito a un inversor
app.post("/projects/favorites/:id",
function(req, resp)
{
    let params = [req.body.investor_id, req.body.projects_id]
    let sql = "INSERT INTO Favoritos (investor_id, project_id) " + "VALUES (?, ?)";
    connection.query(sql, params, function (err, result)
        {
            if(err){
                console.log(err); 
                resp.sendStatus(500);
            } else{
                resp.send(result);
            }   
        }
    );
}
);

// Añadir proyecto Invertido a un inversor
app.post("/projects/invested",
function(req, resp)
{
    let params = [req.body.projects_id, req.body.investor_id]
    let sql = "INSERT INTO `proyecto-inversor` (project_id, investor_id) VALUES (?, ?)";
    connection.query(sql, params, function (err, result)
        {
            if(err){
                console.log(err); 
                resp.sendStatus(500);
            } else{console.log(result)
                resp.send(result);
            }   
        }
    );
}
);

// borrar proyecto Invertido a un inversor
app.delete("//projects/invested", 
function(req, resp)
{
    let params = [req.body.projects_id, req.body.investor_id]
    let sql = "DELETE FROM `proyecto-inversor` WHERE project_id=? AND investor_id=?"; 
    connection.query(sql, params, function (err, result)
        {
            if(err){
                console.log(err); 
                resp.sendStatus(500);
            } else{console.log(result)
                resp.send(result);
            }   
        }
    );
}
);

// Añadir proyecto
app.post("/projects",
    function(req, resp)
    {
        let params = [req.body.project_name, req.body.description, req.body.total_amount, req.body.remaining_amount, req.body.end_date, req.body.project_img_url, req.body.sector, req.body.update_]
        let sql = "INSERT INTO Proyectos (project_name, description, total_amount, remaining_amount, end_date, project_img_url, sector, update_) " + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }   
            }
        );
    }
    );

// Modificar proyecto
app.put("/projects",
    function(req, resp)
    {
        let params = [req.body.project_name, req.body.description, req.body.total_amount, req.body.remaining_amount, req.body.end_date, req.body.project_img_url, req.body.sector, req.body.update_, req.body.project_id];
        let sql = "UPDATE Proyectos SET project_name = ?, description = ?, total_amount = ?, remaining_amount = ?, end_date = ?, project_img_url = ?, sector = ?, update_ = ? WHERE project_id = ?";
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }    
            }
        );      
    } 
    );

// Borrar un proyecto
app.delete("/projects",
    function(req, resp)
    {
        let params = req.body.project_id;
        let sql = "DELETE FROM Proyectos WHERE project_id = ?";
        connection.query(sql, params, function (err, result)
        {  
            if(err){
                console.log(err); 
                resp.sendStatus(500);
            } else{
                resp.send(result);
            } 
        }
        );
    }
    );

// Relación conversación y mensajes
app.get("/conversation/:id",
    function(req, resp)
    {
        let id = req.params.id;
        let sql = "SELECT * FROM `Mensaje-Usuario` JOIN Mensajes ON `Mensaje-Usuario`.message_id = Mensajes.message_id WHERE `Mensaje-Usuario`.conversation_id = ?";
        connection.query(sql, id, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }
            }
        ); 
    }
    );
app.get("/conversations/:user_id", (req,res) => {
    let user_id = req.params.user_id
    let query = `
        SELECT * 
        FROM \`Mensaje-Usuario\` 
        JOIN Mensajes 
        ON \`Mensaje-Usuario\`.message_id = Mensajes.message_id 
        JOIN \`Conversaciones\` 
        ON \`Mensaje-Usuario\`.conversation_id = \`Conversaciones\`.conversation_id 
        WHERE \`Conversaciones\`.sender = ? OR \`Conversaciones\`.receiver = ? 
        GROUP BY  \`Conversaciones\`.conversation_id, Mensajes.message_id 
        ORDER BY Conversaciones.conversation_id ASC, date DESC;`
    query += `
        SELECT * 
        FROM Conversaciones 
        WHERE \`Conversaciones\`.sender = ? OR \`Conversaciones\`.receiver = ?;
    `
    query += `
        SELECT Empresas.profile_url, Empresas.user_id, Conversaciones.conversation_id, Empresas.company_name as name
        FROM Conversaciones 
        JOIN Empresas
        ON Conversaciones.sender = Empresas.user_id OR Conversaciones.receiver = Empresas.user_id
        WHERE \`Conversaciones\`.sender = ? OR \`Conversaciones\`.receiver = ? 
        GROUP BY user_id;
    `
    query += `
        SELECT Inversores.profile_url, Inversores.user_id, Conversaciones.conversation_id, Inversores.name as name
        FROM Conversaciones 
        JOIN Inversores
        ON Conversaciones.sender = Inversores.user_id OR Conversaciones.receiver = Inversores.user_id
        WHERE \`Conversaciones\`.sender = ? OR \`Conversaciones\`.receiver = ? 
        GROUP BY user_id;
    `
    connection.query(query, [user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id], async (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

// enviar mensaje
app.put("/conversations", (req,res) => {
    console.log(req.body)
    let m = req.body.mensaje
    let conversation_id = req.body.conversation_id
    let sql = `INSERT INTO Mensajes (message, user_id) VALUES (?,?)`
    connection.query(sql,[m.mensaje, m.user_id], (err,data) => {
        if (err) throw err
        sql = `INSERT INTO \`Mensaje-Usuario\` (conversation_id, message_id) VALUES (?,?)`
        connection.query(sql, [conversation_id, data.insertId], (err, data2) => {
            if (err) throw err
            res.send({message_id: data.insertId})
        })
    })
})

// borrar conversacion
app.delete("/conversations", (req,res) => {
    console.log(req.body.conversation_id)

    res.send({"done": true})
})

// Añadir conversacion nueva
app.post("/conversation",
    function(req, resp)
    {
        let params = [req.body.sender, req.body.receiver];
        let sql = "INSERT INTO Conversaciones (sender, receiver) " + "VALUES (?, ?)";
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }   
            }
        );
    }
    );

// Modificar mensaje

app.put("/message",
function(req, resp)
{
        let params = [req.body.user_id, req.body.message, req.body.date];
        let sql = "UPDATE Mensajes SET user_id = ?, message = ?, date = ? WHERE message_id = ?";
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                }    
            }
        ); 
}
);


// Borrar conversación
app.delete("/conversation",
    function(req, resp)
    {
        let params = req.body.conversation_id;
        let sql = "DELETE FROM Conversaciones WHERE conversation_id = ?";
        connection.query(sql, params, function (err, result)
        {  
            if(err){
                console.log(err); 
                resp.sendStatus(500);
            } else{
                resp.send(result);
            } 
        }
        );
    }
    );

app.listen(4000, console.log("Servidor funcionando en puerto 4000"));
