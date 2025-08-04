const express = require("express");
const cors = require("cors");
const{Pool}=require('pg');
require('dotenv').config();

const app=express();
const PORT=process.env.PORT;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
  });
  pool.connect((err, client, release) => {
    if (err) {
        console.error('資料庫連線失敗:', err.stack);
    } else {
        console.log('資料庫連線成功!');
        release();
    }
});
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});
app.use(cors());
app.use(express.json());
//API 路由
app.post('/api/mood',async(req,res)=>{
    try{
        const{score,note}=req.body;
        const today=new Date().toISOString().split('T')[0];
        //檢查今天是否已有記錄;
        const existing=await pool.query('SELECT id FROM daily_mood WHERE date= $1',[today]);
        if(existing.rows.length>0){
        //更新現有紀錄
        const result= await pool.query(
        'UPDATE daily_mood SET score = $1, note= $2 WHERE date = $3 RETURNING *',
        [score,note,today]
        );
        res.json(result.rows[0]);
        }else{
            //新增紀錄
            const result=await pool.query(
                'INSERT INTO daily_mood (date,score,note) VALUES ($1,$2,$3)RETURNING *',
                [score,note,today]
            );
            res.json(result.rows[0])
        }
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Server error'});
    }
});

app.get('/api/mood/today',async(req,res)=>{
    try{
        const today= new Date().toISOString().split('T')[0];
        const result= await pool.query(
            'SELECT * FROM daily_mood WHERE date= $1',
            [today]
        );

        if(result.rows.length > 0){
            res.json(result.rows[0]);
        }else{
            res.json(null);
        }
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Server error'})   
    }
});

app.listen(PORT,()=>{
    console.log(`伺服器啟動${PORT}`);
    
})