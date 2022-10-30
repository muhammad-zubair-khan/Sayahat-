import { 
    GET_ALL_VACATION_CATEGORIES_SUCCESS,
    ADD_NEW_VACATION_CATEGORY_REQUEST,
    ADD_NEW_VACATION_CATEGORY_SUCCESS,
    ADD_NEW_VACATION_CATEGORY_FAIL
   } from "../Constants/vacationCategoryConstants";
  
  const initialState = {
    categories: [],
    loading: false,
    error: null,
  };
  const buildNewVacationCategories = (parentId,categories, category) => {
    let myCategories = [];
  
    if(parentId === undefined){
      return [
        ...categories,
        {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          children: []
        }
      ];
    }
  
    for (let cat of categories) {
      if(cat._id === parentId){   
        myCategories.push({
          ...cat,
          children:
            cat.children ? buildNewVacationCategories(parentId,[...cat.children,{
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: category.children,
              }],category) : []
        });
      }
      else{
        myCategories.push({
          ...cat,
          children:
            cat.children ? buildNewVacationCategories(parentId,cat.children,category) : []
        });
      }
    }
    return myCategories;
  };
  
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export const VacationCategoryReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch(action.type){
        case GET_ALL_VACATION_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case ADD_NEW_VACATION_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case ADD_NEW_VACATION_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewVacationCategories(category.parentId, state.categories, category);
            console.log('updated categoires', updatedCategories);
            
            state = {
                ...state,
                categories: updatedCategories,
                loading: false,
            }
            break;
        case ADD_NEW_VACATION_CATEGORY_FAIL:
            state = {
                ...initialState
            }
            break;
    }
  
    return state;
  }