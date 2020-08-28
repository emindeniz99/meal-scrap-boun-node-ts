import * as mongoose from "mongoose"

mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // dbName:"dasf"
},(err:any)=>{
    if(err){
        console.error(err.message)
    }
    else {
        console.log("Success - connect",err)
    }
})

export const TestSchema = new mongoose.Schema({
    date: Date,
    day: Number,
    weekday: String,
    partOfDay: [Map]
})

// export interface ITest extends mongoose.Document {
// data:Map<any,any>
// }

// export interface ITestModel extends mongoose.Model<ITest>{
//  data:Map<any,any>
// }

const Testt= mongoose.model("Test",TestSchema);
export default Testt