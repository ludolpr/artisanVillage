import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/baseUrl";
import LoadingSpinner from "../../components/globals/LoadingSpinner";
import { Navigate, useNavigate } from "react-router-dom";

const EditProductOwner = (onSave) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  // for add new  empty fields we need to make same change
  const [tagFields, setTagFields] = useState([{ value: "" }]);

  const [formData, setFormData] = useState({
    description_product: "",
    id_category: "",
    name_product: "",
    picture_product: null,
    price: "",
    tags: [],
    id_company: "",
  });

  useEffect(() => {
    const fetchProduct = () => {
      api
        .get(`/productstags/${productId}`)
        .then((response) => {
          const productData = response.data.data;

          setProduct(productData);
          setSelectedCategory(productData.id_category);
          setSelectedTags(productData.tags);

          // Initialize formData with the product data
          setFormData({
            description_product: productData.description_product,
            id_category: productData.id_category,
            name_product: productData.name_product,
            picture_product: productData.picture_product,
            price: productData.price,
            id_company: productData.id_company,
          });

          // Initialize tagFields with the existing tags
          const initialTagFields = productData.tags.map((tag) => ({
            value: tag.id,
          }));
          setTagFields(initialTagFields);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setError("Erreur lors du chargement du produit.");
        });
    };

    fetchProduct();
    fetchCategoriesAndTags();
  }, [productId]);

  const fetchCategoriesAndTags = async () => {
    try {
      const [categoriesResponse, tagsResponse] = await Promise.all([
        api.get("/category"),
        api.get("/tag"),
      ]);
      setCategories(categoriesResponse.data);
      setTags(tagsResponse.data);
    } catch (error) {
      console.error("Error fetching categories or tags:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture_product: e.target.files[0],
    });
  };

  const handleTagChange = (index, value) => {
    const newTagFields = [...tagFields];
    newTagFields[index].value = value;
    setTagFields(newTagFields);
  };

  const handleAddTagField = () => {
    setTagFields([...tagFields, { value: "" }]);
  };

  const handleRemoveTagField = (index) => {
    const newTagFields = tagFields.filter((_, i) => i !== index);
    setTagFields(newTagFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name_product", formData.name_product);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description_product", formData.description_product);
    formDataToSend.append("id_category", formData.id_category);
    formDataToSend.append("id_company", formData.id_company);
    formDataToSend.append("tags", tagFields.map((tag) => tag.value).join(","));
    formDataToSend.append("_method", "PUT");
    if (formData.picture_product) {
      formDataToSend.append("picture_product", formData.picture_product);
    }

    await api
      .post(`/product/${productId}`, formDataToSend, {})
      .then((response) => {
        onSave(response.data);
      })
      .catch((error) => console.error("Error saving product:", error));
    navigate(-1);
  };

  if (error) return <div className="decline">{error}</div>;
  if (!product) return <LoadingSpinner />;

  return (
    <div className="card1 w-full max-w-4xl mx-auto mt-10  p-6 rounded-lg shadow-md border-2 ">
      <h2 className=" font-bold  mb-4">Modifier le produit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block  mb-1 ">Nom du produit</label>
          <input
            type="text"
            name="name_product"
            value={formData.name_product}
            onChange={handleChange}
            className="block w-full p-2 border  rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block  mb-1 ">Description</label>
          <textarea
            name="description_product"
            value={formData.description_product}
            onChange={handleChange}
            className="block w-full p-2 border  rounded-lg"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block  mb-1 ">Image du produit</label>
          <input
            type="file"
            name="picture_product"
            onChange={handleFileChange}
            className="block w-full p-2 border  rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block  mb-1 ">Catégorie</label>
          <select
            name="id_category"
            value={formData.id_category}
            onChange={(e) => {
              setFormData({ ...formData, id_category: e.target.value });
              setSelectedCategory(e.target.value);
            }}
            className="block w-full p-2 border  rounded-lg"
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block  mb-2">Tags</label>
          {tagFields.map((field, index) => (
            <div key={index} className="flex items-center mb-2">
              <select
                value={field.value}
                onChange={(e) => handleTagChange(index, e.target.value)}
                className="w-full border  rounded-lg p-2"
              >
                <option value="">Sélectionner un tag</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name_tag}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleRemoveTagField(index)}
                className="ml-2   px-2 py-1 rounded-lg button3"
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTagField}
            className="  px-4 py-2 rounded-lg button3"
          >
            Ajouter un tag
          </button>
        </div>

        <div className="mb-4">
          <label className="block  mb-1 ">Prix en €</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="block w-full p-2 border  rounded-lg"
          />
        </div>
        <div>
          <input
            type="hidden"
            value={formData.id_company}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-4   p-3 rounded-lg w-full  transition-all button3"
        >
          Enregistrer le changement
        </button>
      </form>
    </div>
  );
};

export default EditProductOwner;
