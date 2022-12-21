const VacationCategoryModel = require('../Models/vacationCategory')
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

const createVacationCategories = (categories, parentId = null) => {
  const VacationCategoryList = []
  let category
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined)
  } else {
    category = categories.filter((cat) => cat.parentId == parentId)
  }
  for (let c of category) {
    VacationCategoryList.push({
      _id: c._id,
      name: c.name,
      slug: c.slug,
      parentId: c.parentId,
      categoryImage: c.categoryImage,
    //   type: c.type,
      children: createVacationCategories(categories, c._id),
    })
  }
  return VacationCategoryList
}

exports.initialData = catchAsyncErrors(async(req, res) => {
  const categories = await VacationCategoryModel.find({}).exec()

  if (!categories) {
    return next(new ErrorHandler("Categories not found", 404));
  }
  res.status(200).json({
    categories: createVacationCategories(categories),
  })
});
