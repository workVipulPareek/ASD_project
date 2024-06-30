import mongoose from "mongoose"

const EmployeeSchema = new mongoose.Schema({
    name : String ,
    email : String , 
    phone : String ,
    vehicleNumber : String ,
    vehicleModel : String ,
    vehicleCompany : String ,
    description : String ,
    isValid  : String 
})

const EmployeeModel = mongoose.model("sales" , EmployeeSchema)
export default EmployeeModel;
