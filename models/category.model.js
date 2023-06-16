

const mongoose=require('mongoose')
const category=mongoose.model(
    "Category",
    mongoose.Schema(
        {
            categoryName:{
                type:String,
                require:true,
                unique:true,
            },
            categoryDescription:{
                type:String,
                require:true,
            },
            categoryImage:{
                type:String,
            }
        }
    )
)
module.exports={
    category
}