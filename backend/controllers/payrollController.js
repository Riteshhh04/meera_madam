const payrollModel = require("../models/payrollModel");

// GET ALL

exports.getAllPayroll = async(req,res)=>{

    try{

        const rows=await payrollModel.getAllPayroll();

        res.json(rows);

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// GET ONE

exports.getPayrollById = async(req,res)=>{

    try{

        const row=await payrollModel.getPayrollById(req.params.id);

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

exports.createPayroll = async(req,res)=>{

    try{

        const result=await payrollModel.createPayroll(req.body);

        res.json({

            success:true,

            id:result.insertId,

            message:"Payroll Created"

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

exports.updatePayroll = async(req,res)=>{

    try{

        await payrollModel.updatePayroll(

            req.params.id,

            req.body

        );

        res.json({

            success:true,

            message:"Payroll Updated"

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

exports.deletePayroll = async(req,res)=>{

    try{

        await payrollModel.deletePayroll(req.params.id);

        res.json({

            success:true,

            message:"Payroll Deleted"

        });

    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};