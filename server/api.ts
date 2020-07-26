// Configuración API

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion MYSQL

const mysql = require("mysql");
const connection = mysql.createConnection
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
        console.log(req.body)
        let user = req.body.user
        let compania = req.body.company
        let params = [user.email, user.password, 'company'];
        let sql = "INSERT INTO Usuarios (email, password, role) VALUES (?, ?, ?)";
    //    añadir si no se quiere insertar el mismo email dos veces WHERE NOT EXISTS (SELECT email FROM Usuarios WHERE email = ?)
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err);
                    resp.sendStatus(500); 
                } else{
                    let paramsB = [
                        result.insertId, compania.company_name, compania.nif, 
                        compania.profile_url, compania.direction, compania.telefono, 
                        compania.web_url, compania.sector, compania.descripcion_company
                    ];
                    let company = "INSERT INTO Empresas (user_id, company_name, nif, profile_url, direction, telephone, web_url, sector, description_company) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    
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
        console.log(req.body)
        let user = req.body.user
        let inversor = req.body.investor
        let params = [user.email, user.password];
        let sql = "INSERT INTO Usuarios (email, password) " + "VALUES (?, ?)";
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    
                    let paramsB = [result.insertId, inversor.name, inversor.surname, inversor.profile_url, inversor.postal_code];
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
                if(err){
                    console.log(err);
                } else {
                    if(result.length === 0){
                        resp.sendStatus(401)
                        console.log("usuario y contraseña no encontrado")
                    } else {
                        let id = result[0].user_id;
                        let role = result[0].role;
                        
                        let userA = "SELECT * FROM Empresas WHERE Empresas.user_id = ?";
                        let userB = "SELECT * FROM Inversores WHERE Inversores.user_id = ?";
                        if(role === 'company'){
                            connection.query(userA, [id, role], function (err, result2){
                                if (err){
                                    resp.sendStatus(500)
                                } else {
                                    resp.send(result2)
                                }
                            });
                        } else if(role === 'investor'){
                            connection.query(userB, [id, role], function (err, result2){
                                if (err){
                                    resp.sendStatus(500)
                                } else {
                                    resp.send(result2)
                                }
                            });
                        } else {
                            resp.sendStatus(500)
                        }
                    }
                }
            }
            );
        }   
    });

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

// Obtiene numero total de proyectos 

