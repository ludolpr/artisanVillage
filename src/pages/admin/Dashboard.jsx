import React, { useState } from "react";
import Sidebar from "./Sidebar";
import UserList from "../admin/users/UserList";
import UserForm from "../admin/users/UserForm";
import ProductList from "../admin/products/ProductList";
import ProductForm from "../admin/products/ProductForm";
import TagList from "../admin/tags/TagsList";
import TagForm from "../admin/tags/TagsForm";
import CategoryList from "./categories/CategoriesList";
import CategoryForm from "./categories/CategoriesForm";
import ChatList from "../admin/chats/ChatList";
import ChatForm from "../admin/chats/ChatForm";
import CompaniesList from "./companies/CompaniesList";
import CompaniesForm from "./companies/CompaiesForm";
import MessageList from "../admin/messages/MessageList";
import MessageForm from "../admin/messages/MessageForm";
import RolesList from "../admin/roles/RolesList";
import RolesForm from "../admin/roles/RolesForm";
import TicketList from "../admin/tickets/TicketList";
import TicketForm from "../admin/tickets/TicketForm";

const contentComponents = {
  Utilisateurs: {
    list: <UserList />,
    form: <UserForm user={null} onSuccess={() => {}} />,
  },
  Entreprises: {
    list: <CompaniesList />,
    form: <CompaniesForm company={null} onSuccess={() => {}} />,
  },
  Produits: {
    list: <ProductList />,
    form: <ProductForm product={null} onSuccess={() => {}} />,
  },
  Tags: {
    list: <TagList />,
    form: <TagForm tag={null} onSuccess={() => {}} />,
  },
  Categories: {
    list: <CategoryList />,
    form: <CategoryForm category={null} onSuccess={() => {}} />,
  },
  Chats: {
    list: <ChatList />,
    form: <ChatForm chat={null} onSuccess={() => {}} />,
  },

  Messages: {
    list: <MessageList />,
    form: <MessageForm message={null} onSuccess={() => {}} />,
  },
  Roles: {
    list: <RolesList />,
    form: <RolesForm role={null} onSuccess={() => {}} />,
  },
  Tickets: {
    list: <TicketList />,
    form: <TicketForm ticket={null} onSuccess={() => {}} />,
  },
};

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Utilisateurs");
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex h-full bg-[#d9b99b]">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 ml-64 p-10 text-2xl font-bold">
        <button
          onClick={handleFormToggle}
          className="bg-[#9a7d6b] text-white px-4 py-2 rounded mb-4 hover:bg-[#8b6d59]"
        >
          {showForm ? "Masquer le formulaire" : "Afficher le formulaire"}
        </button>
        {showForm ? (
          <div>
            {contentComponents[activeItem]?.form}
            {contentComponents[activeItem]?.list}
          </div>
        ) : (
          <div>{contentComponents[activeItem]?.list}</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
