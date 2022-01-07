const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const { application } = require('express');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1942",
    database: "gts_schema"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req,res)=>{
    const sqlSelect = "SELECT * FROM thesis";
    db.query(sqlSelect,(err,result) =>{
        res.send(result);
    })
})

app.post('/api/search', (req,res)=>{
    
    const SearchThesis = req.body.SearchThesis
    const SearchAuthor = req.body.SearchAuthor
    const SearchType = req.body.SearchType
    if(SearchType == 'Any'){
        console.log("assadxc")
        const sqlSearch = "SELECT * FROM thesis WHERE Title Like '%"+SearchThesis+"%' and Author like '%"+SearchAuthor+"%'"
        db.query(sqlSearch,(err,result) =>{
            res.send(result);
            console.log(result);
            
        })
        db.query
    }
    else{
        console.log(SearchType)
        const sqlSearch = "SELECT * FROM thesis WHERE Title Like '%"+SearchThesis+"%' and Author like '%"+SearchAuthor+"%' and Type like '"+SearchType+"'"
        db.query(sqlSearch,(err,result) =>{
            res.send(result);
            console.log(result);
            
        })
        db.query
    }
    
    
})
app.get('/api/getUniversities', (req,res)=>{
    
    const getUniversities = "select UName,CASE WHEN University IS NOT NULL THEN (SELECT Count(*) from thesis WHERE University = UName) ELSE 0 END AS Number_of_Thesis from university UName left join thesis University on UName = University GROUP BY UName ORDER BY Number_of_Thesis DESC";
    db.query(getUniversities,(err,result)=>{
        res.send(result)
       
    }) 
})

app.get('/api/getInstitutes', (req,res)=>{
    
    const getInstitutes = "select IName,CASE WHEN Institute IS NOT NULL THEN (SELECT Count(*) from thesis WHERE Institute = IName) ELSE 0 END AS Number_of_Universities from institute IName left join thesis Institute on IName = Institute GROUP BY IName ORDER BY Number_of_Universities DESC";
    db.query(getInstitutes,(err,result)=>{
        res.send(result)
       
    }) 
})

app.post('/api/addInstitute', (req,res)=>{
    const Institute = req.body.Institute;
    const addInstitute = "INSERT INTO institute (IName) VALUES ('"+Institute+"')"
    db.query(addInstitute,(err,result)=>{
        console.log(result)
    }) 
})

app.post('/api/addUniversity', (req,res)=>{
    const University = req.body.University;
    const addUniversity = "INSERT INTO university (UName) VALUES ('"+University+"')"
    db.query(addUniversity,(err,result)=>{
        
    }) 
})

app.post('/api/delete',(req,res)=>{
    const ThesisTitle = req.body.DeleteTitle
    const sqlDelete = "DELETE FROM thesis WHERE Title = '"+ThesisTitle+"'"
    db.query(sqlDelete, (err,result)=>{
        res.send(result);
        console.log(err);
        console.log(res)
    })
})
app.post("/api/insert", (req,res)=>{

    const Title= req.body.Title
    const Abstract = req.body.Abstract
    const Author = req.body.Author
    const Year = req.body.Year
    const Type = req.body.Type
    const University = req.body.University
    const Institute = req.body.Institute
    const Number_of_pages= req.body.Number_of_pages
    const Language = req.body.Language
    const Submission_date = req.body.Submission_date
    const Topic = req.body.Topic
    //  INSERT INTO `gts_schema`.`thesis` (`Title`, `Abstract`, `Author`, `Year`, `Type`, `University`, `Institute`, `Number_of_pages`, `Language`, `Submission_date`) VALUES ('titlee', 'abs', 'aut', 2011, 'Yüksek ls', 'Uni', 'nst', 'numbo', 'Lang', '2019-04-03');

    const sqlInsert = "INSERT INTO thesis (`Title`, `Abstract`, `Author`, `Year`, `Type`, `University`, `Institute`, `Number_of_pages`, `Language`, `Submission_date`,`Topic`) VALUES (?,?,?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert, [Title,Abstract,Author,Year,Type,University,Institute,Number_of_pages,Language,Submission_date,Topic], (err,result) =>{
        console.log(result);
    })
    db.query
})



app.listen(3001, ()=>{
    console.log("running on port 3001");
})