app.get("/projects/total",
    function(req, resp)
    {
        let sql = "SELECT SUM(project_id) FROM Proyectos";
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

// Obtiene proyectos según filtros pasados por el usuario
app.get("/projects/filters",
    function(req, resp)
    {
        let params = [req.body.sector, req.body.min, req.body.max, req.body.end_date];
        let sql = "SELECT * FROM Proyectos";

        /*
        if(sector){
            sql += `sector = ${sector}`
        }
        if(min){
            sql += `min < ${min}`;
        }
        if(max){
            sql += `max < ${max}`;
        }
        if(end_date){
            sql += `end_date < ${end_date}`;
        }
        */

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

// Obtener proyectos por id de proyecto
app.get("/projects/:id",
    function(req, resp)
    {
        let id = req.params.id;
        let sql = "SELECT * FROM Proyectos WHERE project_id = ?";
        connection.query(sql, [id],  function (err, result)
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
        let sql = "SELECT * FROM Proyectos JOIN `Proyecto-Empresa` ON Proyectos.project_id = `Proyecto-Empresa`.project_id JOIN Empresas ON `Proyecto-Empresa`.company_id = Empresas.company_id WHERE Empresas.user_id = ?";
        connection.query(sql, id, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result);
                    console.log(result)
                }
            }
        ); 
    }
);


// Obtener proyectos favoritos asociados a inversor
app.get("/projects/favorites/:id",
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
app.post("/projects/favorites/",
function(req, resp)
{
    let params = [req.body.investor_id, req.body.projects_id]
    let sql = "INSERT INTO Favoritos (investor_id, project_id) VALUES (?, ?)";
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

// borrar proyecto favorito a un inversor
app.delete("/projects/favorites/", 
function(req, resp)
{
    let params = [req.body.projects_id, req.body.investor_id]
    let sql = "DELETE FROM `Favoritos` WHERE project_id=? AND investor_id=?"; 
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
// Obtener proyectos invertidos asociados a inversor
app.get("/projects/investor/:id",
    function(req, resp)
    {
        let id = req.params.id;
        let sql = "SELECT * FROM `Proyecto-Inversor` WHERE investor_id = ?";
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

// Añadir proyecto Invertido a un inversor
app.post("/projects/invested",
function(req, resp)
{
    let params = [req.body.projects_id, req.body.investor_id]
    let sql = "INSERT INTO `Proyecto-Inversor` (project_id, investor_id) VALUES (?, ?)";
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
        let project = req.body.proyecto
        let params = [project.project_name, project.description, project.total_amount, project.remaining_amount, project.end_date, project.project_img_url, project.sector, project.update_]
        let sql = "INSERT INTO Proyectos (project_name, description, total_amount, remaining_amount, end_date, project_img_url, sector, update_) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, params, function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    sql = "INSERT INTO `Proyecto-Empresa` (project_id, company_id) VALUES (?,?)"
                    params = [result.insertId, req.body.company_id]
                    connection.query(sql, params, (err, data) => {
                        if (err) {
                            resp.sendStatus(500)
                        } else {
                            resp.send(data)
                        }
                    })
                }   
            }
        );
    }
    );

// Modificar proyecto
app.put("/projects",
    function(req, resp)
    {
        let project = req.body.proyecto
        let params = [project.project_name, project.description, project.total_amount, project.remaining_amount, project.end_date.slice(0,10), project.project_img_url, project.sector, project.update, project.project_id];
        let sql = "UPDATE Proyectos SET project_name = ?, description = ?, total_amount = ?, remaining_amount = ?, end_date = ?, project_img_url = ?, sector = ?, update_ = ? WHERE project_id = ?";
        console.log(project.update)
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
// app.delete("/conversations", (req,res) => {
//     console.log(req.body.conversation_id)

//     res.send("ok")
// })

// Obtener user_id a partir de un project_id
app.post("/conversations/project",
    function(req, resp)
    {
        console.log(req.body)
        let params = [req.body.sender, req.body.receiver];
        let sql = "INSERT INTO Conversaciones (sender, receiver) " + "VALUES (?, ?)";
        sql = `
        SELECT user_id FROM Empresas 
        JOIN \`Proyecto-Empresa\` 
        ON Empresas.company_id = \`Proyecto-Empresa\`.company_id
        WHERE project_id = ?
        `
        connection.query(sql, [req.body.project_id], function (err, result)
            {
                if(err){
                    console.log(err); 
                    resp.sendStatus(500);
                } else{
                    resp.send(result[0]);
                }   
            }
        );
    }
    );

// Obtener conversacion_id

app.post("/conversations/conv_id", (req,res) => {
    let a = req.body.sender
    let b = req.body.receiver
    let sql = `SELECT conversation_id FROM Conversaciones WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)`
    // sql = `
    //     INSERT INTO Conversaciones (sender, receiver) VALUES (?,?)
    //     WHERE NOT EXISTS (SELECT conversation_id FROM Conversaciones WHERE ((sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)))
    //     `
    let params = [a,b,b,a,b,a]
    connection.query(sql, params, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            if (data[0]){
                res.send(data[0])
            } else {
                sql = `INSERT INTO Conversaciones (sender, receiver) VALUES (?,?)`
                params = [a,b]
                connection.query(sql, params, (err,data)=>{
                    if (err) throw err
                    console.log(data.insertId)
                    res.send(data.insertId)
                })
            }
        }
    })

})

// Relación conversación y mensajes
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
