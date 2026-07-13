CREATE DATABASE art_management;

USE art_management;

CREATE TABLE artworks (
    artwork_id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    medium ENUM(
        'Resin Art',
        'Flower Preservation',
        'Resin Jewellery',
        'Resin Coasters',
        'Photo Frame',
        'Keychain',
        'Resin Clock',
        'Resin Table',
        'Custom Commission',
        'Other'
    ) NOT NULL DEFAULT 'Resin Art',

    client_id INT NULL,

    dimensions VARCHAR(100),

    status ENUM(
        'Concept',
        'Curing',
        'Completed',
        'Delivered'
    ) NOT NULL DEFAULT 'Concept',

    price DECIMAL(10,2) DEFAULT 0.00,

    date_completed DATE,

    notes TEXT,

    image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (client_id)
        REFERENCES clients(client_id)
        ON DELETE SET NULL
);

CREATE TABLE clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    type ENUM(
        'Individual',
        'Boutique / Retail',
        'Interior Designer',
        'Corporate Gifting',
        'Bridal / Events',
        'Other'
    ) NOT NULL DEFAULT 'Individual',

    phone VARCHAR(20),

    email VARCHAR(150),

    city VARCHAR(100),

    status ENUM(
        'Active',
        'Lead',
        'Past'
    ) NOT NULL DEFAULT 'Lead',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM(
        'Admin',
        'Manager',
        'Staff'
    ) NOT NULL DEFAULT 'Admin',

    profile_photo VARCHAR(255),

    status ENUM(
        'Active',
        'Inactive'
    ) DEFAULT 'Active',

    remember_token VARCHAR(255),

    last_login DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    role ENUM(
        'Resin Artist',
        'Studio Assistant',
        'Packaging',
        'Finishing',
        'Social Media',
        'Sales',
        'Helper',
        'Intern',
        'Other'
    ) NOT NULL DEFAULT 'Studio Assistant',

    salary DECIMAL(10,2) NOT NULL,

    phone VARCHAR(20),

    join_date DATE,

    status ENUM(
        'Active',
        'On Leave',
        'Inactive'
    ) NOT NULL DEFAULT 'Active',

    payment_mode ENUM(
        'UPI',
        'Bank Transfer',
        'Cash',
        'Cheque'
    ) NOT NULL DEFAULT 'UPI',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE advances (
    advance_id INT AUTO_INCREMENT PRIMARY KEY,

    staff_id INT NOT NULL,

    advance_date DATE NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    per_month DECIMAL(10,2) DEFAULT 0.00,

    reason TEXT,

    outstanding DECIMAL(10,2) NOT NULL,

    status ENUM(
        'Active',
        'Closed'
    ) NOT NULL DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_advance_staff
        FOREIGN KEY (staff_id)
        REFERENCES staff(staff_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,

    expense_date DATE NOT NULL,

    category ENUM(
        'Resin & Chemicals',
        'Molds & Tools',
        'Flowers / Botanicals',
        'Packaging',
        'Rent',
        'Utilities',
        'Marketing',
        'Transport',
        'Miscellaneous'
    ) NOT NULL DEFAULT 'Resin & Chemicals',

    description VARCHAR(255),

    amount DECIMAL(10,2) NOT NULL,

    payment_mode ENUM(
        'Cash',
        'UPI',
        'Bank Transfer',
        'Card',
        'Cheque'
    ) NOT NULL DEFAULT 'UPI',

    vendor VARCHAR(150),

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE bills (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,

    bill_name VARCHAR(150) NOT NULL,

    vendor VARCHAR(150),

    category ENUM(
        'Rent',
        'Utilities',
        'Supplies',
        'Equipment',
        'Marketing',
        'Salaries',
        'Tax / GST',
        'Repairs',
        'Subscription',
        'Other'
    ) NOT NULL DEFAULT 'Rent',

    amount DECIMAL(10,2) NOT NULL,

    due_date DATE,

    status ENUM(
        'Unpaid',
        'Paid',
        'Overdue'
    ) NOT NULL DEFAULT 'Unpaid',

    paid_date DATE,

    payment_mode ENUM(
        'UPI',
        'Bank Transfer',
        'Cash',
        'Card',
        'Cheque'
    ) NOT NULL DEFAULT 'UPI',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE meetings (
    meeting_id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    with_whom VARCHAR(150),

    meeting_date DATE NOT NULL,

    meeting_time TIME,

    mode ENUM(
        'In-person',
        'Call',
        'Video'
    ) NOT NULL DEFAULT 'Call',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,

    invoice_no VARCHAR(30) NOT NULL UNIQUE,

    client_id INT NOT NULL,

    description VARCHAR(255),

    subtotal DECIMAL(10,2) NOT NULL,

    tax_rate DECIMAL(5,2) NOT NULL DEFAULT 18.00,

    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    total DECIMAL(10,2) NOT NULL,

    issue_date DATE,

    due_date DATE,

    status ENUM(
        'Draft',
        'Sent',
        'Paid',
        'Overdue',
        'Cancelled'
    ) NOT NULL DEFAULT 'Draft',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_invoice_client
        FOREIGN KEY (client_id)
        REFERENCES clients(client_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,

    invoice_id INT NOT NULL,

    client_id INT NOT NULL,

    artwork_description VARCHAR(255),

    total_amount DECIMAL(10,2) NOT NULL,

    amount_paid DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    pending_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    status ENUM(
        'Pending',
        'Partial',
        'Paid',
        'Overdue'
    ) NOT NULL DEFAULT 'Pending',

    due_date DATE,

    paid_date DATE,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_invoice
        FOREIGN KEY (invoice_id)
        REFERENCES invoices(invoice_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_payment_client
        FOREIGN KEY (client_id)
        REFERENCES clients(client_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE payroll (
    payroll_id INT AUTO_INCREMENT PRIMARY KEY,

    staff_id INT NOT NULL,

    payroll_month VARCHAR(20) NOT NULL,

    payroll_year YEAR NOT NULL,

    basic_salary DECIMAL(10,2) NOT NULL,

    advance_deduction DECIMAL(10,2) DEFAULT 0.00,

    bonus DECIMAL(10,2) DEFAULT 0.00,

    deduction DECIMAL(10,2) DEFAULT 0.00,

    net_salary DECIMAL(10,2) NOT NULL,

    payment_date DATE,

    payment_mode ENUM(
        'UPI',
        'Bank Transfer',
        'Cash',
        'Cheque'
    ) NOT NULL DEFAULT 'UPI',

    status ENUM(
        'Pending',
        'Paid'
    ) NOT NULL DEFAULT 'Pending',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payroll_staff
        FOREIGN KEY (staff_id)
        REFERENCES staff(staff_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

SELECT * FROM clients;

SELECT * FROM artworks;

SELECT * FROM staff;

SELECT * FROM advances;

SELECT * FROM payroll;

SELECT * FROM expenses;

SELECT * FROM bills;

SELECT * FROM meetings;

DROP TABLE meetings;

CREATE TABLE meetings (
    meeting_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    with_whom VARCHAR(150),
    meeting_date DATE NOT NULL,
    meeting_time TIME,
    mode ENUM('In-person', 'Call', 'Video') NOT NULL DEFAULT 'Call',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_meeting_client 
        FOREIGN KEY (client_id) 
        REFERENCES clients(client_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

SELECT * FROM meetings;

SELECT * FROM invoices;

