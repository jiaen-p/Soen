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
        database: "super_proyecto"
    }
);

connection.connect(function(err)
{
    if(err) { console.log (err); }
    else { console.log ("Conexion correcta") }
}
);

// API

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
    

app.get("/projects/:id",
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

// conversación y me da los mensajes de la conversación
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

//añadir conversacion nueva

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

//modificar mensaje

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


// borrar conversación
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
