const vacationCategoryModel = require('../Models/vacationCategory');
const slugify = require('slugify')
const shortid = require('shortid')

const  createVacationCategories = (vacationsCategories,parentId = null) => {
     
    const vacationCategoryList = [];
    let vacationCategory;
    if(parentId == null){
        vacationCategory = vacationsCategories.filter(cat => cat.parentId == undefined)
    }else{
        vacationCategory = vacationsCategories.filter(cat => cat.parentId == parentId)
    }
    for(let c of vacationCategory){
        vacationCategoryList.push({
            _id: c._id,
            name: c.name,
            slug: c.slug,
            parentId: c.parentId,
            // categoryImage:c.categoryImage,
            children: createVacationCategories(vacationsCategories,c._id)
        })
    }
    return vacationCategoryList;
}

exports.addVacationCategory = (req,res) =>{

    const VacationCategoryObj = {
        name: req.body.name,
         slug: `${slugify(req.body.name)}-${shortid.generate()}`
        // createdBy: req.user._id,
    }
    // if(req.file){
    //     VacationCategoryObj.categoryImage = process.env.IMG_API + '/public/' + req.file.filename;
    // }

    if(req.body.parentId){
        VacationCategoryObj.parentId = req.body.parentId
    }
    const cat = new vacationCategoryModel(VacationCategoryObj)
    cat.save((err,category)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        if (category) {
            return res.status(201).json({
                success:true,
                category
            })
        }
    })
}

exports.getVacationCategory = (req,res) =>{
    vacationCategoryModel.find({}).exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
            if(categories){
                const vacationCategoryList = createVacationCategories(categories);
                return res.status(200).json({
                    success:true,
                    vacationCategoryList
                })
            }
        });
    }