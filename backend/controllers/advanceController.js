const advanceModel = require("../models/advanceModel");

// GET ALL

exports.getAllAdvances = async(req,res)=>{

    try{

        const rows = await advanceModel.getAllAdvances();

        res.json(rows);

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// GET BY ID

exports.getAdvanceById = async(req,res)=>{

    try{

        const row = await advanceModel.getAdvanceById(req.params.id);

        res.json(row);

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// CREATE

exports.createAdvance = async(req,res)=>{

    try{

        const result = await advanceModel.createAdvance(req.body);

        res.json({

            success:true,

            message:"Advance Added",

            id:result.insertId

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// UPDATE

exports.updateAdvance = async(req,res)=>{

    try{

        await advanceModel.updateAdvance(

            req.params.id,

            req.body

        );

        res.json({

            success:true,

            message:"Advance Updated"

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// DELETE

exports.deleteAdvance = async(req,res)=>{

    try{

        await advanceModel.deleteAdvance(req.params.id);

        res.json({

            success:true,

            message:"Advance Deleted"

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};