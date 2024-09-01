import React from "react";

const TicketList = ({ onSelect }) => {
  const tickets = [
    { id: 1, title: "Ticket A", description: "Issue A" },
    { id: 2, title: "Ticket B", description: "Issue B" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Ticket List</h2>
      <ul>
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="mb-2 p-4 bg-gray-100 rounded cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            onClick={() => onSelect(ticket)}
          >
            {ticket.title} - {ticket.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
