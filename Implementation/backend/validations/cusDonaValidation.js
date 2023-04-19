const joi = require("joi");

//customer payment validation

const CusPay =
    joi.object({

        cus_id: joi.string().required(),
        pet_id: joi.string().required(),
        payment: joi.string().required(),
        status: joi.string().valid('verified', 'CANCELED', 'PAID', 'FINISHED').required(),

    });

//customer doantion validation

const Schema =
    joi.object({

        cus_id: joi.string().required(),
        description: joi.string().max(100).required(),
        price: joi.number().required()


    });



//Organization validation

const Orgschema = joi.object({

    org_name: joi.string().required(),
    org_place: joi.string().max(100).required(),
    org_email: joi.string().email().required(),
    org_logo: joi.string().required(),
    org_type: joi.string().valid('Regional', 'Global').required(),

    org_Resources: joi.string().valid('Small', 'Medium', 'Large').required(),
    org_description: joi.string().max(100).required(),


});




//Transaction validation

const Transchema = joi.object({

    tran_title: joi.string().required(),
    tran_type: joi.string().required(),
    tran_target: joi.string().valid('Health Service Management', 'Stock Management', 'Event Management', 'Vehicle Management', 'Supplier Management').required(),
    tran_amount: joi.number().required(),
    tran_date: joi.string().required(),
    tran_time: joi.string().required(),
    tran_status: joi.string().valid('CANCELED', 'PAID', 'FINISHED').required(),


});




module.exports = { CusPay, Schema, Orgschema, Transchema };

