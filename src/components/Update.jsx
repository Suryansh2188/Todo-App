import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";

function Update({ taskData, updateTask, toggleUpdate }) {
  const [formData, setFormData] = useState({
    category: "",
    date: "",
    title: "",
    work: "",
    completed: false,
  });

  // Update form data when 'taskData' prop changes
  useEffect(() => {
    if (taskData) {
      setFormData({
        id: taskData.id,
        category: taskData.category,
        date: taskData.date,
        title: taskData.title,
        work: taskData.work,
        completed: taskData.completed,
      });
    }
  }, [taskData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.completed = false;
    updateTask(formData);
    toggleUpdate();
  };

  const handleCancel = () => {
    updateTask(taskData);
    toggleUpdate();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-[#ffd79c] p-5 rounded-lg text-center sm:w-full md:w-96 w-4/5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
              Update a Task
            </h3>
            <button
              type="button"
              className="text-black bg-transparent  rounded-lg text-2xl p-1.5 ml-auto inline-flex items-center"
              onClick={() => handleCancel()}
            >
              <RxCross2 />
              {/* <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-start text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <div className="flex gap-10 justify-start">
                <div className="flex items-center gap-x-1">
                  <input
                    id="personal"
                    name="category"
                    value="Personal"
                    checked={formData.category === "Personal"}
                    onChange={handleInputChange}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="personal"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Personal
                  </label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input
                    id="work"
                    name="category"
                    value="Work"
                    checked={formData.category === "Work"}
                    onChange={handleInputChange}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="work"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Work
                  </label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input
                    id="education"
                    name="category"
                    value="Other"
                    checked={formData.category === "Other"}
                    onChange={handleInputChange}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="Other"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>
            {/* Other input fields */}
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm text-start font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 p-1 focus:outline-none rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm text-start font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 p-1 focus:outline-none rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="work"
                className="block text-sm text-start font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="work"
                name="work"
                value={formData.work}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 p-1 focus:outline-none rounded-md w-full"
              ></textarea>
            </div>
            <div className="mt-4 flex">
              {/* Update and Cancel buttons */}
              <button
                type="submit"
                className="btn btn-primary bg-[#90beff] text-black py-2 px-8 rounded-md"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

Update.propTypes = {
  taskData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    work: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  updateTask: PropTypes.func.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
};

export default Update;
