let db = require('../models/dbconexion');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let fs = require('fs');


let productos = {


  listar(req, res) {
    let sql = "SELECT * FROM productos";
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(result);
      }
    });
  },



  store(req, res) {

    val_nombre = req.body.descripcion;
    val_precio = req.body.precio;
    var tmp_path = req.files.imagen.path;
    var target_path = './public/images/' + req.files.imagen.name;

    fs.rename(tmp_path, target_path, () => {
      fs.unlink(tmp_path, () => {
        let sql = "INSERT INTO productos(descripcion,precio, image) VALUES(?,?,?)";
        db.query(sql, [val_nombre, val_precio, target_path], function (err, newData) {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.json(newData);
          }
        });
      })
    });
  },

  show(req, res) {
    val_id = req.params.id;
    let sql = "SELECT * FROM productos WHERE codigo=?";
    db.query(sql, [val_id], function (err, rowData) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(rowData);
      }
    });
  },


  edit(req, res) {
    val_id = req.body.codigo;
    val_nombre = req.body.descripcion;
    val_precio = req.body.precio;
    var tmp_path = req.files.imagen.path;
    var target_path = './public/images/' + req.files.imagen.name;
    
    console.log('*******************************');
    console.log(req.body);
    console.log(req.files.imagen);
    console.log('*******************************');
    
    fs.rename(tmp_path, target_path, () => {
      fs.unlink(tmp_path, () => {
        let sql = "UPDATE productos SET descripcion=?, precio=?, image=? WHERE codigo=?";
        db.query(sql, [val_nombre, val_precio, target_path, val_id], function (err, newData) {
          if (err) {
            res.sendStatus(500);
          } else {
            res.json(newData);
          }
        });
      })
    });

  },
  delete(req, res) {
    console.log(req.params);
    console.log("*****************");
    console.log(req.body);
    val_id = req.params.id;
    let sql = "DELETE FROM productos WHERE codigo=?";
    db.query(sql, [val_id], function (err, newData) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  }
}

module.exports = productos;

