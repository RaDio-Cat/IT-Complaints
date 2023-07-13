const mongoose = require('mongoose')
const shortid = require('shortid')


const requestSchema = mongoose.Schema({
    jobID: {type:String, default:shortid.generate, unique: true},
    issuer: { type: String, required: true },
    branch: { type: String, required: true },
    extension: { type: String, required: true },
    issue: { type: String, required: true },
    comment: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    dateCreated: { type: Date, default: Date.now,}
},
{
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
})

// Virtual getter to format the dateCreated field as "dd/mm/yy"
requestSchema.virtual('formattedDateCreated').get(function() {
    return this.dateCreated.toLocaleDateString("en-GB"); // Change "en-GB" to your desired locale
  });
  
  // Apply the virtual getter to the schema
  requestSchema.set('toJSON', { getters: true });
  requestSchema.set('toObject', { getters: true });


const reqdb = mongoose.model('requests', requestSchema);

reqdb.aggregate([{
    $project: {
        dateCreated: {
            $dateToString: {
                format: '%d-%m-%Y',
                date: "$dateCreated"
            }
        } 
    }
}])

module.exports = reqdb