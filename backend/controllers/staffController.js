const staffModel = require("../models/staffModel");

// ============================
// GET ALL
// ============================

exports.getAllStaff = async (req,res)=>{

    try{

        const staff = await staffModel.getAllStaff();

        res.json(staff);

    }catch(err){

        console.error(err);

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

};

// ============================
// GET BY ID
// ============================

exports.getStaffById = async(req,res)=>{

    try{

        const staff = await staffModel.getStaffById(req.params.id);

        res.json(staff);

    }catch(err){

        console.error(err);

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

};

// ============================
// CREATE
// ============================

exports.createStaff = async(req,res)=>{

    try{

        const result = await staffModel.createStaff(req.body);

        res.json({

            success:true,

            message:"Staff Added",

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

// ============================
// UPDATE
// ============================

exports.updateStaff = async(req,res)=>{

    try{

        await staffModel.updateStaff(

            req.params.id,

            req.body

        );

        res.json({

            success:true,

            message:"Staff Updated"

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ============================
// DELETE
// ============================

exports.deleteStaff = async(req,res)=>{

    try{

        await staffModel.deleteStaff(req.params.id);

        res.json({

            success:true,

            message:"Staff Deleted"

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};