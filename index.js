const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json()) // req.body

//Routes

//get all
app.get("/test", async (req, res)=>{
try{
    const allDatas = await pool.query("SELECT * FROM test_table ");

    res.json(allDatas.rows);
}catch(err){
    console.log(err.message);
}
});


//get one
app.get('/test/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const data = await pool.query("SELECT * FROM test_table WHERE id = $1", [id]);

        res.json(data.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//insert create
app.post("/test", async (req, res)=>{
    try{
        // console.log(req.body)
        const { contents } = req.body;
        const newData = await pool.query("INSERT INTO test_table (contents) VALUES ($1) RETURNING *", [contents]);
        
        res.json(newData.rows[0])

    }catch(err){
        console.log("err")
        console.log(err.message)
    }
});

//update
app.put("/test/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { contents } = req.body;

        const updateData = await pool.query("UPDATE test_table SET contents = $1 WHERE id = $2", [contents, id])

        res.json(updateData.rows);
    }catch(err){
        console.log(err.message);
    }
})

//delete
app.delete("/test/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const deleteData = await pool.query("DELETE FROM test_table WHERE id = $1", [id]);

        res.json("Data was successfully deleted!");
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5110, ()=>{
    console.log("server is listening on port 5000");
})