const Annonce = require('../Model/Job.model');


exports.create_job = function (data) {

    for(let d of data)
    {
       
    console.log(d);
        
    let annonce = new Annonce(d)
    annonce.save()
        .then(annonce => {
            console.log({ 'annonce': 'annonce added successfully' });
        })
        .catch(err => {
            console.log('adding new annonce failed');
        });
}
    }

