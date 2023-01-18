const vacationCategoryModel = require("../Models/vacationCategory");
const slugify = require("slugify");
const shortid = require("shortid");

const createVacationCategories = (vacationsCategories, parentId = null) => {
  const vacationCategoryList = [];
  let vacationCategory;
  if (parentId == null) {
    vacationCategory = vacationsCategories.filter(
      (cat) => cat.parentId == undefined
    );
  } else {
    vacationCategory = vacationsCategories.filter(
      (cat) => cat.parentId == parentId
    );
  }
  for (let c of vacationCategory) {
    vacationCategoryList.push({
      _id: c._id,
      name: c.name,
      slug: c.slug,
      parentId: c.parentId,
      // categoryImage:c.categoryImage,
      children: createVacationCategories(vacationsCategories, c._id),
    });
  }
  return vacationCategoryList;
};

exports.addVacationCategory = (req, res) => {
  const VacationCategoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
    // createdBy: req.user._id,
  };
  // if(req.file){
  //     VacationCategoryObj.categoryImage = process.env.IMG_API + '/public/' + req.file.filename;
  // }

  if (req.body.parentId) {
    VacationCategoryObj.parentId = req.body.parentId;
  }
  const cat = new vacationCategoryModel(VacationCategoryObj);
  cat.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (category) {
      return res.status(201).json({
        success: true,
        category,
      });
    }
  });
};

exports.getVacationCategory = (req, res) => {
  vacationCategoryModel.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (categories) {
      const vacationCategoryList = createVacationCategories(categories);
      return res.status(200).json({
        success: true,
        vacationCategoryList,
      });
    }
  });
};

exports.deleteVacationCategory = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await vacationCategoryModel.findOneAndDelete({
      _id: ids[i]._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.updateVacationCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await vacationCategoryModel.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await vacationCategoryModel.findOneAndUpdate(
      { _id },
      category,
      {
        new: true,
      }
    );
    return res.status(201).json({ updatedCategory });
  }
};
