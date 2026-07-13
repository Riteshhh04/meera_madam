const db = require("../config/database");

// ==============================
// GET ALL PAYROLL
// ==============================

exports.getAllPayroll = async () => {

    const [rows] = await db.query(`

        SELECT

            p.payroll_id AS id,

            p.staff_id,

            s.name AS staffName,

            p.payroll_month,

            p.payroll_year,

            p.basic_salary,

            p.advance_deduction,

            p.bonus,

            p.deduction,

            p.net_salary,

            DATE_FORMAT(p.payment_date,'%Y-%m-%d') AS payment_date,

            p.payment_mode,

            p.status,

            p.notes

        FROM payroll p

        LEFT JOIN staff s

        ON p.staff_id = s.staff_id

        ORDER BY p.payroll_year DESC,
                 p.payroll_month DESC,
                 p.payroll_id DESC

    `);

    return rows;

};

// ==============================
// GET PAYROLL BY ID
// ==============================

exports.getPayrollById = async(id)=>{

    const [rows] = await db.query(`

        SELECT

            p.payroll_id AS id,

            p.staff_id,

            s.name AS staffName,

            p.payroll_month,

            p.payroll_year,

            p.basic_salary,

            p.advance_deduction,

            p.bonus,

            p.deduction,

            p.net_salary,

            DATE_FORMAT(p.payment_date,'%Y-%m-%d') AS payment_date,

            p.payment_mode,

            p.status,

            p.notes

        FROM payroll p

        LEFT JOIN staff s

        ON p.staff_id=s.staff_id

        WHERE payroll_id=?

    `,[id]);

    return rows[0];

};

// ==============================
// CREATE PAYROLL
// ==============================

exports.createPayroll = async(payroll)=>{

    const sql=`

        INSERT INTO payroll(

            staff_id,

            payroll_month,

            payroll_year,

            basic_salary,

            advance_deduction,

            bonus,

            deduction,

            net_salary,

            payment_date,

            payment_mode,

            status,

            notes

        )

        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)

    `;

    const values=[

        payroll.staff_id,

        payroll.payroll_month,

        payroll.payroll_year,

        payroll.basic_salary,

        payroll.advance_deduction,

        payroll.bonus,

        payroll.deduction,

        payroll.net_salary,

        payroll.payment_date,

        payroll.payment_mode,

        payroll.status,

        payroll.notes

    ];

    const [result]=await db.query(sql,values);

    return result;

};

// ==============================
// UPDATE PAYROLL
// ==============================

exports.updatePayroll = async(id,payroll)=>{

    const sql=`

        UPDATE payroll

        SET

            staff_id=?,

            payroll_month=?,

            payroll_year=?,

            basic_salary=?,

            advance_deduction=?,

            bonus=?,

            deduction=?,

            net_salary=?,

            payment_date=?,

            payment_mode=?,

            status=?,

            notes=?

        WHERE payroll_id=?

    `;

    const values=[

        payroll.staff_id,

        payroll.payroll_month,

        payroll.payroll_year,

        payroll.basic_salary,

        payroll.advance_deduction,

        payroll.bonus,

        payroll.deduction,

        payroll.net_salary,

        payroll.payment_date,

        payroll.payment_mode,

        payroll.status,

        payroll.notes,

        id

    ];

    const [result]=await db.query(sql,values);

    return result;

};

// ==============================
// DELETE PAYROLL
// ==============================

exports.deletePayroll = async(id)=>{

    const [result]=await db.query(

        "DELETE FROM payroll WHERE payroll_id=?",

        [id]

    );

    return result;

};