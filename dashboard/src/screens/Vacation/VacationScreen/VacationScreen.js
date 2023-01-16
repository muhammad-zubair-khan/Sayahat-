import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import {
  createVacationCategory,
  getAllVacationsCategory,
  updateVacationCategories,
} from "../../../Redux/Actions/vacationCategoryAction";
import AddCategoryModal from "../../../components/Modal/AddVacationCategoryModal";
import ReusableModel from "../../../components/Modal/ResuableModel";
import { deleteCategories as deleteCategoriesAction } from "../../../Redux/Actions/vacationCategoryAction";
import UpdateVacationCategoryModal from "../../../components/Modal/UpdateVacationCategoryModal";

const VacationScreen = () => {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const vacation = useSelector((state) => state.Vacationcategory);
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!vacation.loading) {
      setShow(false);
    }
  }, [vacation.loading]);

  const handleClose = () => {
    const form = new FormData();

    if (categoryName === "") {
      alert("Category name is required");
      setShow(false);
      return;
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    // form.append("categoryImage", categoryImage);
    dispatch(createVacationCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const displayCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && displayCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        // type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  //   const handleCategoryImage = (e) => {
  //     setCategoryImage(e.target.files[0]);
  //   };
  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(vacation.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    // console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };
  const updateCategoryForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateVacationCategories(form));
    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };
  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    // const expandedIdsArray = expandedArray.map((item, index) => ({
    //   _id: item.value,
    // }));

    // const idsArray = expandedIdsArray.concat(checkedIdsArray);
    // console.log(idsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllVacationsCategory());
          setDeleteCategoryModal(false);
        }
      });
    }
    setDeleteCategoryModal(false);
  };

  const displayDeleteCategoryModal = () => {
    return (
      <ReusableModel
        modalTitle={"Confirm"}
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded Category</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked Category</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </ReusableModel>
    );
  };
  const categoryList = createCategoryList(vacation.categories);

  return (
    <>
      <Sidebar>
        <Header />

        <div style={{ width: "50%" }}>
          <Grid container>
            <Grid item xs={12}>
              <Box style={{ display: "flex", margin: "23px 6px" }}>
                <Typography variant="h4" component="h1">
                  Vacation Categories
                </Typography>
                <Button
                  style={{
                    marginLeft: "auto",
                  }}
                  variant="contained"
                  onClick={handleShow}
                >
                  Add Vacations{" "}
                  <span>
                    <AddIcon />
                  </span>
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12}>
              {/* <Box>
              <ul>{displayCategories(category.categories)}</ul>
            </Box> */}
              <CheckboxTree
                nodes={displayCategories(vacation.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                icons={{
                  check: <CheckBoxIcon />,
                  uncheck: <CheckBoxOutlineBlankIcon />,
                  halfCheck: <IndeterminateCheckBoxIcon />,
                  expandClose: <ArrowRightIcon />,
                  expandOpen: <ArrowDropDownIcon />,
                }}
              />
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12}>
              <Button onClick={updateCategory} variant="contained">
                Edit <EditIcon />
              </Button>
              <Button
                onClick={deleteCategory}
                variant="contained"
                color="error"
                style={{ margin: "13px 16px" }}
              >
                Delete <DeleteIcon />
              </Button>
            </Grid>
          </Grid>

          {/* ----MODAL----- */}
          <AddCategoryModal
            show={show}
            handleClose={() => setShow(false)}
            onSubmit={handleClose}
            modalTitle={"Add New Category"}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            parentCategoryId={parentCategoryId}
            setParentCategoryId={setParentCategoryId}
            //   handleCategortImage={handleCategoryImage}
            categoryList={categoryList}
          />

          <UpdateVacationCategoryModal
            show={updateCategoryModal}
            handleClose={() => setUpdateCategoryModal(false)}
            onSubmit={updateCategoryForm}
            size="lg"
            modalTitle={"Update Categories"}
            expandedArray={expandedArray}
            checkedArray={checkedArray}
            handleCategoryInput={handleCategoryInput}
            categoryList={categoryList}
          />

          {displayDeleteCategoryModal()}
        </div>
      </Sidebar>
    </>
  );
};

export default VacationScreen;
