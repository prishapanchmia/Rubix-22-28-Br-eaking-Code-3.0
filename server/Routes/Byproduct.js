const express = require('express')
const router = express.Router();
const Byproduct = require("../Models/Byproduct");

router.post("/",async (req,res)=>{
    const { itemName,itemByproduct, use } = req.body;
    const byproduct = new Byproduct({
        itemName,
        itemByproduct,
        use
    })
    try{
        newByproduct = await byproduct.save();
        res.status(201).json({ error: "" });
    }
    catch(error){
        res.status(400).json({ error });
    }
})
router.get("/", async (req, res) => {
    const { name } = req.query;
    if (name) {
      try {
        const item = await Byproduct.find({itemName:name});
        let error = "";
        if (!item) {
          error = "No item found";
        }
        return res.status(200).json({ error, item });
      } catch (error) {
        console.log({ error });
        return res.status(400).json({ error });
      }
    }
    
        try{
            const items = await Byproduct.find({})
            return res.status(200).json({error: '', items})
        }catch(error){
            console.log({ error });
            return res.status(400).json({ error });
        }
    
  });
module.exports = router;