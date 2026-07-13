const db = require("../config/database");

// ==============================
// GET ALL ADVANCES
// ==============================

exports.getAllAdvances = async () => {

    const [rows] = await db.query(`

        SELECT

            a.advance_id AS id,

            a.staff_id,

            s.name AS staffName,

            DATE_FORMAT(a.advance_date,'%Y-%m-%d') AS date,

            a.amount,

            a.per_month AS perMonth,

            a.reason,

            a.outstanding,

            a.status

        FROM advances a

        LEFT JOIN staff s

        ON a.staff_id = s.staff_id

        ORDER BY a.advance_id DESC

    `);

    return rows;

};

// ==============================
// GET ADVANCE BY ID
// ==============================

exports.getAdvanceById = async (id) => {

    const [rows] = await db.query(`

        SELECT

            a.advance_id AS id,

            a.staff_id,

            s.name AS staffName,

            DATE_FORMAT(a.advance_date,'%Y-%m-%d') AS date,

            a.amount,

            a.per_month AS perMonth,

            a.reason,

            a.outstanding,

            a.status

        FROM advances a

        LEFT JOIN staff s

        ON a.staff_id = s.staff_id

        WHERE a.advance_id = ?

    `,[id]);

    return rows[0];

};

// ==============================
// CREATE ADVANCE
// ==============================

exports.createAdvance = async (advance)=>{

    const sql = `

        INSERT INTO advances

        (

            staff_id,

            advance_date,

            amount,

            per_month,

            reason,

            outstanding,

            status

        )

        VALUES

        (?,?,?,?,?,?,?)

    `;

    const values=[

        advance.staff_id,

        advance.date,

        advance.amount,

        advance.perMonth,

        advance.reason,

        advance.outstanding,

        advance.status

    ];

    const [result]=await db.query(sql,values);

    return result;

};

// ==============================
// UPDATE ADVANCE
// ==============================

exports.updateAdvance = async(id,advance)=>{

    const sql=`

        UPDATE advances

        SET

            staff_id=?,

            advance_date=?,

            amount=?,

            per_month=?,

            reason=?,

            outstanding=?,

            status=?

        WHERE advance_id=?

    `;

    const values=[

        advance.staff_id,

        advance.date,

        advance.amount,

        advance.perMonth,

        advance.reason,

        advance.outstanding,

        advance.status,

        id

    ];

    const [result]=await db.query(sql,values);

    return result;

};

// ==============================
// DELETE ADVANCE
// ==============================

exports.deleteAdvance = async(id)=>{

    const [result]=await db.query(

        "DELETE FROM advances WHERE advance_id=?",

        [id]

    );

    return result;

};