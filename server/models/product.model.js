import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
	name:{
		type: String,
		trim: true,
		required: 'Name is required'
	},
	description:{
		type:String,
		trim: true
	},
	price:{
		type:Number,
		trim: true
	},
	image:{
		type:String,
	}
})

export default mongoose.model('Product', ProductSchema)
