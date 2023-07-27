import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_CATEGORY, DELETE_CATEGORY } from "../../utils/mutations";
import { VIEW_CATEGORIES } from "../../utils/queries";
import Modal from "react-modal";

const Categories = (props) => {
  const { loading: loadingViewCategories, data: dataViewCategories } =
    useQuery(VIEW_CATEGORIES);

  const categories = dataViewCategories?.viewCategories || [];
  const { showCategories } = props;

  // modal starts off not showing
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  function openModal(category) {
    setCurrentCategory(category);
    setIsOpen(true);
  }

  const [input, setInput] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  // -------- update category function ------
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const handleUpdateCategory = async () => {
    try {
      await updateCategory({
        variables: {
          id: currentCategory._id,
          category: input,
        },
      });
      closeModal();
      // alert user that category was updated and re load the page so that it shows
      window.alert("Category Updated!").location.reload();
    } catch (err) {
      console.error(err);
    }
  };
    // -------- delete category function ------
    const [deleteCategory] = useMutation(DELETE_CATEGORY);
    const handleDeleteCategory = async () => {
        try {
            await deleteCategory({
                variables: {
                    id: currentCategory._id,
                },
            });
            closeModal();
            // alert user that category was deleted and re load the page so that it shows
            window.alert("Category Deleted!").location.reload();
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <div>
      {/* if loading data */}
      {loadingViewCategories ? (
        //   display loading
        <div>Loading...</div>
      ) : (
        //   otherwise
        <div>
          {/* map over categories and  */}
          {categories.map((category) => {
            //   display each category in a div
            return (
              <div className="flashcards-container" key={category._id}>
                <div className="scene">
                  <div className="card">
                    <div className="card__face card__face--front">
                      {category.category}
                    </div>
                    <div
                      className="btn-square btn-outline exBtn"
                      onClick={() => openModal(category)}
                    >
                      &#8942;
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* UPDATE flash card Modal */}
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Flashcard Options"
      >
        <div className="modal-content">
          <h2 className="modalTitles">Update Category</h2>
          <div className="modalSubTitles"></div>
          <textarea
            className="modalTextareas"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button className="btn submit" onClick={handleUpdateCategory}>
            Update Category
          </button>
          <button id="deleteBtn" onClick={handleDeleteCategory}>
            Delete Category
          </button>
          <button className="closeBtn" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
